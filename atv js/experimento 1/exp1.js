const produtos = [
      { nome: "Notebook", preco: 3500, estoque: 5 },
      { nome: "Mouse", preco: 150, estoque: 0 },
      { nome: "Teclado", preco: 250, estoque: 12 },
      { nome: "Monitor", preco: 1200, estoque: 3 },
      { nome: "Headset", preco: 300, estoque: 0 }
    ];

    document.getElementById('form-produto').addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const preco = parseFloat(document.getElementById('preco').value);
      const estoque = parseInt(document.getElementById('estoque').value);

      if (nome && !isNaN(preco) && !isNaN(estoque)) {
        produtos.push({ nome, preco, estoque });
        atualizarInterface();
        e.target.reset();
      }
    });

    function atualizarInterface() {
      // 1. Filter: estoque > 0
      const emEstoque = produtos.filter(p => p.estoque > 0);
      const ul = document.getElementById('lista-aprovados');
      ul.innerHTML = '';
      emEstoque.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.nome} - R$ ${p.preco.toFixed(2)} (Qtd: ${p.estoque})`;
        ul.appendChild(li);
      });

      // 2. Map: apenas nomes
      const nomes = produtos.map(p => p.nome);
      document.getElementById('resumo-nomes').textContent = nomes.join(', ');

      // 3. Reduce: valor total em estoque
      const totalValor = produtos.reduce((acc, p) => acc + (p.preco * p.estoque), 0);
      document.getElementById('resumo-total').textContent = `R$ ${totalValor.toFixed(2)}`;

      // 4. Função produto mais caro
      if (produtos.length > 0) {
        const maisCaro = produtos.reduce((max, p) => p.preco > max.preco ? p : max, produtos[0]);
        document.getElementById('resumo-mais-caro').textContent = `${maisCaro.nome} (R$ ${maisCaro.preco.toFixed(2)})`;
      }
    }

    atualizarInterface();