const User = require('../models/User')
const Pet = require('../models/Pet')
const Adoption = require('../models/Adoption')


const AdoptionController = {

  index: async (req,res) =>{
    const {user_id} = req.headers
    const adoptions = await Adoption.find({user: user_id}).populate('pet')
    return res.json(adoptions)
  },

  store: async (req,res) => {
    const {user_id} = req.headers
    const {pet_id} = req.params
    const {date} = req.body

    if(!date){
      return res.status(400).send('Selecione uma data')
    }
    const petExists = await Pet.findOne({_id: pet_id})
    const user = await User.findById(user_id)

    if (!petExists){
      return res.status(400).send('Animal não disponível para adoação')
    }

    if (petExists.adopted === 'true'){
      return res.status(400).send('Este animal já foi adotado')
    }

    if( String(user._id) === String(petExists.user)){
      return res.status(401).json({error: 'Querendo adotar seu próprio animal?'})}
    const newAdoption = new Adoption({
      user: user_id,
      pet: pet_id,
      date})
    await newAdoption.save()
      const populatedAdoption = await Adoption.findById(newAdoption._id).populate('pet').populate('user')
    return res.send(populatedAdoption)
  },

  erase: async (req,res) => {
    const {adoption_id} = req.body

    if (!adoption_id){
      return res.status(400).send('Selecione uma adoação para ser cancelada')
    }

    await Adoption.findByIdAndDelete(adoption_id)

    return res.send('deu certo')
  }

}
module.exports = AdoptionController

