require('dotenv').config();
const customExpress = require('./config/custom-express');
const connection = require('./infra/connection').conn;
const app = customExpress();

const runner = async() =>{
try{

    await connection.connect();
    // subindo o servidor
    app.listen(process.env.SERVER_PORT, () => console.log(`Servidor pronto na porta...${process.env.SERVER_PORT}`));
} catch (err){
    console.log (err);
}}


runner().then(
    res => {},
    err =>{
        console.log(err);
    }

);