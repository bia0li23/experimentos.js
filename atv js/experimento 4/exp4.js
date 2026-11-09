const conta = {
      titular: "Mariana Silva",
      saldo: 1000,
      movimentacoes: [
        { tipo: "deposito", valor: 500 },
        { tipo: "saque", valor: 200 },
        { tipo: "deposito", valor: 700 }
      ]
    };

    function operar(tipo) {
      const input = document.getElementById('valor-operacao');
      const valor = parseFloat(input.value);

      if (isNaN(valor) || valor <= 0) {
        alert("Insira um valor válido.");
        return;
      }

      if (tipo === 'saque' && valor > conta.saldo) {
        alert("Saldo insuficiente!");
        return;
      }

      if (tipo === 'deposito') {
        conta.saldo += valor;
      } else {
        conta.saldo -= valor;
      }

      conta.movimentacoes.push({ tipo, valor });
      input.value = '';
      atualizarInterface();
    }

    function atualizarInterface() {
      document.getElementById('titular-nome').textContent = `Titular: ${conta.titular}`;
      document.getElementById('saldo-valor').textContent = `R$ ${conta.saldo.toFixed(2)}`;

      const ul = document.getElementById('lista-extrato');
      ul.innerHTML = '';

      // Loop e render do extrato
      conta.movimentacoes.forEach(m => {
        const li = document.createElement('li');
        li.className = m.tipo;
        li.innerHTML = `
          <span>${m.tipo.toUpperCase()}</span>
          <strong>R$ ${m.valor.toFixed(2)}</strong>`;
        ul.appendChild(li);
      });

      // Filter + Reduce: Totais
      const totalDepositos = conta.movimentacoes
        .filter(m => m.tipo === 'deposito')
        .reduce((acc, m) => acc + m.valor, 0);

      const totalSaques = conta.movimentacoes
        .filter(m => m.tipo === 'saque')
        .reduce((acc, m) => acc + m.valor, 0);

      document.getElementById('resumo-depositos').textContent = `R$ ${totalDepositos.toFixed(2)}`;
      document.getElementById('resumo-saques').textContent = `R$ ${totalSaques.toFixed(2)}`;

      // Reduce: Maior movimentação
      if (conta.movimentacoes.length > 0) {
        const maior = conta.movimentacoes.reduce((max, m) => m.valor > max.valor ? m : max, conta.movimentacoes[0]);
        document.getElementById('resumo-maior-mov').textContent = `${maior.tipo.toUpperCase()} (R$ ${maior.valor.toFixed(2)})`;
      }
    }

    atualizarInterface();