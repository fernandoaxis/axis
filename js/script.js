document.addEventListener('DOMContentLoaded', function() {
    var inputsConsumo = document.querySelectorAll('.calc');
    var consumoMensalOutput = document.getElementById('consumo-mensal');
    var consumoDiarioOutput = document.getElementById('consumo-diario');

    inputsConsumo.forEach(function(input) {
        input.addEventListener('input', calcularConsumo);
    });

    function calcularConsumo() {
        var somaConsumo = 0;
        inputsConsumo.forEach(function(input) {
            somaConsumo += parseFloat(input.value) || 0;
        });

        var consumoMedioMensal = somaConsumo / 12;
        var consumoMedioDiario = consumoMedioMensal / 30;

        consumoMensalOutput.textContent = consumoMedioMensal.toFixed(2) + ' kWh';
        consumoDiarioOutput.textContent = consumoMedioDiario.toFixed(2) + ' kWh';
    }

    var potenciaPlacaInput = document.getElementById('potencia-placa');
    var irradiacaoSolarInput = document.getElementById('irradiacao-solar');
    var quantidadePlacasInput = document.getElementById('quantidade-placas');
    var geracaoMensalOutput = document.getElementById('geracao-mensal');
    var excedenteMensalOutput = document.getElementById('excedente-mensal');

    potenciaPlacaInput.addEventListener('input', calcularGeracao);
    irradiacaoSolarInput.addEventListener('input', calcularGeracao);
    quantidadePlacasInput.addEventListener('input', calcularGeracao);

    function calcularGeracao() {
        var potenciaPlaca = parseFloat(potenciaPlacaInput.value);
        var irradiacaoSolar = parseFloat(irradiacaoSolarInput.value);
        var quantidadePlacas = parseFloat(quantidadePlacasInput.value);

        if (!isNaN(potenciaPlaca) && !isNaN(irradiacaoSolar) && !isNaN(quantidadePlacas)) {
            var geracaoDiariaPorPlaca = potenciaPlaca * irradiacaoSolar / 1000;
            var geracaoDiariaTotal = geracaoDiariaPorPlaca * quantidadePlacas;
            var geracaoMensalEstimada = geracaoDiariaTotal * 30;
            var consumoMensalEsperado = 600; // Altere conforme necessário

            var excedenteMensal = geracaoMensalEstimada - consumoMensalEsperado;

            geracaoMensalOutput.textContent = geracaoMensalEstimada.toFixed(2) + ' kWh';
            excedenteMensalOutput.textContent = excedenteMensal.toFixed(2) + ' kWh';
        } else {
            geracaoMensalOutput.textContent = 'Valores inválidos';
            excedenteMensalOutput.textContent = 'Valores inválidos';
        }
    }

    var qtdPlacasInput = document.getElementById('qtd-placas');
    var potenciaPlacasInput = document.getElementById('potencia-placas-inversor');
    var potenciaInversorOutput = document.getElementById('potencia-inversor');

    qtdPlacasInput.addEventListener('input', calcularPotenciaMinimaInversor);
    potenciaPlacasInput.addEventListener('input', calcularPotenciaMinimaInversor);

    function calcularPotenciaMinimaInversor() {
        var qtdPlacas = parseFloat(qtdPlacasInput.value);
        var potenciaPlacas = parseFloat(potenciaPlacasInput.value);

        if (!isNaN(qtdPlacas) && !isNaN(potenciaPlacas)) {
            var potenciaMinimaInversor = qtdPlacas * potenciaPlacas / 1000;
            potenciaInversorOutput.textContent = potenciaMinimaInversor.toFixed(2) + ' kW';
        } else {
            potenciaInversorOutput.textContent = 'Valores inválidos';
        }
    }
});
