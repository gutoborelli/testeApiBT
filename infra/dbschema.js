const backConn = require('./connection').backConn;
const createDbStructure = async() =>{
    let SQL;
    await backConn.connect();

    // TODO: 
    SQL = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'cashback'"
    let res = await backConn.query(SQL);

    if (!res) {
        SQL = 'CREATE DATABASE IF NOT EXISTS cashback;'
        await backConn.query(SQL);

        SQL = `create table revendedor 
        (id int auto_increment,CPF varchar(14) null,
         nome varchar(30) null, email varchar(50) null, 
         senha varchar(50) null, status varchar(30),
         primary key (id)`;

        await backConn.query(SQL);

    }
}

module.exports = {createDbStructure};