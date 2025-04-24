document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = '/index.html';
        return;
    }

    const categoriasDebitoUl = document.getElementById('categoriasDebito');
    const categoriasCreditoUl = document.getElementById('categoriasCredito');
    const btnVoltarHome = document.getElementById('btnVoltarHome');
    const formAdicionarCategoria = document.getElementById('formAdicionarCategoria');
    const nomeInput = document.getElementById('nomeNovaCategoria');
    const tipoSelect = document.getElementById('tipoNovaCategoria');

    async function carregarCategorias() {
        try {
            const response = await fetch('http://localhost:3000/users/categories', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Erro ao buscar categorias.');

            const data = await response.json();
            exibirCategorias(data);
        } catch (error) {
            console.error('Erro de conexão ao buscar categorias:', error);
        }
    }

    function exibirCategorias(data) {
        categoriasDebitoUl.innerHTML = '<h3>Débito</h3>';
        categoriasCreditoUl.innerHTML = '<h3>Crédito</h3>';

        data?.debit?.forEach(({ nome }) => {
            const li = document.createElement('li');
            li.textContent = nome;
            categoriasDebitoUl.appendChild(li);
        });

        data?.credit?.forEach(({ nome }) => {
            const li = document.createElement('li');
            li.textContent = nome;
            categoriasCreditoUl.appendChild(li);
        });
    }

    async function adicionarCategoria(event) {
        event.preventDefault();
        const nome = nomeInput.value.trim();
        const tipo = tipoSelect.value;

        if (!nome) {
            alert('Por favor, digite o nome da nova categoria.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users/categories/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, tipo }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro desconhecido.');
            }

            alert('Categoria adicionada com sucesso!');
            nomeInput.value = '';
            carregarCategorias();
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
            alert('Erro ao adicionar nova categoria.');
        }
    }

    btnVoltarHome?.addEventListener('click', () => window.location.href = '/home.html');
    formAdicionarCategoria?.addEventListener('submit', adicionarCategoria);

    carregarCategorias();
});
