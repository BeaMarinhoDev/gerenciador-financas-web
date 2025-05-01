import apiRequest from './api.js';

async function login() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const loginError = document.getElementById('loginError');

    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
        const data = await apiRequest('auth/login', 'POST', { email, senha });

        if (data && data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', data.name);
            console.log("Nome recebido do backend:", data.name);
            window.location.href = '/home.html'; // Redirecionar para a página de home
        } else {
            loginError.textContent = 'Erro ao fazer login. Verifique seu e-mail e senha.';
        }
    } catch (error) {
        console.error('Erro ao enviar dados de login:', error);
        loginError.textContent = error.message || 'Erro de conexão com o servidor.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const btnLogin = document.getElementById('btnLogin');
    const btnCadastrar = document.getElementById('btnCadastrar');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            login();
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }

    if (btnCadastrar) {
        btnCadastrar.addEventListener('click', cadastrar);
    }
});

export function cadastrar() {
    window.location.href = '/cadastro.html';
}

export function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    window.location.href = '/index.html';
}
