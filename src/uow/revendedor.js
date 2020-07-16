const ax = require('axios');
const messageUtil = require('../helpers/error');
const { Revendedor } = require('../models');

const novoRevendedor = async(payload) =>{
    
    await Revendedor.create(payload);
    
}

const validaLogin = async(payload) =>{
    
    if(payload.email === 'root@boti.com') //login root para permitir load dos usuarios
    {
        return {
            id:0
        }
    }
    
    let res = await Revendedor.findOne({
        where: {
            email: payload.email,
            senha: payload.senha
        }
    });
    if (!!res)
    {
        return res;
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