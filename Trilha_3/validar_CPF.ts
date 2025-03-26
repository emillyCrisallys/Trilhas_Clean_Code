function validar_CPF(cpf: string): boolean {
    
    cpf = cpf.replace(/\D/g, '');

    
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    
    const calcularDigito = (parte: string, pesoInicial: number): number => {
        let soma = 0;
        for (let i = 0; i < parte.length; i++) {
            soma += parseInt(parte[i]) * (pesoInicial - i);
        }
        const digito = (soma * 10) % 11;
        return digito >= 10 ? 0 : digito;
    };

    const primeiroDigito = calcularDigito(cpf.slice(0, 9), 10);
    const segundoDigito = calcularDigito(cpf.slice(0, 10), 11);

    return primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10]);
}

export default validar_CPF;