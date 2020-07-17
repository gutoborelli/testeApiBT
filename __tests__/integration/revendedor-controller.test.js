const request = require('supertest');
const customExpress = require('../../src/config/custom-express');
const app = customExpress();


describe('Login', () => {
    it('Deve retornar 200 ao logar corretamente', async () =>{
        const response = await request(app)
            .post('/revendedor/login')
            .send({email:'root@boti.com', senha:'12345678'});
        expect (response.status).toBe(200);
    });

        it('Deve retornar 401 ao se logar incorretamente', async () =>{
        const response = await request(app)
            .post('/revendedor/login')
            .send({email:'user_invalid@boti.com', senha:'12345678'});
        expect (response.status).toBe(401);
    });
});

describe('Revendedor', () => {
    let token;
    // pega token válido
    beforeAll(async () => {
        const response = await request(app)
                .post('/revendedor/login')
                .send({email:'root@boti.com', senha:'12345678'});
        token = response.header['token'];
    });

    it('Deve retornar 401 ao fazer a chamada sem token', async () =>{
        const response = await request(app)
            .post('/revendedor')
            .send({ 
                nome: 'Jose',
                email: 'bbbb@aaa.com',
                CPF: '123.456.789-99',
                senha: 'aaaaaaaa' });
        
        expect (response.status).toBe(401);
    });

    it('Deve retornar 201 ao cadastrar um novo revendedor', async () =>{
        const response = await request(app)
            .post('/revendedor')
            .set({ 'x-access-token': token })
            .send({ 
                nome: 'Jose',
                email: 'bbbb@aaa.com',
                CPF: '123.456.789-99',
                senha: 'aaaaaaaa' });
                
        expect (response.status).toBe(201);
    });

    it('Deve retornar 200 ao logar com usuario recém criado', async () =>{
        const response = await request(app)
            .post('/revendedor/login')
            .set({ 'x-access-token': token })
            .send({email:'bbbb@aaa.com', senha:'aaaaaaaa'});
            
        expect (response.status).toBe(200);
    });    

    it('Deve retornar 200 ao listar o cashback', async () =>{
        const response = await request(app)
            .get('/revendedor/cashback/123.456.789-99')
            .set({ 'x-access-token': token })
            .send();
        expect (response.status).toBe(200);
    });    
    
});