// Módulo para la Conexión a la Base de Datos de Mongo:

const mongoose = require('mongoose');

require('dotenv').config();

const URL = process.env.MONGO;

const mongooseConnection = mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`Conectado a la Base de Datos de MONGO`);
    }).catch((error) => {
        console.log(`Error en la conexión a la BD: ${error}`);
    });

module.exports = mongooseConnection;