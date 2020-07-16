const mysql = require('mysql');

const backConn = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
});



const conn = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME

});

module.exports = {conn, backConn};