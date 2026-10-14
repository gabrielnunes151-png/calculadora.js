const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const entrada = readline.createInterface({ input: stdin, output: stdout });

async function solicitarNumero(mensagem) {
	let numero = Number(await entrada.question(mensagem));

	while (!Number.isFinite(numero)) {
		console.log('Digite um número válido.');
		numero = Number(await entrada.question(mensagem));
	}

	return numero;
}

function apresentarResultados(numero1, numero2) {
	console.log(`Soma: ${numero1 + numero2}`);
	console.log(`Subtração: ${numero1 - numero2}`);
	console.log(`Multiplicação: ${numero1 * numero2}`);
	console.log(
		numero2 === 0
			? 'Divisão: não é possível dividir por zero.'
			: `Divisão: ${numero1 / numero2}`,
	);
}

async function realizarCalculo(numeroCalculo) {
	if (numeroCalculo !== undefined) {
		console.log(`\nCálculo ${numeroCalculo}`);
	}

	const numero1 = await solicitarNumero('Digite o primeiro número: ');
	const numero2 = await solicitarNumero('Digite o segundo número: ');
	apresentarResultados(numero1, numero2);
}

async function executarWhile() {
	let continuar = 's';

	while (continuar === 's') {
		await realizarCalculo();
		continuar = (await entrada.question('Deseja realizar outro cálculo? (s/n): '))
			.trim()
			.toLowerCase();
	}
}

async function executarDoWhile() {
	let continuar;

	do {
		await realizarCalculo();
		continuar = (await entrada.question('Deseja realizar outro cálculo? (s/n): '))
			.trim()
			.toLowerCase();
	} while (continuar === 's');
}

async function executarFor() {
	let quantidadeCalculos = Number(
		await entrada.question('Quantos cálculos deseja realizar? '),
	);

	while (!Number.isInteger(quantidadeCalculos) || quantidadeCalculos < 0) {
		console.log('Digite uma quantidade inteira igual ou maior que zero.');
		quantidadeCalculos = Number(
			await entrada.question('Quantos cálculos deseja realizar? '),
		);
	}

	for (let indice = 1; indice <= quantidadeCalculos; indice += 1) {
		await realizarCalculo(indice);
	}
}

async function iniciarCalculadora() {
	let exercicio = (await entrada.question(
		'Escolha o exercício: 1 (while), 2 (do...while) ou 3 (for): ',
	)).trim();

	while (!['1', '2', '3'].includes(exercicio)) {
		exercicio = (await entrada.question('Digite 1, 2 ou 3: ')).trim();
	}

	if (exercicio === '1') {
		await executarWhile();
	} else if (exercicio === '2') {
		await executarDoWhile();
	} else {
		await executarFor();
	}
}

iniciarCalculadora()
	.catch((erro) => {
		console.error('Não foi possível executar a calculadora:', erro);
		process.exitCode = 1;
	})
	.finally(() => entrada.close());
