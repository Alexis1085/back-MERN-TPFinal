const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const moduloSchema = new Schema ({
    alias: {
        type: String,
        required: true,
    },
    calle: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    diaSemana: {
        type: Number,
        required: true
    },
    diaSemanaString: {
        type: String,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    duracionTurnos: {
        type: Number,
        required: true
    },
    cantidadTurnos: {
        type: Number,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Modulos', moduloSchema);