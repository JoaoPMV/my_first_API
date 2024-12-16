const User = require('../models/User')

const sessionController = {

  index: (req,res) => {
    res.render('index')
  },

  store: async (req,res) => {
    const {username, password} = req.body
    try {
      const userAlreadyExists = await User.findOne({username})
      if (userAlreadyExists) {
        return res.status(400).redirect('/index')
      } 
      const newUser = new User({username, password})
      await newUser.save()
      res.send('User created')
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao processar o cadastro. Tente novamente mais tarde.');
    }
  },

  login: async (req,res) => {
    const {username, password} = req.body
    const userAlreadyExists = await User.findOne({username,password})
    if (!userAlreadyExists){
      return res.send('Usuário e/ou senha inválido(s)')
    }

    return res.send(userAlreadyExists)
  }
}

module.exports = sessionController