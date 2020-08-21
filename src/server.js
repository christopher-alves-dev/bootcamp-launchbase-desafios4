const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');
const server = express();

//Middleware responsável por fazer funcionar o req.body, que é para receber os dados enviados através do method POST. 
server.use(express.urlencoded({ extended: true }))

server.use(express.static('public'));
//method Override é para que consigamos utilizar o method PUT no formulário do HTML, que por default só aceita POST e GET. Para que funcione precisa ser colocado antes de routes para que o method possa sobrescrever o method POST. 
server.use(methodOverride('_method'));
server.use(routes)
server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false,
  noCache: true
})



server.listen(5000, function() {
  console.log('server is running');
})