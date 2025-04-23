document.getElementById('form-produto').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const imagem = document.getElementById('imagem').value;
    const secao = document.getElementById('secao').value;
    const descricao = document.getElementById('descricao').value;
  
    const novoProduto = {
      id: Date.now(),
      nome,
      preco,
      imagem,
      secao,
      descricao
    };
  
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(novoProduto);
    localStorage.setItem('produtos', JSON.stringify(produtos));
  
    document.getElementById('mensagem').textContent = 'Produto adicionado com sucesso!';
    document.getElementById('form-produto').reset();
  });
  