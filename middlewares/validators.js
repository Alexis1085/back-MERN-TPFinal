
//No FUNCIONA

const { body } = require('express-validator');

const validateLogin = () => {
    body('usuario').exists()
    body('password').exists()
};

module.exports = {
    validateLogin
};