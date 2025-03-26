"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var validar_CPF_1 = require("./validar_CPF");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Digite o CPF (apenas números ou no formato 123.456.789-09): ', function (cpf) {
    var isValid = (0, validar_CPF_1.default)(cpf);
    if (isValid) {
        console.log('O CPF é válido.');
    }
    else {
        console.log('O CPF é inválido.');
    }
    rl.close();
});
