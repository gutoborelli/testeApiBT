const jwt = require('jsonwebtoken');
const { AuthError } = require('../helpers/error');

const  verificaToken = async (token) => {
    try {
        await jwt.verify(token, process.env.TOKEN_SECRET);
    }catch (err) {
        throw new AuthError('Erro de autenticação!', 401);
    }
}


module.exports = {verificaToken};