document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuarioSpan = document.getElementById('nomeUsuario');
    const listaExtratoUl = document.getElementById('listaExtrato');
    const btnExtrato = document.getElementById('btnExtrato');
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token) {
        //alert('Token de autenticação não encontrado. Você será redirecionado para a página de login.');
        window.location.href = '/index.html'; // Redireciona para a página de login
        return;
    }
    if (btnExtrato) {
        btnExtrato.addEventListener('click', () => {
            // Esta função será executada quando o botão for clicado
            window.location.href = '/extrato.html'; // Redireciona para a página extrato.html
        });
    }

    
    console.log(`User ID: ${userId}`);

    // Buscar nome do usuário (código já existente)
   if (token) {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (nomeUsuarioSpan) {
                nomeUsuarioSpan.textContent = `${data.nome}!`;
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error);
            // Lógica para lidar com erros (redirecionar para login, exibir mensagem, etc.)
        });
    } else {
        // Se não houver token, o usuário não está logado
        window.location.href = '/login.html'; // Redirecionar para a página de login
    }


    // Buscar transações recentes
    fetch(`http://localhost:3000/users/transactions/recent`, { // tirei o ${userId} pq aparentemente, era o erro no extrato.
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(transactions => {
            if (transactions && transactions.length > 0) {
                transactions.slice(0, 5).forEach(transaction => {
                    const listItem = document.createElement('li');
                    const tipoTexto = transaction.tipo === 'credit' ? 'Crédito' : 'Débito';
                    const valorFormatado = parseFloat(transaction.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    //const dataFormatada = new Date(transaction.data_vencimento).toLocaleDateString();
                    const dataFormatada = transaction.data;
                
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
        const btnLogout = document.getElementById('btnLogout');

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // Remove o token de autenticação do localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');

            // Redireciona o usuário para a página de login
            window.location.href = '/index.html';
        });
    }

});