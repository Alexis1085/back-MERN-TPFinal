
const bcrypt = require('bcryptjs');
const { generarToken } = require('../middlewares/sessionJWT');
const Modulos = require('../models/moduloModel');
const Turnos = require('../models/turnoModel')

const login = (req, res) => {
    console.log(req.body);
    credenciales = {
        usuario: "admin",
        password: "admin"
    }

    checkUsuario = req.body.usuario === credenciales.usuario;
    checkPassword = bcrypt.compareSync(credenciales.password, req.body.password)
    
    if (checkUsuario && checkPassword) {
        let token = generarToken(credenciales);
        res.status(200).json({loginStatus: true, token: token});
    } else {
        res.status(200).json({loginStatus: false})
    }
}

const publicarTurnos = async (req, res) => {
    console.log(req.body);
    let idModulo = req.body.idModulo;
    let fechaApertura = new Date(req.body.fechaApertura);
    let fechaCierre = new Date(req.body.fechaCierre);
    fechaCierre.setHours(23,59);
    //console.log(fechaApertura, fechaCierre);
    try {
        let {alias, diaSemana, horaInicio, duracionTurnos, cantidadTurnos } = await Modulos.findById(idModulo, {alias: 1, diaSemana: 1, horaInicio: 1, duracionTurnos: 1, cantidadTurnos: 1})

        // Creo la variable "auxDate" que irá almacenando los valores parciales de los turnos, en fecha y hora:
        let auxDate = new Date(fechaApertura);
        let pedacitos = horaInicio.split(":");
        auxDate.setHours(pedacitos[0], pedacitos[1]);
        //console.log(auxDate);
        /*
        ! do{ if ( for() ) }while Algoritmo que toma el diaSemana del Módulo y lo compara con el dia de auxDate (inicialmente igual a fechaApertura):
        * Si coinciden lo usa como fecha para insertar en la base de datos, luego auxDate se setea como 7 días después, se fija si no es mayor a fechaCierre y también lo inserta. Así hasta que sea mayor a fechaCierre. 
        * Si no coinciden setea auxDate como fechaApertura +1 y vuelve a comparar hasta que coicidan */
        do {
            if (auxDate.getDay() == diaSemana) {
                for (let i=0; i< cantidadTurnos; i++) {
                    //! Creo la variable "turno" tipo 'Date' para insertar los valores en la base de datos:
                    let turno = new Date(auxDate);
                    let nuevoTurno = new Turnos({ turno, idModulo, alias })
                    try {
                        await nuevoTurno.save()
                        //En la Base de Datos los guarda en UTC
                    } catch (error) {
                        console.log(error);
                        res.status(400).send('Problema en la DB');
                    }
                    auxDate.setMinutes(auxDate.getMinutes() + duracionTurnos);
                }
                auxDate.setDate(auxDate.getDate() +7)
                auxDate.setHours(pedacitos[0], pedacitos[1]);
                //console.log(auxDate);
            } else {
                auxDate.setDate(auxDate.getDate() +1)
                //console.log(auxDate);
            }
        } while (auxDate <= fechaCierre);
        res.status(200).json({turnosPublicados: true})
    } catch (error) {
        console.log(error);
        res.status(400).send('Problema en la DB');
    }
}

const agendaTurnos = async (req, res) => {
    let today = new Date()
    today.setHours(0);
    try {
        let listaTurnos = await Turnos.find().where('turno').gt(today).sort('turno').exec();
        //console.log(listaTurnos)
        listaTurnos.map((element) => {
            element.dia = element.turno.getDate();
            element.mes = element.turno.getMonth()
        })
        console.log(listaTurnos)
        res.status(200).json({ listaTurnos })
    } catch (error) {
        console.log(error);
        res.status(400).send('Problema en la DB');
    }
}

const crearModulo = async (req, res) => {
    console.log(req.body);
    let { alias, calle, ciudad, diaSemana, horaInicio, duracionTurnos, cantidadTurnos, mensaje } = req.body;
    let diaSemanaString = "";
    switch (req.body.diaSemana) {
        case "1": diaSemanaString = "lunes";
            break;
        case "2": diaSemanaString = "martes";
            break;
            case "3": diaSemanaString = "miércoles";
            break;
            case "4": diaSemanaString = "jueves";
            break;
            case "5": diaSemanaString = "viernes";
            break;
            case "6": diaSemanaString = "sábado";
            break;
        };
        try {
        let nuevoModulo = new Modulos({alias, calle, ciudad, diaSemana, diaSemanaString, horaInicio, duracionTurnos, cantidadTurnos, mensaje});
        console.log(nuevoModulo);
        await nuevoModulo.save();
        res.status(200).json({moduloAgregado: true});
    }
    catch (error) {
        console.log(error);
        res.status(404).send('Problema en la DB');
    }
}

const listaModulos = async (req, res) => {
    try {
        let listaModulos = await Modulos.find({});
        res.status(200).json({ listaModulos })
    } catch (error) {
        console.log(error);
        res.status(400).send('Problema en la DB');
    }
}

const actualizarModulo = async (req, res) => {
    let id = req.params.id;
    
    let { alias, calle, ciudad, diaSemana, horaInicio, duracionTurnos, cantidadTurnos, mensaje } = req.body;
    let diaSemanaString = "";
    switch (req.body.diaSemana) {
        case "1": diaSemanaString = "lunes";
            break;
        case "2": diaSemanaString = "martes";
            break;
        case "3": diaSemanaString = "miércoles";
            break;
        case "4": diaSemanaString = "jueves";
            break;
        case "5": diaSemanaString = "viernes";
            break;
        case "6": diaSemanaString = "sábado";
            break;
    };
    try {
        await Modulos.findByIdAndUpdate(id, { alias, calle, ciudad, diaSemana, diaSemanaString, horaInicio, duracionTurnos, cantidadTurnos, mensaje });
        res.status(200).json({moduloActualizado: true})
    }
    catch (error) {
        console.log(error);
        res.status(404).send('Problema en la DB');
    }
}

const eliminarModulo = async (req, res) => {
    let id = req.params.id;
    try {
        await Modulos.findByIdAndDelete(id);
        res.status(200).json({moduloEliminado: true})
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}

module.exports = {
    login,
    publicarTurnos,
    agendaTurnos,
    crearModulo,
    listaModulos,
    actualizarModulo,
    eliminarModulo
};