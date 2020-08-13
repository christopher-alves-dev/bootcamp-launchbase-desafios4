const fs = require('fs');

const data = require("../data.json");
const { date, bloodType } = require("../utils");

exports.index = function(req, res) {
  return res.render("members/index", { members: data.members })
}

exports.create = function(req, res) {
  return res.render('members/create');
}

exports.post = function(req, res) {
  const keys = Object.keys(req.body)

  for(key of keys) {
    if(req.body[key] == '') {
      return res.send('Plz, fill all fields!')
    }
  }

  birth = Date.parse(req.body.birth)

  let id = 1;
  const lastMember = data.members[data.members.length - 1];

  if(lastMember) {
    id = lastMember.id + 1
  }
  
  data.members.push({
    id,
    ...req.body,
    birth
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send('Write file error!');

    return res.redirect('/members');
  } )
}

exports.show = function(req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function(member) {
    return member.id == id
  })

  if (!foundMember) return res.send('member not found!');



  const member = {
    //tudo que tem dentro do objeto foundMember, spread operator
    ...foundMember,
    //formataremos a apresentação apenas destes dados. 
    birth: date(foundMember.birth).birthday
  }

  return res.render('members/show', { member });
}

exports.edit = function(req, res) {
  const { id } = req.params;

  const foundMember = data.members.find(function(member) {
    return member.id == id
  })

  if (!foundMember) return res.send('member not found!');

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  return res.render('members/edit', { member })
}

exports.put = function(req, res) {
  //Precisamos pegar os dados que já temos e salvar apenas os que estão diferentes. 
  const { id } = req.body;

  // Iniciamos o index como 0
  let index = 0

  const foundMember = data.members.find(function(member, foundIndex) {
    //Se o id da página for igual ao id do instrutor
    if (id == member.id) {
      //adicionar no index o foundIndex. Então se o index for 7 o foundIndex será 7 também. 
      index = foundIndex;
      return true;
    }
  })

  if (!foundMember) return res.send('member not found!');

  const member = {
    //Pegamos todos os dados que já tinhamos e espalhamos tudo dentro. 
    ...foundMember,
    //Pegamos também todos os dados do req.body, até mesmo os que não foram alterados, não há problema pois não teremos conflito entre os dados que não foram alterados.  
    ...req.body,
    birth: Date.parse(req.body.birth),
    //Constructor Number transforma o que estiver ali dentro em número. Ao editar o avatar_url, o Id estava ficando como string, desta maneira o Number converterá para number. 
    id: Number(req.body.id)
  }

  
  data.members[index] = member;
  
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error!");

    return res.redirect(`/members/${id}`);
  })

}

exports.delete = function(req, res) {
  const { id } = req.body

  //Função filter é igual uma estrutura de repetição, para cada instrutor ele irá rodar a função e enviar para dentro o instrutor, precisando retornar um true ou false. 
  const filteredMembers = data.members.filter(function(member) {
    // se verdadeiro, pode colocar dentro do novo array. Se falso, retira do array. 
    return member.id != id;
  })

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error!");

    return res.redirect("/members");
  })

}
