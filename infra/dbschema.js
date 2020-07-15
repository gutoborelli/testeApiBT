require('dotenv').config();
const backConn = require('./connection').backConn;
const logger = require('../logger').getDefaultLogger();

const createDbStructure = async() =>{
    let SQL;
    try {
    await backConn.connect();

    logger.info('Verificando estrutura do banco de dados...');
    
    SQL = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'cashback'"
    let res = await backConn.query(SQL);

    if (!res) {
        logger.info('Criando schema...');
        SQL = 'CREATE DATABASE cashback;'
        await backConn.query(SQL);
        

        logger.info('Criando tabela [revendedor]...');
        SQL = `create table revendedor 
        (id int auto_increment,CPF varchar(14) null,
         nome varchar(30) null, email varchar(50) null, 
         senha varchar(50) null, status varchar(30),
         primary key (id)`;

        await backConn.query(SQL);

        logger.info('Criando tabela [compra]...');
        SQL = `create table compra
        (   id int auto_increment
                primary key,
            codigo int null,
            valor decimal(6,2) null,
            CPF varchar(14) null,
            data datetime null)`;

        await backConn.query(SQL);
        
    }
    await backConn.destroy();
    logger.info('Pronto!');
    logger.error('ddd');
}
catch (err){
    logger.error(err.message);
}
}
createDbStructure();

