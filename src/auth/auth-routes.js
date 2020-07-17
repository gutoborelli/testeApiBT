const _ = require('lodash');

const routes = [
    {   name: '/revendedor/login', auth: false}
]

const isAuthRoute = async(route) => {

    let item = _.find(routes, {'name': route}   )

    if (!item) // se não encontra a rota na lista, automaticamente a rota deve ser autenticada
        return true;
    
    return item.auth;

}

module.exports = {isAuthRoute}