
const cors = require('cors');

require('dotenv').config();

const ORIGIN = process.env.URL_FRONT;

//* Al configurar este Objeto, estoy permitiendo sólamente al dominio 'origin' comunicarse con mi App:
const corsOptions = {
    origin: ORIGIN,
    optionsSuccessStatus: 200
}

module.exports = cors(corsOptions);