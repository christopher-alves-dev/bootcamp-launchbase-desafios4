const { date } = require("../../lib/utils");

const db = require('../../config/db');

module.exports = {
  // não é responsabilidade dos controllers fazer operações de banco de dados, essa responsabilidade deve ser dos models, por isso criamos este arquivo e exportamos onde o código estava, que era no index.
  all(callback) {
    db.query(`SELECT * FROM members`, function(err, results) {
      if(err) throw `Database error! ${err}`;

      callback(results.rows)
    })
  },
  create(data, callback) {
    const query = `
      INSERT INTO members (
        name, 
        avatar_url,
        birth,
        gender,
        blood,
        weight,
        height,
        instructor_id
      ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url,
      date(data.birth).iso,
      data.gender,
      data.blood,
      data.weight,
      data.height,
      data.instructor
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database error! ${err}`;

      callback(results.rows[0])
    })
  },
  find(id, callback) {
    db.query(`SELECT members.*, instructors.name AS instructor_name
    FROM members 
    LEFT JOIN instructors ON (members.instructor_id = instructors.id)
    WHERE members.id = $1`, [id], function(err, results) {
      //Para a aplicação e envia a mensagem. 
      if(err) throw `Database error! ${err}`;

      callback(results.rows[0]);
    })
  },
  update(data, callback) {
    const query = `
    UPDATE members SET
      name=($1),
      avatar_url=($2),
      birth=($3),
      gender=($4),
      blood=($5),
      weight=($6),
      height=($7),
      instructor_id=($8)
    WHERE id = $9
    `

    const values = [
      data.name,
      data.avatar_url,
      date(data.birth).iso,
      data.gender,
      data.blood,
      data.weight,
      data.height,
      data.instructor,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if(err) throw `Database error! ${err}`;


      callback();
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], function(err, results) {
      if(err) throw `Database Error! ${err}`;

      return callback();
    });
  },
  instructorsSelectOptions(callback) {
    db.query(`SELECT name, id FROM instructors`, function(err, results) {
      if (err) throw 'Database Error!'

      callback(results.rows)
    })
  }
}