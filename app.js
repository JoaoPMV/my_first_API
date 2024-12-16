const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectToDatabase = require('./src/config/database')
const path = require('node:path')
const bodyParsert = require('body-parser')
const router = require('./routes')

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'src', 'views'))

app.use('/files', express.static(path.resolve(__dirname,'uploads')))
app.use(express.urlencoded({ extended: true }))
connectToDatabase()
app.use(express.json())
app.use(bodyParsert.urlencoded({extended: false}))
app.use(bodyParsert.json())
app.use(cors());

app.use(router)

app.listen(PORT, () => console.log(`Server running on http://localhost:${3000}`))
