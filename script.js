class Calculadora{

    constructor(textoCalculoAnterior, textoCalculoAtual){
        this.textoCalculoAnterior = textoCalculoAnterior;
        this.textoCalculoAtual = textoCalculoAtual;
        this.limpa();
    }

    limpa(){
        this.calculoAtual = '';
        this.calculoAnterior = '';
        this.operacao = undefined;
    }

    deleta(){
		this.calculoAtual = this.calculoAtual.toString().slice(0, -1);
    }

    adicionaNumero(numero){
        if (numero === ',' && this.calculoAtual.includes(',')) return;
        this.calculoAtual = this.calculoAtual.toString() + numero.toString();
    }

    escolheOperacao(operacao){
        if (this.calculoAtual === '') return;
        if (this.calculoAnterior !== '') {
            this.calcula();
        }
        this.operacao = operacao;
        this.calculoAnterior = this.calculoAtual;
        this.calculoAtual = '';
    }

    calcula(){
        let resultado;
        const anterior = parseFloat(this.calculoAnterior);
        const atual = parseFloat(this.calculoAtual);
        if (isNaN(anterior) || isNaN(atual)) return
        switch (this.operacao) {
            case '+':
                resultado = anterior + atual
                break;
            case '−':
                resultado = anterior - atual
                break;
            case '⨉':
                resultado = anterior * atual
                break;
            case '÷':
                resultado = anterior / atual
                break;
			default:
				return;
        }
		this.calculoAtual = resultado;
		this.operacao = undefined;
		this.calculoAnterior = '';
    }

	getNumeroDisplay(numero){
		const stringNumero = numero.toString();
		const insereDigitos = parseFloat(stringNumero.split('.')[0])
		const decimalDigitos = stringNumero.split('.')[1]
		let insereDisplay
		if (isNaN(insereDigitos)){
			insereDisplay = '';
		} else{
			insereDisplay = insereDigitos.toLocaleString('en', {
				maximumFractionDigits: 0 })
		}
		if (decimalDigitos != null){
			return `${insereDisplay}.${decimalDigitos}`
		} else{
			return insereDisplay;
		}
	}

    atualizaDisplay(){
        this.textoCalculoAtual.innerText = this.getNumeroDisplay(this.calculoAtual);
		if(this.operacao != null){
			this.textoCalculoAnterior.innerText =
			`${this.getNumeroDisplay(this.calculoAnterior)} ${this.operacao}`
		} else{
			this.textoCalculoAnterior.innerText = ''
		}
    }

}

const botoesNumero = document.querySelectorAll('[data-numero]');
const botoesOperacao = document.querySelectorAll('[data-operacao]');
const botaoLimpa = document.querySelector('[data-limpa]');
const botaoDeleta = document.querySelector('[data-deleta]');
const botaoIgual = document.querySelector('[data-igual]');
const textoCalculoAnterior = document.querySelector('[data-calculo-anterior]');
const textoCalculoAtual = document.querySelector('[data-calculo-atual]');

const calculadora = new Calculadora (textoCalculoAnterior, textoCalculoAtual);

botoesNumero.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.adicionaNumero(botao.innerText);
        calculadora.atualizaDisplay();
    });
});

botoesOperacao.forEach(botao => {
    botao.addEventListener('click', () => {
        calculadora.escolheOperacao(botao.innerText);
        calculadora.atualizaDisplay();
    });
});

botaoIgual.addEventListener('click', botao => {
    calculadora.calcula();
    calculadora.atualizaDisplay();
});

botaoLimpa.addEventListener('click', botao => {
    calculadora.limpa();
    calculadora.atualizaDisplay();
})

botaoDeleta.addEventListener('click', botao => {
    calculadora.deleta();
    calculadora.atualizaDisplay();
})