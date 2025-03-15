"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function calcularValorBase(consumoKwh, tarifaKwh) {
    return consumoKwh * tarifaKwh;
}
function calcularAcréscimoBandeira(consumoKwh, bandeira) {
    var bandeiraTaxas = {
        verde: 0,
        amarela: 0.02,
        vermelha: 0.05,
    };
    var taxa = bandeiraTaxas[bandeira];
    if (taxa !== undefined) {
        return taxa * consumoKwh;
    }
    throw new Error("Bandeira tarifária inválida. Use 'verde', 'amarela' ou 'vermelha'.");
}
function calcularImposto(totalSemImposto, percImposto) {
    return (percImposto / 100) * totalSemImposto;
}
function calcularDescontoOuAcrescimo(consumoKwh, total) {
    if (consumoKwh <= 100) {
        return { valor: total * 0.05, tipo: "desconto" }; // 5% de desconto
    }
    else if (consumoKwh > 300) {
        return { valor: total * 0.10, tipo: "acréscimo" }; // 10% de acréscimo
    }
    return { valor: 0, tipo: "nenhum" }; // Sem desconto ou acréscimo
}
function calcularContaEnergia(consumoKwh, tarifaKwh, percImposto, bandeira) {
    var valorBase = calcularValorBase(consumoKwh, tarifaKwh);
    var acrescimo = calcularAcréscimoBandeira(consumoKwh, bandeira);
    var totalSemImposto = valorBase + acrescimo;
    var imposto = calcularImposto(totalSemImposto, percImposto);
    var _a = calcularDescontoOuAcrescimo(consumoKwh, totalSemImposto + imposto), valor = _a.valor, tipo = _a.tipo;
    return { valorFinal: totalSemImposto + imposto - valor, descontoTipo: tipo }; // Aplica o desconto ou acréscimo
}
function perguntar(prompt) {
    return new Promise(function (resolve) {
        rl.question(prompt, resolve);
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var consumoKwh, _a, tarifaKwh, _b, percImposto, _c, bandeira, _d, valorFinal, descontoTipo;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = parseFloat;
                    return [4 /*yield*/, perguntar("Digite o consumo de energia elétrica (kWh): ")];
                case 1:
                    consumoKwh = _a.apply(void 0, [_e.sent()]);
                    _b = parseFloat;
                    return [4 /*yield*/, perguntar("Digite a tarifa básica por kWh (R$): ")];
                case 2:
                    tarifaKwh = _b.apply(void 0, [_e.sent()]);
                    _c = parseFloat;
                    return [4 /*yield*/, perguntar("Digite a porcentagem de imposto aplicada sobre o valor total: ")];
                case 3:
                    percImposto = _c.apply(void 0, [_e.sent()]);
                    return [4 /*yield*/, perguntar("Digite a bandeira tarifária ('verde', 'amarela' ou 'vermelha'): ")];
                case 4:
                    bandeira = (_e.sent()).trim().toLowerCase();
                    try {
                        _d = calcularContaEnergia(consumoKwh, tarifaKwh, percImposto, bandeira), valorFinal = _d.valorFinal, descontoTipo = _d.descontoTipo;
                        console.log("O valor final da conta de energia el\u00E9trica \u00E9: R$ ".concat(valorFinal.toFixed(2)));
                        console.log("Tipo de ajuste: ".concat(descontoTipo.charAt(0).toUpperCase() + descontoTipo.slice(1))); // Exibe se houve desconto ou acréscimo
                    }
                    catch (error) {
                        console.error(error instanceof Error ? error.message : "Ocorreu um erro inesperado.");
                    }
                    finally {
                        rl.close();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
