require('dotenv').config(
    {path: process.env.NODE_ENV === 'test' ? '.test.env' : '.env'}
);
const customExpress = require('./config/custom-express');
const app = customExpress();

const runner = async() =>{
try{

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