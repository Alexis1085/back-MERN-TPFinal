//*Módulo para el manejo de las Rutas del Panel de Administración:

const express = require('express');
const router = express.Router();

const cors = require('../middlewares/cors');
const { validateLogin } = require('../middlewares/validators');
const { login, publicarTurnos, agendaTurnos, crearModulo, listaModulos, actualizarModulo, eliminarModulo } = require('../controllers/adminControllers');


router.post('/', cors, /* validateLogin, */ login)
router.post('/agenda', cors, publicarTurnos)
router.get('/agenda', cors, agendaTurnos)
router.post('/modulos', cors, crearModulo)
router.get('/modulos', cors, listaModulos)
router.put('/modulos/update/:id', cors, actualizarModulo)
router.delete('/modulos/delete/:id', cors, eliminarModulo)

module.exports = router;