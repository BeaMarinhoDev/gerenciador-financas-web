document.addEventListener('DOMContentLoaded', () => {
    const tabelaExtrato = document.getElementById('tabelaExtrato').getElementsByTagName('tbody')[0];
    const filtroDataInput = document.getElementById('filtroData');
    const filtroTipoSelect = document.getElementById('filtroTipo');
    const filtroCategoriaSelect = document.getElementById('filtroCategoria');
    const btnFiltrar = document.getElementById('btnFiltrar');
    const btnLimparFiltros = document.getElementById('btnLimparFiltros');
    const token = localStorage.getItem('authToken');
    let transacoes = []; // Array para armazenar todas as transações

    // Função para buscar e exibir o extrato
    function buscarExtrato() {
        if (token) {
            fetch('http://localhost:3000/users/transactions', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    console.error(`Erro na requisição: ${response.status}`);
                    return response.json().then(err => {
                        throw new Error(err.mensagem || 'Erro ao buscar extrato.');
                    });
                }
                return response.json();
            })
            .then(data => {
                transacoes = data; // Armazena os dados recebidos
                exibirExtrato(transacoes); // Exibe todos os dados inicialmente
                preencherFiltroCategorias(transacoes); // Preenche o dropdown de categorias
            })
            .catch(error => {
                console.error('Erro ao buscar extrato:', error);
                tabelaExtrato.innerHTML = `<tr><td colspan="5" class="erro">${error.message}</td></tr>`;
            });
        } else {
            window.location.href = '/login.html';
        }
    }

    // Função para exibir as transações na tabela
    function exibirExtrato(listaTransacoes) {
        tabelaExtrato.innerHTML = ''; // Limpa a tabela
        if (listaTransacoes && listaTransacoes.length > 0) {
            listaTransacoes.forEach(transacao => {
                const row = tabelaExtrato.insertRow();
                const descricaoCell = row.insertCell();
                const valorCell = row.insertCell();
                const tipoCell = row.insertCell();
                const dataCell = row.insertCell();
                const categoriaCell = row.insertCell();

                descricaoCell.textContent = transacao.descricao;
                valorCell.textContent = parseFloat(transacao.valor).toFixed(2);
                tipoCell.textContent = transacao.tipo === 'credito' ? 'Crédito' : 'Débito';
                dataCell.textContent = transacao.data;
                categoriaCell.textContent = transacao.categoria_nome || 'Sem Categoria'; // Assumindo que a categoria vem com a transação
            });
        } else {
            tabelaExtrato.innerHTML = '<tr><td colspan="5">Nenhuma transação encontrada.</td></tr>';
        }
    }

    // Função para preencher o filtro de categorias
    function preencherFiltroCategorias(listaTransacoes) {
        const categoriasSet = new Set();
        listaTransacoes.forEach(transacao => {
            if (transacao.categoria_nome) {
                categoriasSet.add(transacao.categoria_nome);
            }
        });
        const categoriasArray = ['Todas', ...Array.from(categoriasSet).sort()];
        filtroCategoriaSelect.innerHTML = categoriasArray.map(categoria => `<option value="${categoria === 'Todas' ? '' : categoria}">${categoria}</option>`).join('');
    }

    // Lógica de filtragem (front-end)
    function filtrarExtrato() {
        const filtroData = filtroDataInput.value;
        const filtroTipo = filtroTipoSelect.value;
        const filtroCategoria = filtroCategoriaSelect.value;

        const transacoesFiltradas = transacoes.filter(transacao => {
            const dataTransacao = (transacao.data).toISOString().split('T')[0];
            const tipoTransacao = transacao.tipo;
            const categoriaTransacao = transacao.categoria_nome || '';

            const dataMatch = !filtroData || dataTransacao === filtroData;
            const tipoMatch = !filtroTipo || tipoTransacao === filtroTipo;
            const categoriaMatch = !filtroCategoria || categoriaTransacao === filtroCategoria;

            return dataMatch && tipoMatch && categoriaMatch;
        });

        exibirExtrato(transacoesFiltradas);
    }

    // Limpar filtros
    function limparFiltros() {
        filtroDataInput.value = '';
        filtroTipoSelect.value = '';
        filtroCategoriaSelect.value = '';
        exibirExtrato(transacoes); // Exibe todas as transações novamente
    }

    // Event listeners
    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', filtrarExtrato);
    }
    if (btnLimparFiltros) {
        btnLimparFiltros.addEventListener('click', limparFiltros);
    }

    buscarExtrato(); // Busca o extrato ao carregar a página
});