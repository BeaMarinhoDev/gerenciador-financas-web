document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuarioSpan = document.getElementById('nomeUsuario');
    const listaExtratoUl = document.getElementById('listaExtrato');
    const btnExtrato = document.getElementById('btnExtrato');
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');;

    const btnAdicionarCredito = document.getElementById('btnAdicionarCredito');
    const btnAdicionarDebito = document.getElementById('btnAdicionarDebito');
    const modalAdicionarCredito = document.getElementById('modalAdicionarCredito');
    const modalAdicionarDebito = document.getElementById('modalAdicionarDebito');
    const fecharModalCredito = document.getElementById('fecharModalCredito');
    const fecharModalDebito = document.getElementById('fecharModalDebito');
    const formCreditoModal = document.getElementById('formCreditoModal');
    const formDebitoModal = document.getElementById('formDebitoModal');

    if (!token) {
        alert('Token de autenticação não encontrado. Você será redirecionado para a página de login.');
        window.location.href = '/index.html'; // Redireciona para a página de login
        return;
    }
    if (btnExtrato) {
        btnExtrato.addEventListener('click', () => {
            window.location.href = '/extrato.html'; // Redireciona para a página extrato.html
        });
    }

    if (btnAdicionarCredito) {
        btnAdicionarCredito.addEventListener('click', () => {
            modalAdicionarCredito.style.display = 'block';
            modalAdicionarDebito.style.display = 'none';
        });
    }

    if (btnAdicionarDebito) {
        btnAdicionarDebito.addEventListener('click', () => {
            modalAdicionarDebito.style.display = 'block';
            modalAdicionarCredito.style.display = 'none';
        });
    }

    if (fecharModalCredito) {
        fecharModalCredito.addEventListener('click', () => {
            modalAdicionarCredito.style.display = 'none';
        });
    }

    if (fecharModalDebito) {
        fecharModalDebito.addEventListener('click', () => {
            modalAdicionarDebito.style.display = 'none';
        });
    }

    if (modalAdicionarCredito) {
        window.addEventListener('click', (event) => {
            if (event.target == modalAdicionarCredito) {
                modalAdicionarCredito.style.display = 'none';
            }
        });
    }

    if (modalAdicionarDebito) {
        window.addEventListener('click', (event) => {
            if (event.target == modalAdicionarDebito) {
                modalAdicionarDebito.style.display = 'none';
            }
        });
    }

    if (formCreditoModal) {
        
        formCreditoModal.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const valor = document.getElementById('modalCreditoValor').value;
            const descricao = document.getElementById('modalCreditoDescricao').value;
            const data_vencimento = document.getElementById('modalCreditoData').value;
            const category_id = document.getElementById('modalCreditoCategoria').value;
            const userId = localStorage.getItem('userId');
            //const token = localStorage.getItem('authToken');
    
            try {
                console.log('token :', token);
                const response = await fetch('http://localhost:3000/users/transactions/credit', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        valor: parseFloat(valor), // Certifique-se de enviar como número
                        descricao: descricao,
                        data_vencimento: data_vencimento,
                        category_id: category_id || null, // Envie null se não selecionado
                        user_id: userId,
                    }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Erro ao adicionar crédito: ${response.status} - <span class="math-inline">\{response\.statusText\}\\n</span>{errorData.message || 'Detalhes do erro não fornecidos.'}`);
                    return;
                }
    
                const responseData = await response.json();
                alert('Crédito adicionado com sucesso!');
                modalAdicionarCredito.style.display = 'none';
                formCreditoModal.reset(); // Limpa o formulário
                // Recarregar dados (saldo e extrato)
                window.location.reload(); // Por enquanto, uma recarga simples
                // No futuro, podemos otimizar para atualizar apenas os dados necessários
            } catch (error) {
                console.error('Erro ao enviar dados de crédito:', error);
                alert('Erro de conexão com o servidor ao adicionar crédito.');
            }
        });
    
    }

    if (formDebitoModal) {
        formDebitoModal.addEventListener('submit', async (event) => {
            event.preventDefault();
    
            const valor = document.getElementById('modalDebitoValor').value;
            const descricao = document.getElementById('modalDebitoDescricao').value;
            const data_vencimento = document.getElementById('modalDebitoData').value;
            const category_id = document.getElementById('modalDebitoCategoria').value;
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('authToken');
    
            try {
                console.log('token (débito):', token);
                const response = await fetch('http://localhost:3000/users/transactions/debit', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        valor: parseFloat(valor) * -1, // Envia o valor como negativo para débito
                        descricao: descricao,
                        data_vencimento: data_vencimento,
                        category_id: category_id || null,
                        user_id: userId,
                    }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`Erro ao adicionar débito: ${response.status} - ${response.statusText}\n${errorData.message || 'Detalhes do erro não fornecidos.'}`);
                    return;
                }
    
                const responseData = await response.json();
                alert('Débito adicionado com sucesso!');
                modalAdicionarDebito.style.display = 'none';
                formDebitoModal.reset(); // Limpa o formulário
                window.location.reload(); // Recarrega a página
                // No futuro, otimizar para atualizar apenas os dados necessários
            } catch (error) {
                console.error('Erro ao enviar dados de débito:', error);
                alert('Erro de conexão com o servidor ao adicionar débito.');
            }
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
            // Lógica para lidar com erros
        });
    } else {
        window.location.href = '/login.html'; // Redirecionar para a página de login
    }

    // Buscar transações recentes
    fetch(`http://localhost:3000/users/transactions/recent`, {
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
            localStorage.removeItem('authToken');
            window.location.href = '/login.html';
        });
    }
});