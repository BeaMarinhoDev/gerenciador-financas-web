document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }

    const tabelaExtrato = document.querySelector('#tabelaExtrato tbody');
    const filtroDataInput = document.getElementById('filtroData');
    const filtroTipoSelect = document.getElementById('filtroTipo');
    const filtroCategoriaSelect = document.getElementById('filtroCategoria');
    const btnFiltrar = document.getElementById('btnFiltrar');
    const btnLimparFiltros = document.getElementById('btnLimparFiltros');

    let transacoes = [];

    async function buscarExtrato() {
        try {
            const response = await fetch('http://localhost:3000/users/transactions', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.mensagem || 'Erro ao buscar extrato.');
            }

            transacoes = await response.json();
            exibirExtrato(transacoes);
            preencherFiltroCategorias(transacoes);

        } catch (error) {
            console.error('Erro ao buscar extrato:', error);
            tabelaExtrato.innerHTML = `<tr><td colspan="5" class="erro">${error.message}</td></tr>`;
        }
    }

    function exibirExtrato(lista) {
        tabelaExtrato.innerHTML = '';
        if (lista.length === 0) {
            tabelaExtrato.innerHTML = '<tr><td colspan="5">Nenhuma transação encontrada.</td></tr>';
            return;
        }

        lista.forEach(({ descricao, valor, tipo, data, categoria_nome }) => {
            const row = tabelaExtrato.insertRow();
            row.innerHTML = `
                <td>${descricao}</td>
                <td>${parseFloat(valor).toFixed(2)}</td>
                <td>${tipo === 'credito' ? 'Crédito' : 'Débito'}</td>
                <td>${new Date(data).toLocaleDateString('pt-BR')}</td>
                <td>${categoria_nome || 'Sem Categoria'}</td>
            `;
        });
    }

    function preencherFiltroCategorias(lista) {
        const categorias = new Set(lista.map(t => t.categoria_nome).filter(Boolean));
        filtroCategoriaSelect.innerHTML = '<option value="">Todas</option>' + 
            [...categorias].sort().map(cat => `<option value="${cat}">${cat}</option>`).join('');
    }

    function filtrarExtrato() {
        const data = filtroDataInput.value;
        const tipo = filtroTipoSelect.value;
        const categoria = filtroCategoriaSelect.value;

        const filtradas = transacoes.filter(t => {
            const dataTransacao = new Date(t.data).toISOString().split('T')[0];
            return (!data || data === dataTransacao) &&
                   (!tipo || tipo === t.tipo) &&
                   (!categoria || categoria === t.categoria_nome);
        });

        exibirExtrato(filtradas);
    }

    function limparFiltros() {
        filtroDataInput.value = '';
        filtroTipoSelect.value = '';
        filtroCategoriaSelect.value = '';
        exibirExtrato(transacoes);
    }

    btnFiltrar?.addEventListener('click', filtrarExtrato);
    btnLimparFiltros?.addEventListener('click', limparFiltros);

    buscarExtrato();
});
