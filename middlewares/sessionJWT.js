
const jwt = require('jsonwebtoken');
require('dotenv').config();

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const generarToken = ({userData}) => {
    
    // No se por qué lo hace como promesa.
    return new Promise((resolve, reject) => {
        jwt.sign({userData}, PRIVATE_KEY, { expiresIn: '30min' }, (error,token) => {
            if (error) {
                console.log(error);
                reject('No se generó el Token');
            } else {
            //console.log(token)
            resolve(token)}
        })
    })
}

module.exports = {
    generarToken
};