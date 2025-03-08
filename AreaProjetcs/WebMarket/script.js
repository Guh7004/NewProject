let carrinho = [];

function mostrarItens(categoria) {
    document.querySelectorAll('.items').forEach(cat => {
        cat.style.display = (cat.id === categoria ? 'flex' : 'none');
    });
}

function adicionarAoCarrinho(nome, preco) {
    let itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }

    atualizarCarrinho();
}

function removerDoCarrinho(nome) {
    let itemIndex = carrinho.findIndex(item => item.nome === nome);

    if (itemIndex !== -1) {
        if (carrinho[itemIndex].quantidade > 1) {
            carrinho[itemIndex].quantidade--;
        } else {
            carrinho.splice(itemIndex, 1);
        }
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let carrinhoLista = document.getElementById("carrinho");
    let totalElemento = document.getElementById("total");
    let total = 0;

    carrinhoLista.innerHTML = ""; // Limpa a lista para atualizar

    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        total += item.preco * item.quantidade; // Calcula o total

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.style.marginLeft = "10px";
        botaoRemover.onclick = () => removerDoCarrinho(item.nome);

        li.appendChild(botaoRemover);
        carrinhoLista.appendChild(li);
    });

    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`; // Atualiza o total
}
