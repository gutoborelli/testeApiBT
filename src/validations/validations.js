const Joi = require('@hapi/joi');
 
const revendedorSchema = Joi.object({
    CPF: Joi.string()
        .min(14)
        .max(14)
        .required(),
 
    nome: Joi.string()
        .required(),
 
    senha: Joi.string()
        .min(8)
        .required(),
        
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
});
const loginSchema = Joi.object({
    senha: Joi.string()
        .required(),
        
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
});
 
const compraSchema = Joi.object({
    CPF: Joi.string()
        .min(14)
        .max(14)
        .required(),
 
    codigo: Joi.number()
        .required(),
 
    valor: Joi.number()
        .positive()
        .required(),
        
    data: Joi.date()
        .required()
})
module.exports = {
    revendedorSchema,
    compraSchema,
    loginSchema
}