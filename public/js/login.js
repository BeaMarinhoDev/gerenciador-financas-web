async function login() {
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const loginError = document.getElementById('loginError');

    const email = emailInput.value;
    const senha = senhaInput.value;

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        if (response.ok && data && data.token) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', data.name);
            console.log("Nome recebido do backend:", data.name);
            window.location.href = '/home.html'; // Redirecionar para a página de home
        } else {
            loginError.textContent = data.message || 'Erro ao fazer login. Verifique seu e-mail e senha.';
        }

    } catch (error) {
        console.error('Erro ao enviar dados de login:', error);
        loginError.textContent = 'Erro de conexão com o servidor.';
    }
}

// Adicionar um listener para o evento de submit do formulário (opcional, mas boa prática)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            login();
        });
    }
});
function cadastrar() {
    // Remover o token do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');

    // Redirecionar o usuário para a página de login ou home
    window.location.href = '/cadastro.html'; // Ou qualquer página de sua preferência
}
function logout() {
    // Remover o token do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    
    // Redirecionar o usuário para a página de login ou home
    window.location.href = '/index.html'; // Ou qualquer página de sua preferência
}

// Chame essa função quando o usuário clicar em "Logout"
//document.getElementById('btnLogout').addEventListener('click', logout);
