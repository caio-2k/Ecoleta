const express = require("express"); //Colocando o express em uma variavel
const server = express(); //Executando o express

// configurar pasta publica 
server.use(express.static("public"))

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//Configurar caminhos da aplicação
// página inicial
//get - verbo http, quando se usa o protocolo http, são regras
//e uma dessas regras é trabalhar com verbos
//req - requisição/pedido
//res - resposta/response
server.get("/", (req, res) => {
  //res.send("Helo World");
  //res.sendFile(__dirname + "/views/index.html");
  //return res.render("index.html", {title: "Um título"});
  return res.render("index.html");
})

server.get("/create-point", (req, res) => {
  //res.send("Helo World");
  //res.sendFile(__dirname + "/views/create-point.html");
  return res.render("create-point.html");
})

server.get("/search-results", (req, res) => {
  //res.send("Helo World");
  //res.sendFile(__dirname + "/views/create-point.html");
  return res.render("search-results.html");
})

//Ligar o servidor
server.listen(3000);

