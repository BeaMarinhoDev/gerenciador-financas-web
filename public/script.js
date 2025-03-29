const userTableBody = document.querySelector('#userTable tbody');

async function fetchUsers() {
    try {
        const response = await axios.get('/api/users');
        const users = response.data;
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td>${new Date(user.dataCadastro).toLocaleDateString()}</td>
                <td>${user.cpf}</td>
                <td class="action-buttons">
                    <button class="edit" onclick="editUser(${user.id})">Editar</button>
                    <button class="delete" onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}

function editUser(userId) {
    // Implemente a lógica para editar o usuário
    console.log(`Editar usuário com ID ${userId}`);
}

function deleteUser(userId) {
    // Implemente a lógica para excluir o usuário
    console.log(`Excluir usuário com ID ${userId}`);
}

fetchUsers();