const express = require("express"); //Colocando o express em uma variavel
const server = express(); //Executando o express

//pegar o banco de dados
const db = require("./database/db");

// configurar pasta publica 
server.use(express.static("public"))

//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

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

  //req.query: Query strings da nossa URL (QUERY STRINGS)
  //É

  //console.log(req.query);

  return res.render("create-point.html");
})


server.post("/savepoint", (req, res) => {

  //req.body: o corpo do nosso form
  //console.log(req.body);

  //inserir dados no banco de dados
    //2 Inserir dados na tabela
    const query = `      
    INSERT INTO places (
      image, 
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err){
    if(err){
      console.log(err) 
      return res.send("Erro no cadastro!")
    }
    console.log("Cadastrado com Sucesso!")
    console.log(this) //Referenciando a resposta que o run está trazendo

    return res.render("create-point.html", { saved: true})
  }

  db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {

  const search = req.query.search

  if(search == ""){
    //pesquisa vazia
    return res.render("search-results.html", {total: 0});
  }

  //res.send("Helo World");
  //res.sendFile(__dirname + "/views/create-point.html");

  //pegar os dados do banco de dados
    function consultData(err, rows){
    if(err){
      return console.log(err)
    }
    console.log("Aqui estão seus registros: ")
    console.log(rows)

    //contar quantos elementos tem dentro do array
    const total = rows.length

    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", {places: rows, total: total});
  }

  //3 Consultar os dados da tabela 
  //db.all(`SELECT [NOME DO DADO(name, image etc)] FROM places`, function(err, rows){
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, consultData)})

  //return res.render("search-results.html", {places: rows});
  //A linha acima foi envida para a funcao consultdata pois rows é uma variavel local


//Ligar o servidor
server.listen(3000);

