document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuarioSpan = document.getElementById('nomeUsuario');
    const listaExtratoUl = document.getElementById('listaExtrato');

    // Buscar nome do usuário (código já existente)
    fetch('/api/user')
        .then(/* ... */)
        .then(/* ... */)
        .catch(/* ... */);

    // Buscar transações recentes
    fetch('http://localhost:3000/users/7/transactions/recent')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(transactions => {
            if (transactions && transactions.length > 0) {
                transactions.forEach(transaction => {
                    const listItem = document.createElement('li');
                    const tipoTexto = transaction.tipo === 'credit' ? 'Crédito' : 'Débito';
                    const valorFormatado = parseFloat(transaction.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    const dataFormatada = new Date(transaction.data).toLocaleDateString();
                    listItem.textContent = `${dataFormatada} - ${tipoTexto}: ${valorFormatado} (${transaction.descricao})`;
                    listaExtratoUl.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = 'Nenhuma transação recente encontrada.';
                listaExtratoUl.appendChild(listItem);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar transações recentes:', error);
            const listItem = document.createElement('li');
            listItem.textContent = 'Erro ao carregar o extrato.';
            listaExtratoUl.appendChild(listItem);
        });
});