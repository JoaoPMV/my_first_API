const express = require('express')
const multer = require('multer')
const uploadConfig = require('./src/config/upload')

const sessionController = require('./src/controllers/sessionController')
const animalController = require('./src/controllers/AnimalController')
const dashboardController = require('./src/controllers/DashboardController')
const AdoptionController = require('./src/controllers/AdoptionController')
const router = express.Router()
const upload = multer({storage: uploadConfig})

// Rotas de animais
router.get('/animals', animalController.index);
router.post('/animal', upload.single('thumbnail'), animalController.store);
router.put('/animals/:pet_id', upload.single('thumbnail'), animalController.update);
router.delete('/animals/cancel', AdoptionController.erase); // Rota fixa antes da dinâmica
router.delete('/animals/:pet_id', animalController.erase);

// Rotas de adoções
router.post('/animals/:pet_id/adoption', AdoptionController.store);
router.get('/adoptions', AdoptionController.index);

// Rotas de sessão e usuário
router.post('/login', sessionController.login);
router.post('/createuser', sessionController.store);
router.get('/index', sessionController.index);

// Outras rotas
router.get('/show', dashboardController.show);



module.exports = router