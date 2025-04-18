async function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;
    const cep = document.getElementById('cep').value;
    const numero = document.getElementById('numero').value;
    const complemento = document.getElementById('complemento').value;
    const signupError = document.getElementById('signupError');

    const payload = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf,
        cep: cep,
        numero: numero,
        complemento: complemento
    };

    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso! Você será redirecionado para a página de login.');
            window.location.href = '/'; // Redireciona para a página de login (index.html)
        } else {
            signupError.textContent = data.mensagem || 'Erro ao cadastrar usuário.';
        }

    } catch (error) {
        console.error('Erro durante o cadastro:', error);
        signupError.textContent = 'Erro inesperado durante o cadastro.';
    }
}