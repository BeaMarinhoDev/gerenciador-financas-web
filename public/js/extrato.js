fetch('/transactions', { // A nova rota sem o ID do usuário
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});