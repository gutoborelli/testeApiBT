require('dotenv').config(
    {path: process.env.NODE_ENV === 'test' ? '.test.env' : '.env'}
);
const logger = require('../logger').getDefaultLogger();
const customExpress = require('./config/custom-express');
const app = customExpress();

const runner = async() =>{
try{

    // subindo o servidor
    app.listen(process.env.SERVER_PORT, () => logger.info(`Servidor pronto na porta...${process.env.SERVER_PORT}`));
} catch (err){
    logger.error (err);
}}


runner().then(
    () => {
        logger.info('Servidor finalizado!');
    },
    err =>{
        logger.error(err);
    }

);