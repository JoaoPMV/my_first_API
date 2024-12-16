const mongoose = require('mongoose');

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD

const connectToDatabase = () =>  {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.du5jz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => console.log(`MongoDB Atlas connected`)).catch(() => console.log(`error to conect`))
  }

module.exports = connectToDatabase