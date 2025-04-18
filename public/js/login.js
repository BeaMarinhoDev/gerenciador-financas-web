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
            event.preventDefault(); // Evita o envio padrão do formulário
            login();
        });
    }
});