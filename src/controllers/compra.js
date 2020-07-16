//arquivo de chamadas da API
const uowCompra = require('../uow/compra');
const validacao = require('../validations/validations');
module.exports = app => {

   
    //rotas de compras
    app.post('/compra', async (req, res) => 
    {
        try {
            await validacao.compraSchema.validateAsync(req.body);
            await uowCompra.novaCompra(req.body);
            res.status(201).json('compra inserida');
        } catch (err)
        {
            if (!!err.errorCode)
                res.status(err.errorCode).json(err.message);
            else
                res.status(500).json(err.message);
        }
    });

    app.get('/compra', async (req, res) => {
        try {
            let result = await uowCompra.listarCompras();
            res.status(200).json(result);
        } catch (err)
        {
            if (!!err.errorCode)
                res.status(err.errorCode).json(err.message);
            else
                res.status(500).json(err.message);
        }

    });
}