//arquivo de chamadas da API
const modelRevendedor = require('../models/revendedor');
module.exports = app => {


    //rotas do revendedor
    app.get('/revendedor/cashback/:cpf', async (req, res) => 
    {
        try {
            let result = await modelRevendedor.consultaCashback(req.params.cpf);
            res.status(200).json(result);
        } catch (err)
        {
            if (!!err.errorCode)
                res.status(err.errorCode).json(err.message);
            else
                res.status(500).json(err.message);
        }

    });
    
    app.post('/revendedor', async (req, res) => {
        try {
            await modelRevendedor.novoRevendedor(req.body);
            res.status(201).json('revendedor inserido');
        } catch (err)
        {
            if (!!err.errorCode)
                res.status(err.errorCode).json(err.message);
            else
                res.status(500).json(err.message);
        }
    });

    app.post('/revendedor/login', async (req, res) => {
        try {
            await modelRevendedor.validaLogin(req.body);
            res.status(200).json('Login OK!');
        } catch (err)
        {
            if (!!err.errorCode)
            {
                res.status(err.errorCode).json(err.message);}
            else {
                res.status(500).json(err.message);
            }
        }
    
    });

}