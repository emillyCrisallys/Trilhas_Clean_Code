import * as readline from "readline";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function calcularValorBase(consumoKwh: number, tarifaKwh: number): number {
  return consumoKwh * tarifaKwh;
}


function calcularAcréscimoBandeira(consumoKwh: number, bandeira: string): number {
  const bandeiraTaxas: Record<string, number> = {
    verde: 0,
    amarela: 0.02,
    vermelha: 0.05,
  };

  const taxa = bandeiraTaxas[bandeira];
  if (taxa !== undefined) {
    return taxa * consumoKwh;
  }

  throw new Error("Bandeira tarifária inválida. Use 'verde', 'amarela' ou 'vermelha'.");
}


function calcularImposto(totalSemImposto: number, percImposto: number): number {
  return (percImposto / 100) * totalSemImposto;
}


function calcularDescontoOuAcrescimo(consumoKwh: number, total: number): { valor: number; tipo: string } {
  if (consumoKwh <= 100) {
    return { valor: total * 0.05, tipo: "desconto" }; // 5% de desconto
  } else if (consumoKwh > 300) {
    return { valor: total * 0.10, tipo: "acréscimo" }; // 10% de acréscimo
  }
  return { valor: 0, tipo: "nenhum" }; // Sem desconto ou acréscimo
}


function calcularContaEnergia(consumoKwh: number, tarifaKwh: number, percImposto: number, bandeira: string): { valorFinal: number; descontoTipo: string } {
  const valorBase = calcularValorBase(consumoKwh, tarifaKwh);
  const acrescimo = calcularAcréscimoBandeira(consumoKwh, bandeira);
  const totalSemImposto = valorBase + acrescimo;
  const imposto = calcularImposto(totalSemImposto, percImposto);
  
  const { valor, tipo } = calcularDescontoOuAcrescimo(consumoKwh, totalSemImposto + imposto);

  return { valorFinal: totalSemImposto + imposto - valor, descontoTipo: tipo }; // Aplica o desconto ou acréscimo
}


function perguntar(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}


async function main() {
  const consumoKwh = parseFloat(await perguntar("Digite o consumo de energia elétrica (kWh): "));
  const tarifaKwh = parseFloat(await perguntar("Digite a tarifa básica por kWh (R$): "));
  const percImposto = parseFloat(await perguntar("Digite a porcentagem de imposto aplicada sobre o valor total: "));
  const bandeira = (await perguntar("Digite a bandeira tarifária ('verde', 'amarela' ou 'vermelha'): ")).trim().toLowerCase();

  try {
    const { valorFinal, descontoTipo } = calcularContaEnergia(consumoKwh, tarifaKwh, percImposto, bandeira);
    console.log(`O valor final da conta de energia elétrica é: R$ ${valorFinal.toFixed(2)}`);
    console.log(`Tipo de ajuste: ${descontoTipo.charAt(0).toUpperCase() + descontoTipo.slice(1)}`); // Exibe se houve desconto ou acréscimo
  } catch (error: unknown) {
    console.error(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
  } finally {
    rl.close();
  }
}


main();