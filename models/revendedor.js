const conn = require('../infra/connection').conn;
const util = require('util');
const ax = require('axios');
const messageUtil = require('../helpers/error');

const query = util.promisify(conn.query).bind(conn);

const novoRevendedor = async(payload) =>{
    
    SQL = "INSERT INTO revendedor SET ?"

    let res = await query(SQL, payload);
}

const validaLogin = async(payload) =>{
    
    if(payload.email === 'root@boti.com') //login root para permitir load dos usuarios
    {
        return {
            id:0
        }
    }


    SQL = `SELECT id FROM revendedor 
        WHERE email = ?
        AND senha = ?`;

    let res = await query(SQL, [payload.email, payload.senha]);
    if (res.length > 0)
    {
        return res[0];
    }
    else {
        throw new messageUtil.GeneralError('Login Inválido', 401);
    }
}

const consultaCashback = async(cpf) =>{
    const fullPath = process.env.EXT_ENDPOINT + `?cpf=${cpf}`

    let res = await ax.get(fullPath, {headers: {token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm'}})

    if (res.data.statusCode !=200)
    {
        throw new messageUtil.GeneralError(res.data.body.message, 400);
    }

    return res.data.body;
}

module.exports = {
    novoRevendedor,
    validaLogin,
    consultaCashback
};