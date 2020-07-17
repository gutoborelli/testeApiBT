const request = require('supertest');
const customExpress = require('../../src/config/custom-express');
const app = customExpress();

describe('Compra', () => {
    let token;
    beforeAll(async () => {
    // pega token válido
        let response = await request(app)
                .post('/revendedor/login')
                .send({email:'root@boti.com', senha:'12345678'});
        token = response.header['token'];

        response = await request(app)
            .post('/revendedor')
            .set({ 'x-access-token': token })
            .send({ 
                nome: 'Jose',
                email: 'bbbb@aaa.com',
                CPF: '123.456.789-99',
                senha: 'aaaaaaaa' });
    });

    it('Deve retornar 401 ao fazer a chamada sem token', async () =>{
        const response = await request(app)
            .post('/compra')
            .send({ 
                codigo: '100',
                valor: '100.20',
                CPF: '123.456.789-99',
                data: '2000/01/01'});
        
        expect (response.status).toBe(401);
    });

    it('Deve retornar 201 ao cadastrar uma nova compra', async () =>{
        const response = await request(app)
            .post('/compra')
            .set({ 'x-access-token': token })
            .send({ 
                codigo: '100',
                valor: '100.20',
                CPF: '123.456.789-99',
                data: '2000/01/01'});
        
        expect (response.status).toBe(201);
    });

    it('Deve retornar 200 ao listar compras', async () =>{
        const response = await request(app)
            .get('/compra')
            .set({ 'x-access-token': token })
            .send();
        console.log(response.body.length);
            
        expect (response.status).toBe(200);
        
    });    
    
});