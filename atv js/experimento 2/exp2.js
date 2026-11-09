const alunos = [
      { nome: "Ana", idade: 20, curso: "Engenharia", notas: [8, 7.5, 9] },
      { nome: "Bruno", idade: 22, curso: "Direito", notas: [5, 6, 4.5] },
      { nome: "Carlos", idade: 19, curso: "Computação", notas: [9, 9.5, 10] },
      { nome: "Diana", idade: 21, curso: "Medicina", notas: [6, 7, 6.5] }
    ];

    document.getElementById('form-aluno').addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome').value.trim();
      const idade = parseInt(document.getElementById('idade').value);
      const curso = document.getElementById('curso').value.trim();
      const notasStr = document.getElementById('notas').value;
      const notas = notasStr.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

      if (nome && !isNaN(idade) && curso && notas.length > 0) {
        alunos.push({ nome, idade, curso, notas });
        atualizarInterface();
        e.target.reset();
      }
    });

    function calcularMedia(notas) {
      return notas.reduce((acc, n) => acc + n, 0) / notas.length;
    }

    function obterSituacao(media) {
      if (media >= 7) return "Aprovado";
      if (media >= 5) return "Recuperação";
      return "Reprovado";
    }

    function atualizarInterface() {
      const tbody = document.getElementById('tabela-alunos');
      tbody.innerHTML = '';

      const alunosProcessados = alunos.map(aluno => {
        const media = calcularMedia(aluno.notas);
        return { ...aluno, media, situacao: obterSituacao(media) };
      });

      alunosProcessados.forEach(a => {
        const classeBadge = a.situacao.toLowerCase();
        tbody.innerHTML += `
          <tr>
            <td>${a.nome}</td>
            <td>${a.curso}</td>
            <td>${a.media.toFixed(2)}</td>
            <td><span class="badge ${classeBadge}">${a.situacao}</span></td>
          </tr>`;
      });

      // Filter: aprovados
      const aprovados = alunosProcessados.filter(a => a.situacao === "Aprovado");
      document.getElementById('resumo-aprovados').textContent = aprovados.map(a => a.nome).join(', ') || 'Nenhum';

      // Reduce: maior média
      if (alunosProcessados.length > 0) {
        const destaque = alunosProcessados.reduce((max, a) => a.media > max.media ? a : max, alunosProcessados[0]);
        document.getElementById('resumo-maior-media').textContent = `${destaque.nome} (${destaque.media.toFixed(2)})`;
      }

      // Reduce: média geral
      const mediaGeral = alunosProcessados.reduce((acc, a) => acc + a.media, 0) / alunosProcessados.length;
      document.getElementById('resumo-media-geral').textContent = mediaGeral.toFixed(2);
    }

    atualizarInterface();