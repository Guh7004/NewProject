let carrinho = [];

function mostrarItens(categoria) {
    document.querySelectorAll('.items').forEach(cat => {
        if (cat.id === categoria) {
            cat.style.display = window.innerWidth < 800 ? 'inline-block' : 'flex';
        } else {
            cat.style.display = 'none';
        }
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
    let tituloCarrinho = document.getElementById("tituloCarrinho"); // Seleciona o título onde será exibida a quantidade total
    let total = 0;
    let quantidadeTotal = 0; // Variável para armazenar a soma das quantidades

    carrinhoLista.innerHTML = ""; // Limpa a lista para atualizar

    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}`;
        total += item.preco * item.quantidade; // Calcula o total
        quantidadeTotal += item.quantidade; // Soma a quantidade total

        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.style.marginLeft = "30px";

        botaoRemover.onclick = () => removerDoCarrinho(item.nome);

        li.appendChild(botaoRemover);
        carrinhoLista.appendChild(li);
    });

    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
    tituloCarrinho.textContent = `🛒 Carrinho (${quantidadeTotal} itens)`;
}

function CarOn(el) {
    var display = document.getElementById(el).style.display;
    if(display == "none")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}
