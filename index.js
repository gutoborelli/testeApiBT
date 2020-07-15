require('dotenv').config();
const customExpress = require('./config/custom-express');
const connection = require('./infra/connection').conn;
const dbschema = require('./infra/dbschema');
const app = customExpress();

const runner = async() =>{
try{
    //certify DB structure
    //await dbschema.createDbStructure();

    await connection.connect();
    // subindo o servidor
    app.listen(process.env.SERVER_PORT, () => console.log(`server listening on port...${process.env.SERVER_PORT}`));
} catch (err){
    console.log (err);
}}


runner().then(
    res => {},
    err =>{
        console.log(err);
    }

);