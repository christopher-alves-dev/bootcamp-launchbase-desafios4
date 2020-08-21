//É um jeito para que toda vez que fizer uma query, não fique solicitando login e senha. 
const { Pool } = require("pg");

//Desta forma fica registrado as informações para que não fique solicitando as credenciais. 
module.exports = new Pool ({
  user: 'postgres',
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "gymmanager"
});