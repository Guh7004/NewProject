document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo) document.body.className = temaSalvo;
  
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinhoSalvo;
    atualizarCarrinho();
    renderizarProdutos();
  });
  
  let carrinho = [];
  let produtosFiltrados = [];
  
  function renderizarProdutos(secao = 'Todos') {
    const produtosContainer = document.getElementById('produtos-container');
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [
      {
        id: 1,
        nome: 'Camisa Branca',
        descricao: 'Camisa confortável de algodão ideal para o dia a dia.',
        preco: 'R$ 59,90',
        imagem: 'https://via.placeholder.com/200x200?text=Camisa+1',
        secao: 'Camisas'
      },
      {
        id: 2,
        nome: 'Camisa Preta',
        descricao: 'Estilo e versatilidade com tecido leve e respirável.',
        preco: 'R$ 64,90',
        imagem: 'https://via.placeholder.com/200x200?text=Camisa+2',
        secao: 'Camisas'
      },
      {
        id: 3,
        nome: 'Bermuda Jeans',
        descricao: 'Bermuda jeans resistente, perfeita para passeios e lazer.',
        preco: 'R$ 79,90',
        imagem: 'https://via.placeholder.com/200x200?text=Bermuda+1',
        secao: 'Bermudas'
      },
      {
        id: 4,
        nome: 'Bermuda Preta',
        descricao: 'Modelo básico e confortável, ideal para dias quentes.',
        preco: 'R$ 69,90',
        imagem: 'https://via.placeholder.com/200x200?text=Bermuda+2',
        secao: 'Bermudas'
      }
    ];
  
    produtosFiltrados = secao !== 'Todos' ? produtos.filter(p => p.secao === secao) : produtos;
    produtosContainer.innerHTML = '';
  
    produtosFiltrados.forEach(produto => {
      const div = document.createElement('div');
      div.className = 'bg-white dark:bg-gray-800 p-4 rounded shadow w-full text-center';
      div.innerHTML = `
        <img src="${produto.imagem}" class="produto-imagem mb-2 rounded" alt="${produto.nome}">
        <p class="font-semibold">${produto.nome}</p>
        <p class="text-sm mb-2 text-gray-600 dark:text-gray-400">${produto.descricao}</p>
        <p class="mb-2 font-medium">${produto.preco}</p>
        <button onclick='adicionarAoCarrinho(${JSON.stringify(produto)})' class='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full'>Adicionar ao carrinho</button>
        <button onclick='removerProduto(${produto.id})' class='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-full mt-2'>Remover Produto</button>
      `;
      produtosContainer.appendChild(div);
    });
  }
  
  function adicionarAoCarrinho(produto) {
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    alert(produto.nome + ' adicionado ao carrinho!');
  }
  
  function removerProduto(id) {
    produtosFiltrados = produtosFiltrados.filter(produto => produto.id !== id);
    const todos = JSON.parse(localStorage.getItem('produtos')) || [];
    const novos = todos.filter(produto => produto.id !== id);
    localStorage.setItem('produtos', JSON.stringify(novos));
    renderizarProdutos();
    alert('Produto removido!');
  }
  
  function atualizarCarrinho() {
    const lista = document.getElementById('carrinho-lista');
    const contador = document.getElementById('contador');
    lista.innerHTML = '';
    contador.textContent = carrinho.length;
  
    carrinho.forEach(produto => {
      const li = document.createElement('li');
      li.textContent = `${produto.nome} - ${produto.preco}`;
      lista.appendChild(li);
    });
  }
  
  function irParaPagamento() {
    alert("Indo para a página de pagamento!");
    window.location.href = 'pagamento.html';
  }
  
  function toggleTema() {
    const body = document.body;
    const novoTema = body.classList.contains('light') ? 'dark' : 'light';
    body.classList.remove('light', 'dark');
    body.classList.add(novoTema);
    localStorage.setItem('tema', novoTema);
  }
  
  function filtrarSecao(secao) {
    renderizarProdutos(secao);
  }
  document.addEventListener('DOMContentLoaded', () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const lista = document.getElementById('lista-produtos');
    const totalEl = document.getElementById('total');
    let total = 0;
  
    if (carrinho.length === 0) {
      lista.innerHTML = "<p class='text-red-500'>Carrinho vazio</p>";
      totalEl.textContent = "R$ 0,00";
      return;
    }
  
    carrinho.forEach(produto => {
      const li = document.createElement('li');
      li.className = "border-b py-4 flex items-center justify-between text-lg";
      li.innerHTML = `
        <div class="flex items-center gap-4">
          <span class="font-semibold">${produto.nome}</span>
          <span class="text-gray-500 text-sm">${produto.preco}</span>
        </div>
      `;
      lista.appendChild(li);
  
      const precoNumerico = parseFloat(produto.preco.replace('R$', '').replace(',', '.'));
      total += precoNumerico;
    });
  
    totalEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  });
  
  function finalizarCompra() {
    alert("Compra finalizada com sucesso!");
    localStorage.removeItem('carrinho');
    location.reload();
  }
 
    
  