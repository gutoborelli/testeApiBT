const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const logger = require('../logger').getDefaultLogger();

function logCalls(req, res, next) {
    logger.info('URL:' + req.url);
    next();
}


function modifyResponseBody(req, res, next) {
    var oldSend = res.send;

    res.send = function(data){
        // arguments[0] (or `data`) contains the response body
        arguments[0] = JSON.stringify({statusCode: res.statusCode, body: JSON.parse(arguments[0])});
        oldSend.apply(res, arguments);
    }
    next();
}



module.exports = () => {
    const app = express();

    app.use(logCalls);
    app.use(modifyResponseBody);

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    
    consign()
        .include('controllers')
        .into(app);
    return app;
}