//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//const path = require('path')
//const dbPath = path.resolve(__dirname, 'database.db')
//const db = new sqlite3.Database(dbPath)

//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db") //Tem que informar o caminho completo no terminal
//ou const db = new sqlite3.Database(path.resolve(__dirname, 'db.sqlite'));
//oou const db = new sqlite3.Database(dbPath)
//Ao usar a palavra chave new eu posso iniciar um novo objeto desde
//oque esteja sendo retornado seja um constructor ou classe ("Database")

module.exports = db //Exportar o objeto DB

//Utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {

  //Com comandos SQL eu vou: 

  //1 Criar uma tabela com comandos SQL
  db.run(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        address TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
      );
  `)//Template string (literals?)

  // //2 Inserir dados na tabela
  // const query = `      
  //   INSERT INTO places (
  //     image, 
  //     name,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?,?,?,?,?,?,?);
  // `

  // // const values = [
  // //   "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
  // //   "Papersider",
  // //   "Guilherme Gemballa, Jardim América",
  // //   "Número 260",
  // //   "Santa Catarina",
  // //   "Rio do Sul",
  // //   "Papéis e Papelão"
  // // ]

  // // function afterInsertData(err){
  // //   if(err){
  // //     return console.log(err)
  // //   }
  // //   console.log("Cadastrado com Sucesso!")
  // //   console.log(this) //Referenciando a resposta que o run está trazendo
  // // }

  // // db.run(query, values, afterInsertData)

//   // // function consultData(err, rows){
//   // //   if(err){
//   // //     return console.log(err)
//   // //   }
//   // //   console.log("Aqui estão seus registros: ")
//   // //   console.log(rows)
//   // // }

//   // // //3 Consultar os dados da tabela 
//   // // //db.all(`SELECT [NOME DO DADO(name, image etc)] FROM places`, function(err, rows){
//   // // db.all(`SELECT * FROM places`, consultData)

//   // function deleteData(err){
//   //   if(err){
//   //     return console.log(err)
//   //   }
//   //   console.log("Registro deletado com sucesso!")
//   // }

//   // //4 Deletar um dado da tabela
//   // //db.run(`DELETE FROM places`) - Deleta tudo
//   // db.run(`DELETE FROM places WHERE id = ?`, [1], deleteData)

 })




