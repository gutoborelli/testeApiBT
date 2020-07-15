
const errorPrototypeFactory = (name) => {
    return function (message, errorCode) {
        this.message = message;
        this.name = name;
        if (!!errorCode) this.errorCode = errorCode;
    }
};


const GeneralError = errorPrototypeFactory('Erro geral');
GeneralError.prototype = new Error();

const AuthError = errorPrototypeFactory('Erro de autenticação');
AuthError.prototype = new Error();


module.exports = {
    GeneralError,
    AuthError
}