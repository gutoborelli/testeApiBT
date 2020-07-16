const moment = require('moment');
const { Compra } = require('../models');
const db = require('../models');

const novaCompra = async(payload) =>{
    let status = 'Em validação';
    if (payload.CPF === '153.509.460-56')
    {status = 'Aprovado'}

    let data = moment(payload.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    let mappedPayload = {...payload, status, data};
    
    console.log(Compra);
    await Compra.create(mappedPayload);

}

const listarCompras = async() =>{
    
    SQL = `SELECT codigo, valor, cp.CPF, data, valorAcum
    FROM compra cp
    INNER JOIN (SELECT sum(valor) AS valorAcum, 
                    CPF, 
                    strftime('%Y',data)  +  strftime('%m',data) as dataIndex 
                FROM compra 
                GROUP BY CPF, dataIndex) sub
    ON cp.CPF = sub.CPF 
        AND sub.dataIndex =  strftime('%Y',cp.data)  +  strftime('%m',cp.data)`

    let resDB = await db.sequelize.query(SQL);

    let perc;
    let cashback;
    let res = resDB[0].map(rec => {
        switch (true){
            case (rec.valorAcum <= 1000):
                perc = '10%';
                cashback = rec.valor * 0.1;
                break;
            case (rec.valorAcum <= 1500):
                perc = '15%';
                cashback = rec.valor * 0.1;
                break;
            case (rec.valorAcum <= 1000):
                perc = '10%';
                cashback = rec.valor * 0.1;
                break;
                            
            }
        return {
            codigo: rec.codigo,
            valor: rec.valor,
            CPF: rec.CPF,
            data: rec.data,
            perc: perc,
            cashback: cashback}
    });


    return res;
}

module.exports = {
    novaCompra,
    listarCompras
};