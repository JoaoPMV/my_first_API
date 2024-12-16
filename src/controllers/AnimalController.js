const Pet = require('../models/Pet')
const User = require('../models/User')
const yup = require('yup')

const animalController = {

  index: async (req,res) => {
  const {adopted} = req.query
  const pets = await Pet.find({adopted});
  return res.json(pets)
  },
  
  store: async (req, res) => {
    const schema = yup.object().shape().shape({
          size: yup.string().required(),
          age: yup.string().required(),
          gender: yup.string().required(),
          animal: yup.string().required(),
          name: yup.string().required(),
          adopted: yup.boolean().required()
        })

    const {size, age, gender, animal, name, adopted} = req.body
    const {filename} = req.file
    const {user_id} = req.headers

    if (!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na validação'})
    }

    const userExists = await User.findOne({_id: user_id})
    if (!userExists){
      return res.send('Usuário não cadastrado')
    }

    const newPet = new Pet({ 
      user: user_id,
      thumbnail: filename,
      name,
      age,
      size,
      gender, 
      animal,
      adopted})
      await newPet.save()
       return res.json(newPet)
  },

  update: async (req,res) => {
    const schema = yup.object().shape().shape({
      size: yup.string().required(),
      age: yup.string().required(),
      gender: yup.string().required(),
      animal: yup.string().required(),
      name: yup.string().required(),
      adopted: yup.boolean().required()
    })

    const {pet_id} = req.params
    const {filename} = req.file
    const {size, age, gender, animal, name, adopted} = req.body
    const {user_id} = req.headers

    if (!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha na validação'})
    }

    const user = await User.findById(user_id)
    const pet = await Pet.findById(pet_id)

    if( String(user._id) !== String(pet.user)){
      return res.status(401).json({error: 'Não autorizado'})
    }
    await Pet.updateOne({_id: pet_id}, {
      user: user_id,
      thumbnail: filename,
      name,
      age,
      size,
      gender, 
      animal,
      adopted
    })
    return res.send()
  },

  erase: async (req,res) => {

      const {pet_id} = req.params
      const {user_id} = req.headers

      const user = await User.findById(user_id)
      const pet = await Pet.findById(pet_id)

      if( String(user._id) !== String(pet.user)){
      return res.status(401).json({error: 'Não autorizado'})}
      await Pet.findByIdAndDelete({_id: pet_id})
      return res.send()
}}

module.exports = animalController