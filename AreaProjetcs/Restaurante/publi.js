 const lista = document.getElementById('lista-pratos');
    const botoes = document.querySelectorAll('.filtro-btn');

    const pratos = JSON.parse(localStorage.getItem("pratosSalvos")) || [];

    function renderizarPratos(pratosFiltrados) {
      lista.innerHTML = "";
      pratosFiltrados.forEach(prato => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${prato.nome}</h3>
          <p><strong>Ingredientes:</strong> ${prato.ingredientes}</p>
          <p><strong>Tipo:</strong> ${prato.tipo}</p>
        `;
        lista.appendChild(card);
      });
    }

    function filtrarPratos(tipo, botaoClicado) {
      // Atualiza classe active dos botões
      botoes.forEach(btn => btn.classList.remove('active'));
      botaoClicado.classList.add('active');

      if (tipo === "todos") {
        renderizarPratos(pratos);
      } else {
        const filtrados = pratos.filter(prato => prato.tipo === tipo);
        renderizarPratos(filtrados);
      }
    }

    // Renderiza todos pratos ao abrir a página
    renderizarPratos(pratos);