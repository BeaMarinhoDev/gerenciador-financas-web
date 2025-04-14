const userTableBody = document.querySelector('#userTable tbody');
const userListError = document.getElementById('userListError');

// Modais
const createUserModal = document.getElementById('createUserModal');
const editUserModal = document.getElementById('editUserModal');

// Formulário de Criação
const createUserForm = document.getElementById('createUserForm');
const createNomeInput = document.getElementById('createNome');
const createEmailInput = document.getElementById('createEmail');
const createSenhaInput = document.getElementById('createSenha');
const createCpfInput = document.getElementById('createCpf');
const createCepInput = document.getElementById('createCep');
const createNumeroInput = document.getElementById('createNumero');
const createComplementoInput = document.getElementById('createComplemento');

// Formulário de Edição
const editUserForm = document.getElementById('editUserForm');
const editUserIdInput = document.getElementById('editUserId');
const editNomeInput = document.getElementById('editNome');
const editEmailInput = document.getElementById('editEmail');
const editSenhaInput = document.getElementById('editSenha');
const editCpfInput = document.getElementById('editCpf');
const editCepInput = document.getElementById('editCep');
const editNumeroInput = document.getElementById('editNumero');
const editComplementoInput = document.getElementById('editComplemento');

let allUsers = []; // Variável para armazenar todos os usuários da listagem

async function fetchUsers() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        userListError.textContent = 'Token de autenticação não encontrado. Faça login novamente.';
        userListError.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            userListError.textContent = `Erro ao buscar usuários: ${response.status} - ${response.statusText}`;
            userListError.style.display = 'block';
            return;
        }

        allUsers = await response.json(); // Armazena todos os usuários
        userTableBody.innerHTML = '';

        allUsers.forEach(user => {
            const row = userTableBody.insertRow();
            row.insertCell().textContent = user.id;
            row.insertCell().textContent = user.nome;
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = new Date(user.data_cadastro).toLocaleDateString();
            row.insertCell().textContent = user.cpf;

            const actionsCell = row.insertCell();
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => openEditUserModal(user);
            actionsCell.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => deleteUser(user.id);
            actionsCell.appendChild(deleteButton);
        });

        // Limpa qualquer mensagem de erro anterior ao carregar os usuários com sucesso
        userListError.textContent = '';
        userListError.style.display = 'none';

    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        userListError.textContent = 'Erro de conexão com o servidor ao buscar usuários.';
        userListError.style.display = 'block';
    }
}

// Funções para o Modal de Criação
function openCreateUserModal() {
    createUserModal.style.display = 'block';
}

function closeCreateUserModal() {
    createUserModal.style.display = 'none';
    createUserForm.reset();
}

async function createUser(event) {
    event.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Token de autenticação não encontrado.');
        return;
    }

    const newUser = {
        nome: createNomeInput.value,
        email: createEmailInput.value,
        senha: createSenhaInput.value,
        cpf: createCpfInput.value,
        cep: createCepInput.value,
        numero: createNumeroInput.value,
        complemento: createComplementoInput.value,
    };

    try {
        const response = await fetch('http://localhost:3000/users', { // Rota de criação correta
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro ao criar usuário: ${response.status} - ${response.statusText}\n${errorData.message || ''}`);
            return;
        }

        closeCreateUserModal();
        fetchUsers();
        alert('Usuário criado com sucesso!');

    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        alert('Erro de conexão com o servidor ao criar usuário.');
    }
}

// Funções para o Modal de Edição
let currentUserEditing = null; // Armazena o usuário sendo editado

function openEditUserModal(user) {
    currentUserEditing = user;
    editUserIdInput.value = user.id;
    editNomeInput.value = user.nome;
    editEmailInput.value = user.email;
    editSenhaInput.value = ''; // Deixar em branco para não alterar inicialmente
    editCpfInput.value = user.cpf;
    editCepInput.value = user.cep;
    editNumeroInput.value = user.numero;
    editComplementoInput.value = user.complemento;
    editUserModal.style.display = 'block';
}

function closeEditUserModal() {
    editUserModal.style.display = 'none';
    currentUserEditing = null;
    editUserForm.reset();
}

async function saveEditedUser(event) {
    event.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Token de autenticação não encontrado.');
        return;
    }

    const updatedUser = {
        nome: editNomeInput.value,
        email: editEmailInput.value,
        cpf: editCpfInput.value,
        cep: editCepInput.value,
        numero: editNumeroInput.value,
        complemento: editComplementoInput.value,
    };

    // Lógica para manter a senha antiga se o campo estiver em branco
    if (editSenhaInput.value) {
        updatedUser.senha = editSenhaInput.value;
    } else if (currentUserEditing && currentUserEditing.senha) {
        updatedUser.senha = currentUserEditing.senha;
    }

    const userId = editUserIdInput.value;
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, { // Rota de edição correta
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(`Erro ao salvar usuário: ${response.status} - ${response.statusText}\n${errorData.message || ''}`);
            return;
        }

        closeEditUserModal();
        fetchUsers();
        alert('Usuário atualizado com sucesso!');

    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        alert('Erro de conexão com o servidor ao salvar usuário.');
    }
}

async function deleteUser(id) {
    if (confirm(`Tem certeza que deseja excluir o usuário com ID ${id}?`)) {
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Token de autenticação não encontrado.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Erro ao excluir usuário: ${response.status} - ${response.statusText}\n${errorData.message || ''}`);
                return;
            }

            fetchUsers();
            alert(`Usuário com ID ${id} excluído com sucesso!`);

        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro de conexão com o servidor ao excluir usuário.');
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', fetchUsers);
createUserForm.addEventListener('submit', createUser);
editUserForm.addEventListener('submit', saveEditedUser);

// Fechar modais ao clicar fora
window.onclick = function(event) {
    if (event.target == createUserModal) {
        closeCreateUserModal();
    }
    if (event.target == editUserModal) {
        closeEditUserModal();
    }
}