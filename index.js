//* Back-End de la Aplicación de Turnos Médicos
//? Trabajo Final de la Diplomatura Full-Stack de la UTN.
//! Autor: Alexis Gabriel Iacusso

const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Traigo el Módulo de conexión a la Base de Datos:
require('./connection/mongoDB');

const app = express();

//? Middlewares:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.options('*', cors());

//! Rutas:
const adminRouter = require('./routers/adminRouter');
//const productosRouter = require('./router/productosRouter');

app.use('/admin', adminRouter);

//app.use('/', userRouter);
//app.use('/productos', productosRouter);


const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Servidor activo en el Puerto ${PORT}`);
});