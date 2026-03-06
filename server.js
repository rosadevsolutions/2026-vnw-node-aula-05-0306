//Importando o dotenv
require("dotenv").config()

//Importando o express e armazenando na variável express
const express = require("express")

//Inicializando o express e armazenando na variável app
const app = express()

//Porta de execução do servidor
const PORT = process.env.PORT || 3000;

//Rota principal
app.get("/", (req, res) => {
  res.send("API funcionando!")
})

//Inicializando o servidor na porta PORT
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})
