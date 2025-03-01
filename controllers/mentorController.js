
import bcrypt from 'bcrypt'
import { Mentor } from '../models/Mentor.js'
import { Log } from "../models/Log.js";

function validaSenha(senha) {

  const mensa = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // senha = "abc123"
  // letra = "a"

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}


export const mentorIndex = async (req, res) => {
    try{
        const mentores = await Mentor.findAll();
        res.status(200).json(mentores)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const mentorCreate = async (req, res) => {
    const { nome, email, senha } = req.body
  
    // se não informou estes atributos
    if (!nome || !email || !senha) {
      res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
      return
    }

  const mensaValidacao = validaSenha(senha)
  if (mensaValidacao.length >= 1) {
    res.status(400).json({ id: 0, msg: mensaValidacao })
    return
  }  

    try {
      const mentor = await Mentor.create({
        nome, email, senha
      });
      res.status(201).json(mentor)
    } catch (error) {
      res.status(400).send(error)
    }
  }
  export const mentorAlteraSenha = async (req, res) => {
    const { email, senha, novaSenha } = req.body
  
    // se não informou estes atributos
    if (!email || !senha || !novaSenha) {
      res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
      return
    }
  
    try {
      const mentor = await Mentor.findOne({ where: { email } })
  
      if (mentor == null) {
        res.status(400).json({ erro: "Erro... E-mail inválido" })
        return
      }
      const mensaValidacao = validaSenha(novaSenha)
    if (mensaValidacao.length >= 1) {
      res.status(400).json({ id: 0, msg: mensaValidacao })
      return
    }  

    if (bcrypt.compareSync(senha, mentor.senha)) {

      // gera a criptografia da nova senha
      const salt = bcrypt.genSaltSync(12)
      const hash = bcrypt.hashSync(novaSenha, salt)
      mentor.senha = hash

      // salva a nova senha
      await mentor.save()

      res.status(200).json({ msg: "Ok. Senha Alterada com Sucesso" })
    } else {

      // registra um log desta tentativa de troca de senha
      await Log.create({
        descricao: "Tentativa de Alteração de Senha",
        mentor_id: mentor.id
      })

      res.status(400).json({ erro: "Erro... Senha inválida" })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
