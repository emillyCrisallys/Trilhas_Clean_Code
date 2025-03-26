import * as readline from 'readline';
import validarCPF from './validar_CPF';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite o CPF (apenas números ou no formato 123.456.789-09): ', (cpf) => {
    const isValid = validarCPF(cpf);
    if (isValid) {
        console.log('O CPF é válido.');
    } else {
        console.log('O CPF é inválido.');
    }
    rl.close();
});