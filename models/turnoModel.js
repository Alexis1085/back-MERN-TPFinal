const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const turnoSchema = new Schema ({
    turno: {
        type: Date,
        required: true
    },
    idModulo: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true,
    },
    paciente: {
        type: String
    }
});


module.exports = mongoose.model('Turnos', turnoSchema);