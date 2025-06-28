// ============================
// SEÇÃO 1: ESTRUTURAS DE CONTROLE AVANÇADAS
// ============================

/**
 * 1. Validação de Datas
 * Função que verifica se uma data é válida
 */
function ehDataValida(dia, mes, ano) {
    // Verificar se os valores são números válidos
    if (!Number.isInteger(dia) || !Number.isInteger(mes) || !Number.isInteger(ano)) {
        return false;
    }
    
    // Verificar limites básicos
    if (mes < 1 || mes > 12 || dia < 1 || ano < 1) {
        return false;
    }
    
    // Função auxiliar para verificar ano bissexto
    function ehAnoBissexto(ano) {
        return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
    }
    
    // Dias por mês (considerando ano não bissexto)
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Ajustar fevereiro para ano bissexto
    if (ehAnoBissexto(ano)) {
        diasPorMes[1] = 29;
    }
    
    // Verificar se o dia é válido para o mês
    return dia <= diasPorMes[mes - 1];
}

/**
 * 2. Jogo de Adivinhação
 * Script que gera número aleatório e permite ao usuário adivinhar
 */
function jogoAdivinhacao() {
    const numeroSecreto = Math.floor(Math.random() * 100) + 1;
    let tentativas = 0;
    let acertou = false;
    
    console.log("🎯 Jogo de Adivinhação!");
    console.log("Adivinhe o número entre 1 e 100!");
    
    while (!acertou) {
        // Em ambiente real, usar prompt() ou readline
        // Aqui simularemos com números aleatórios para demonstração
        const palpite = Math.floor(Math.random() * 100) + 1;
        tentativas++;
        
        console.log(`Tentativa ${tentativas}: ${palpite}`);
        
        if (palpite === numeroSecreto) {
            console.log(`🎉 Parabéns! Você acertou em ${tentativas} tentativas!`);
            acertou = true;
        } else if (palpite < numeroSecreto) {
            console.log("📈 Mais alto!");
        } else {
            console.log("📉 Mais baixo!");
        }
        
        // Limite de segurança para evitar loop infinito na demonstração
        if (tentativas > 10) break;
    }
    
    return { numeroSecreto, tentativas };
}

/**
 * 3. Palavras Únicas
 * Extrai palavras únicas de uma string
 */
function extrairPalavrasUnicas(texto) {
    const palavras = texto.toLowerCase().split(/\s+/);
    const palavrasUnicas = [];
    
    for (let i = 0; i < palavras.length; i++) {
        const palavra = palavras[i].trim();
        
        if (palavra !== "") {
            let jaExiste = false;
            
            // Verificar se a palavra já existe no array
            for (let j = 0; j < palavrasUnicas.length; j++) {
                if (palavrasUnicas[j] === palavra) {
                    jaExiste = true;
                    break;
                }
            }
            
            if (!jaExiste) {
                palavrasUnicas.push(palavra);
            }
        }
    }
    
    return palavrasUnicas;
}

// ============================
// SEÇÃO 2: FUNÇÕES E RECURSÃO
// ============================

/**
 * 4. Fatorial Recursivo
 * Calcula o fatorial de um número usando recursão
 */
function fatorial(n) {
    if (n < 0) {
        throw new Error("Não é possível calcular fatorial de número negativo");
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * fatorial(n - 1);
}

/**
 * 5. Debounce
 * Função que atrasa a execução de uma função até que pare de ser chamada
 */
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        // Limpar timeout anterior se existir
        clearTimeout(timeoutId);
        
        // Configurar novo timeout
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

/**
 * 6. Memoization
 * Função que armazena em cache os resultados de chamadas anteriores
 */
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        // Criar chave única baseada nos argumentos
        const key = JSON.stringify(args);
        
        // Verificar se resultado já está em cache
        if (cache.has(key)) {
            console.log(`📦 Cache hit para: ${key}`);
            return cache.get(key);
        }
        
        // Calcular resultado e armazenar em cache
        const result = fn.apply(this, args);
        cache.set(key, result);
        console.log(`💾 Armazenado em cache: ${key}`);
        
        return result;
    };
}

// ============================
// SEÇÃO 3: ARRAYS E OBJETOS COMPLEXOS
// ============================

/**
 * 7. Mapeamento e Ordenação
 * Retorna nomes dos produtos ordenados por preço crescente
 */
function ordenarProdutosPorPreco(produtos) {
    return produtos
        .sort((a, b) => a.preco - b.preco)
        .map(produto => produto.nome);
}

/**
 * 8. Agrupamento por Propriedade
 * Agrupa vendas por cliente e soma os totais
 */
function agruparVendasPorCliente(vendas) {
    return vendas.reduce((acc, venda) => {
        const cliente = venda.cliente;
        
        if (acc[cliente]) {
            acc[cliente] += venda.total;
        } else {
            acc[cliente] = venda.total;
        }
        
        return acc;
    }, {});
}

/**
 * 9. Conversão Entre Formatos
 */

// Converte array de pares para objeto
function paresParaObjeto(pares) {
    return pares.reduce((obj, [chave, valor]) => {
        obj[chave] = valor;
        return obj;
    }, {});
}

// Converte objeto para array de pares
function objetoParaPares(obj) {
    return Object.entries(obj);
}

// ============================
// EXEMPLOS DE USO E TESTES
// ============================

console.log("=== TESTES DAS FUNÇÕES ===\n");

// Teste 1: Validação de Datas
console.log("1. Validação de Datas:");
console.log(`29/02/2024 (bissexto): ${ehDataValida(29, 2, 2024)}`); // true
console.log(`29/02/2023 (não bissexto): ${ehDataValida(29, 2, 2023)}`); // false
console.log(`31/04/2024: ${ehDataValida(31, 4, 2024)}`); // false
console.log(`15/07/2024: ${ehDataValida(15, 7, 2024)}`); // true

// Teste 2: Jogo de Adivinhação (simulação)
console.log("\n2. Jogo de Adivinhação (simulação):");
const resultadoJogo = jogoAdivinhacao();

// Teste 3: Palavras Únicas
console.log("\n3. Palavras Únicas:");
const texto = "olá olá mundo mundo javascript é incrível javascript";
console.log(`Texto: "${texto}"`);
console.log(`Palavras únicas:`, extrairPalavrasUnicas(texto));

// Teste 4: Fatorial Recursivo
console.log("\n4. Fatorial Recursivo:");
console.log(`5! = ${fatorial(5)}`);
console.log(`0! = ${fatorial(0)}`);
try {
    fatorial(-1);
} catch (e) {
    console.log(`Erro para -1: ${e.message}`);
}

// Teste 5: Debounce
console.log("\n5. Debounce:");
const funcaoLenta = () => console.log("🚀 Função executada!");
const funcaoDebounced = debounce(funcaoLenta, 1000);
console.log("Chamando função debounced múltiplas vezes...");
funcaoDebounced();
funcaoDebounced();
funcaoDebounced(); // Apenas esta será executada após 1 segundo

// Teste 6: Memoization
console.log("\n6. Memoization:");
const fibonacciLento = (n) => {
    if (n <= 1) return n;
    return fibonacciLento(n - 1) + fibonacciLento(n - 2);
};
const fibonacciMemoizado = memoize(fibonacciLento);
console.log(`Fibonacci(10): ${fibonacciMemoizado(10)}`);
console.log(`Fibonacci(10) novamente: ${fibonacciMemoizado(10)}`); // Cache hit

// Teste 7: Mapeamento e Ordenação
console.log("\n7. Mapeamento e Ordenação:");
const produtos = [
    { nome: "Notebook", preco: 2500 },
    { nome: "Mouse", preco: 50 },
    { nome: "Teclado", preco: 150 },
    { nome: "Monitor", preco: 800 }
];
console.log("Produtos ordenados por preço:", ordenarProdutosPorPreco(produtos));

// Teste 8: Agrupamento por Propriedade
console.log("\n8. Agrupamento por Propriedade:");
const vendas = [
    { cliente: "João", total: 100 },
    { cliente: "Maria", total: 200 },
    { cliente: "João", total: 150 },
    { cliente: "Pedro", total: 75 },
    { cliente: "Maria", total: 300 }
];
console.log("Vendas agrupadas:", agruparVendasPorCliente(vendas));

// Teste 9: Conversão Entre Formatos
console.log("\n9. Conversão Entre Formatos:");
const pares = [["nome", "João"], ["idade", 30], ["cidade", "São Paulo"]];
const objeto = paresParaObjeto(pares);
console.log("Pares para objeto:", objeto);

const paresConvertidos = objetoParaPares(objeto);
console.log("Objeto para pares:", paresConvertidos);

console.log("\n=== FIM DOS TESTES ===");