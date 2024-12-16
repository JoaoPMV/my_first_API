const Pet = require('../models/Pet')

const dashboardController = {
  show: async (req,res) => {
    const {user_id} = req.headers
    const pets = await Pet.find({user: user_id})
    return res.send(pets)
  }
}

module.exports = dashboardController