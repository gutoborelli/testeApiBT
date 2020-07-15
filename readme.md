Projeto CashBack


Para inicializar um ambiente novo:
- Preencher corretamente as informações de acesso à banco de dados MySQL (já estão preenchidas com o banco de dados localizado em minha conta AWS), localizado no arquivo .env
- executar: npm run initialize


Para subir a API:
- executar: npm start

Observações:
- todas as rotas (com exceção de /revendedor/login) precisam do token autenticado, através do header "x-access-token", fornecido pela rota de login

Rotas:
- POST - /revendedor - Cadastra Novo Revendedor (nome, CPF, email, senha)
- POST - /revendedor/login - Valida login e retorna token  válido por 5 minutos (email, senha)
- GET - /revendedor/cashback/:cpf - Retorna cashback acumulado
- POST - /compra - Cadastra nova compra (codigo, valor, data, CPF)
- GET - /compra - Lista todas as compras

