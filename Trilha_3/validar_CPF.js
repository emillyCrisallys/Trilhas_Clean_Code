"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validar_CPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }
    var calcularDigito = function (parte, pesoInicial) {
        var soma = 0;
        for (var i = 0; i < parte.length; i++) {
            soma += parseInt(parte[i]) * (pesoInicial - i);
        }
        var digito = (soma * 10) % 11;
        return digito >= 10 ? 0 : digito;
    };
    var primeiroDigito = calcularDigito(cpf.slice(0, 9), 10);
    var segundoDigito = calcularDigito(cpf.slice(0, 10), 11);
    return primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10]);
}
exports.default = validar_CPF;
