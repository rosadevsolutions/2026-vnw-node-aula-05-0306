//3 - Importando o dotenv
require("dotenv").config()

//1 - Importando o express e armazenando na variável express
const express = require("express")

//2 - Inicializando o express e armazenando na variável app
const app = express()

//4 - Porta de execução do servidor
const PORT = process.env.PORT || 3000;

// 8 - Criando um array para armazenar os cadastros
let cadastros = []

//9 - Criando uma variável para armazenar o próximo ID a ser atribuído
let proximoID = 1

//7 - Configurando o express para receber dados no formato JSON
app.use(express.json())

//13 - Função para validar os campos de email
function validarEmail(email) {
  //14 - Expressão regular para validar o formato do email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  //15 - Testando se o email corresponde ao padrão da expressão regular
  return regexEmail.test(email)
}

//16 - Função para validar os campos de telefone
function validarTelefone(telefone) {
  //17 - Expressão regular para validar o formato do telefone
  const regexTelefone = /^[0-9]{10,11}$/;

  //18 - Testando se o telefone corresponde ao padrão da expressão regular
  return regexTelefone.test(telefone)
}

//19 - Middleware para validar os campos de email e telefone
function validarCadastro(req, res, next) {
  //20 - Obtendo os dados do corpo da requisição
  const { nome, email, telefone, mensagem } = req.body

  //21 - Validando os campos de nome, email e telefone
  if (!nome || nome.length < 2) {
    return res.status(400).json({
      erro: "Nome é obrigatório!"
  })
  }
  if (!email || !validarEmail(email)) {
    return res.status(400).json({
      erro: "Email inválido!"
    })
  }
  if (!telefone || !validarTelefone(telefone)) {
    return res.status(400).json({
      erro: "Telefone inválido!"
    })
  }
  if (!mensagem || mensagem.length < 500) {
    return res.status(400).json({
      erro: "Mensagem é obrigatória!"
    })
  }

  //22 - Se os campos forem válidos, continuar para a próxima rota
  next()
}

//5 - Rota principal
app.get("/", (req, res) => {
  res.send("API funcionando!")
})

//10 - Rota principal
app.get("/cadastros", (req, res) => {
  //11 - Retornando a lista de cadastros no formato JSON
  res.json(cadastros)
})


//12 - Rota para cadastrar um novo usuário
app.post("/cadastros", validarCadastro, (req, res) => {
  //13 - Obtendo os dados do corpo da requisição
  const { nome, email, telefone, mensagem } = req.body

  //14 - Criando um novo objeto de cadastro com o ID atual e os dados fornecidos
  const novoCadastro = {
    id: proximoID++,
    nome,
    email,
    telefone,
    mensagem: mensagem || null
  }
  //15 - Adicionando o novo cadastro ao array de cadastros
  cadastros.push(novoCadastro)

  //16 - Retornando o cadastro criado com o status 201 (Created)
  res.status(201).json({
    mensagem: "Cadastro realizado com sucesso!",
    cadastro: novoCadastro
  })
})

//6 - Inicializando o servidor na porta PORT
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`)
})
