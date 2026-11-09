let lojaProdutos = [
      { nome: "Camiseta", categoria: "Roupas", preco: 50, estoque: 10 },
      { nome: "Calça", categoria: "Roupas", preco: 120, estoque: 4 },
      { nome: "Tênis", categoria: "Calçados", preco: 250, estoque: 2 },
      { nome: "Boné", categoria: "Acessórios", preco: 40, estoque: 15 }
    ];

    function atualizarInterface() {
      const termoCat = document.getElementById('filtro-categoria').value.toLowerCase();
      const tbody = document.getElementById('tabela-produtos');
      tbody.innerHTML = '';

      // Filter por categoria
      const filtrados = lojaProdutos.filter(p => p.categoria.toLowerCase().includes(termoCat));

      // Map para exibição
      filtrados.forEach(p => {
        tbody.innerHTML += `
          <tr>
            <td>${p.nome}</td>
            <td>${p.categoria}</td>
            <td>R$ ${p.preco.toFixed(2)}</td>
            <td>${p.estoque}</td>
          </tr>`;
      });

      // Reduce: valor total do estoque
      const totalValor = lojaProdutos.reduce((acc, p) => acc + (p.preco * p.estoque), 0);
      document.getElementById('resumo-total-estoque').textContent = `R$ ${totalValor.toFixed(2)}`;

      // Filter: pouco estoque (< 5)
      const poucoEstoque = lojaProdutos.filter(p => p.estoque < 5);
      document.getElementById('resumo-pouco-estoque').textContent = poucoEstoque.map(p => `${p.nome} (${p.estoque})`).join(', ') || 'Nenhum';

      // Reduce: produto mais caro
      if (lojaProdutos.length > 0) {
        const maisCaro = lojaProdutos.reduce((max, p) => p.preco > max.preco ? p : max, lojaProdutos[0]);
        document.getElementById('resumo-mais-caro').textContent = `${maisCaro.nome} (R$ ${maisCaro.preco.toFixed(2)})`;
      }
    }

    function realizarCompra() {
      const nome = prompt("Digite o nome do produto que deseja comprar:");
      if (!nome) return;

      // Find: produto pelo nome
      const produto = lojaProdutos.find(p => p.nome.toLowerCase() === nome.toLowerCase());

      if (!produto) {
        alert("Produto não encontrado!");
        return;
      }

      const qtd = parseInt(prompt(`Quantidade desejada (Estoque atual: ${produto.estoque}):`));
      if (!isNaN(qtd) && qtd > 0 && qtd <= produto.estoque) {
        produto.estoque -= qtd;
        alert("Compra realizada com sucesso!");
        atualizarInterface();
      } else {
        alert("Quantidade inválida ou estoque insuficiente!");
      }
    }

    atualizarInterface();