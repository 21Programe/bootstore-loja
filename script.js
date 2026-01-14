// Variável para guardar os itens do carrinho
let carrinho = [];

async function carregarProdutos() {
    const divPendrives = document.getElementById('lista-pendrives');
    const divServicos = document.getElementById('lista-servicos');

    try {
        const req = await fetch('produtos.php');
        const produtos = await req.json();
        
        // Limpa o texto "Carregando..."
        divPendrives.innerHTML = ''; 
        divServicos.innerHTML = '';

        produtos.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // Define o texto do botão baseado na categoria
            const textoBotao = p.categoria === 'servico' ? 'Agendar' : 'Comprar';

            card.innerHTML = `
                <img src="${p.imagem}" alt="${p.nome}">
                <h3>${p.nome}</h3>
                <p>${p.descricao}</p>
                <p class="preco">R$ ${p.preco}</p>
                <button onclick="addCarrinho('${p.nome}', '${p.preco}')">
                    ${textoBotao}
                </button>
            `;

            // Separa nas listas certas
            if (p.categoria === 'servico') {
                divServicos.appendChild(card);
            } else {
                divPendrives.appendChild(card);
            }
        });
    } catch (e) {
        console.error("Erro no JS:", e);
        alert("Erro ao carregar produtos.");
    }
}

function addCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    document.getElementById('contagem-carrinho').innerText = carrinho.length;
    alert(`${nome} adicionado ao pedido!`);
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá Diego! Gostaria de encomendar:\n";
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco})\n`;
        total += parseFloat(item.preco);
    });

    mensagem += `\n*Total Estimado: R$ ${total.toFixed(2)}*`;
    
    // Substitua pelo SEU número real (ex: 5511999999999)
    let telefone = "5511999999999"; 
    
    let link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
}

// Inicia o carregamento
carregarProdutos();
