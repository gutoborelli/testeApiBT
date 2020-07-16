//arquivo de chamadas da API
const uowRevendedor = require('../uow/revendedor');
const validacao = require('../validations/validations');
const jwt = require('jsonwebtoken');

module.exports = app => {


    //rotas do revendedor
    app.get('/revendedor/cashback/:cpf', async (req, res) => 
    {
        try {
            let result = await uowRevendedor.consultaCashback(req.params.cpf);
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
            await validacao.revendedorSchema.validateAsync(req.body);

            await uowRevendedor.novoRevendedor(req.body);
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
            await validacao.loginSchema.validateAsync(req.body);

            let result = await uowRevendedor.validaLogin(req.body);

        
            var token = jwt.sign({ id: result.id }, process.env.TOKEN_SECRET, {
                expiresIn: 300 
                });
            res.set({ auth: true, token: token });
            res.status(200).json('Login ok!');
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