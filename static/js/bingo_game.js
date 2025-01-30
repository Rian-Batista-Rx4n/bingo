const numerosSorteados = [];

// Seleciona os elementos da cartela
let b_1 = document.getElementById('letra_B_linha_1');
let i_1 = document.getElementById('letra_I_linha_1');
let n_1 = document.getElementById('letra_N_linha_1');
let g_1 = document.getElementById('letra_G_linha_1');
let o_1 = document.getElementById('letra_O_linha_1');
let b_2 = document.getElementById('letra_B_linha_2');
let i_2 = document.getElementById('letra_I_linha_2');
let n_2 = document.getElementById('letra_N_linha_2');
let g_2 = document.getElementById('letra_G_linha_2');
let o_2 = document.getElementById('letra_O_linha_2');
let b_3 = document.getElementById('letra_B_linha_3');
let i_3 = document.getElementById('letra_I_linha_3');
let n_3 = document.getElementById('letra_N_linha_3');
let g_3 = document.getElementById('letra_G_linha_3');
let o_3 = document.getElementById('letra_O_linha_3');
let b_4 = document.getElementById('letra_B_linha_4');
let i_4 = document.getElementById('letra_I_linha_4');
let n_4 = document.getElementById('letra_N_linha_4');
let g_4 = document.getElementById('letra_G_linha_4');
let o_4 = document.getElementById('letra_O_linha_4');
let b_5 = document.getElementById('letra_B_linha_5');
let i_5 = document.getElementById('letra_I_linha_5');
let n_5 = document.getElementById('letra_N_linha_5');
let g_5 = document.getElementById('letra_G_linha_5');
let o_5 = document.getElementById('letra_O_linha_5');

// Adiciona os eventos de clique
b_1.addEventListener('click', () => verificarSorteio(b_1));
i_1.addEventListener('click', () => verificarSorteio(i_1));
n_1.addEventListener('click', () => verificarSorteio(n_1));
g_1.addEventListener('click', () => verificarSorteio(g_1));
o_1.addEventListener('click', () => verificarSorteio(o_1));
b_2.addEventListener('click', () => verificarSorteio(b_2));
i_2.addEventListener('click', () => verificarSorteio(i_2));
n_2.addEventListener('click', () => verificarSorteio(n_2));
g_2.addEventListener('click', () => verificarSorteio(g_2));
o_2.addEventListener('click', () => verificarSorteio(o_2));
b_3.addEventListener('click', () => verificarSorteio(b_3));
i_3.addEventListener('click', () => verificarSorteio(i_3));
n_3.addEventListener('click', () => verificarSorteio(n_3));
g_3.addEventListener('click', () => verificarSorteio(g_3));
o_3.addEventListener('click', () => verificarSorteio(o_3));
b_4.addEventListener('click', () => verificarSorteio(b_4));
i_4.addEventListener('click', () => verificarSorteio(i_4));
n_4.addEventListener('click', () => verificarSorteio(n_4));
g_4.addEventListener('click', () => verificarSorteio(g_4));
o_4.addEventListener('click', () => verificarSorteio(o_4));
b_5.addEventListener('click', () => verificarSorteio(b_5));
i_5.addEventListener('click', () => verificarSorteio(i_5));
n_5.addEventListener('click', () => verificarSorteio(n_5));
g_5.addEventListener('click', () => verificarSorteio(g_5));
o_5.addEventListener('click', () => verificarSorteio(o_5));

// Função que verifica se o número foi sorteado
function verificarSorteio(elemento) {
    const numeroAtual = parseInt(document.getElementById('numero_atual').textContent, 10);
    if (numerosSorteados.includes(numeroAtual) && parseInt(elemento.textContent, 10) === numeroAtual) {
        elemento.style.color = 'red'; // Altera a cor do elemento para vermelho
    }
}

// Função para atualizar o número sorteado
function atualizarNumero() {
    fetch('/numero_aleatorio')  // Faz uma requisição para obter um novo número
        .then(response => response.json())
        .then(data => {
            const numeroDiv = document.getElementById('numero_atual');

            if (data.numero !== null) {
                numeroDiv.textContent = data.numero;  // Atualiza o texto com o novo número

                // Adiciona o número atual ao array de números sorteados
                numerosSorteados.push(data.numero);
            } else {
                console.log("No Numbers!");
            }
        })
        .catch(error => console.error('Erro:', error));
}

// Chama a função a cada 10 segundos
setInterval(atualizarNumero, 10000);
atualizarNumero(); // Chama a função imediatamente para não esperar 10 segundos na primeira vez
