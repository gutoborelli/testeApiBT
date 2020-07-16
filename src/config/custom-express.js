const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const logger = require('../logger').getDefaultLogger();
const tokenVal = require('../auth/token');
const isAuthRoute = require('../auth/auth-routes').isAuthRoute;
const messageUtil = require('../helpers/error');


const verificaToken = async(req, res, next) =>{

    if (await isAuthRoute(req.path)) { //se a rota não precisa ser autenticada

        try {
            var token = req.headers['x-access-token'];
            if (!token) 
                {
                    throw new messageUtil.AuthError('Não foi fornecido token de autenticação!', 401); // falta de token no header
                }
        
            await tokenVal.verificaToken(token); // verifica se o token é valido
            next();
        } catch (error) {
            if (!!error.errorCode)
                res.status(error.errorCode).json({statusCode: res.statusCode, body: error.message});
            else
                res.status(500).json({statusCode: res.statusCode, body: error.message});
        }
    }
    else {
        next();
    }
}


const  logCalls = async(req, res, next) => {
    logger.info('URL:' + req.url);
    next();
}


const modifyResponseBody = async(req, res, next) => {
    var oldSend = res.send;

    res.send = function(data){
        
        arguments[0] = JSON.stringify({statusCode: res.statusCode, body: JSON.parse(arguments[0])});
        oldSend.apply(res, arguments);
    }
    next();
}



module.exports = () => {
    const app = express();

    app.use(logCalls);
    app.use(verificaToken);
    app.use(modifyResponseBody);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    consign()
        .include('controllers')
        .into(app);
    return app;
}