document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem('userName');

    if (!token || !name) {
        window.location.href = "http://localhost:8080/index.html";
        return;
    }

    document.getElementById("nomeUsuario").textContent = name;

    carregarResumoFinanceiro();
    carregarCategorias();
    carregarExtratoRecente();
    configurarBotoes();
});

function carregarResumoFinanceiro() {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:3000/users/balance", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("saldoTotal").textContent = `R$ ${data.saldo.toFixed(2)}`;
            document.getElementById("creditoTotal").textContent = `R$ ${data.total_credito.toFixed(2)}`;
            document.getElementById("debitoTotal").textContent = `R$ ${data.total_debito.toFixed(2)}`;
        })
        .catch(error => {
            console.error("Erro ao carregar resumo financeiro:", error);
        });
}

function carregarExtratoRecente() {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:3000/users/transactions", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => {
            if (!res.ok) throw new Error("Erro ao buscar transações recentes.");
            return res.json();
        })
        .then(transacoes => {
            const listaExtrato = document.getElementById("listaExtrato");
            listaExtrato.innerHTML = "";

            if (transacoes.length === 0) {
                listaExtrato.innerHTML = "<li>Nenhuma transação recente encontrada.</li>";
            } else {
                transacoes.slice(0, 5).forEach(transacao => {
                    const item = document.createElement("li");
                    const valorFormatado = parseFloat(transacao.valor).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });
                    item.textContent = `${transacao.descricao} - ${valorFormatado} - ${new Date(transacao.data).toLocaleDateString('pt-BR')}`;
                    listaExtrato.appendChild(item);
                });
            }
        })
        .catch(err => {
            console.error("Erro ao carregar extrato recente:", err);
            document.getElementById("listaExtrato").innerHTML = "<li>Erro ao carregar extrato.</li>";
        });
}

function carregarCategorias() {
    const token = localStorage.getItem("authToken");

    fetch("http://localhost:3000/users/categories", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(categorias => {
            const selects = [
                document.getElementById("creditoCategoria"),
                document.getElementById("debitoCategoria"),
                document.getElementById("modalCreditoCategoria"),
                document.getElementById("modalDebitoCategoria"),
                document.getElementById("filtroCategoria")
            ];

            selects.forEach(select => {
                if (select) {
                    select.innerHTML = '<option value="">Selecione a categoria</option>';
                    categorias.forEach(categoria => {
                        const option = document.createElement("option");
                        option.value = categoria.id;
                        option.textContent = categoria.nome;
                        select.appendChild(option);
                    });
                }
            });
        })
        .catch(error => console.error("Erro ao carregar categorias:", error));
}

function configurarBotoes() {
    document.getElementById("btnExtrato")?.addEventListener("click", () => {
        window.location.href = "extrato.html";
    });

    document.getElementById("btnAdicionarCredito")?.addEventListener("click", () => {
        document.getElementById("formAdicionarCredito").style.display = "block";
        document.getElementById("formAdicionarDebito").style.display = "none";
    });

    document.getElementById("btnAdicionarDebito")?.addEventListener("click", () => {
        document.getElementById("formAdicionarCredito").style.display = "none";
        document.getElementById("formAdicionarDebito").style.display = "block";
    });

    document.getElementById("btnCancelarCredito")?.addEventListener("click", () => {
        document.getElementById("formAdicionarCredito").style.display = "none";
    });

    document.getElementById("btnCancelarDebito")?.addEventListener("click", () => {
        document.getElementById("formAdicionarDebito").style.display = "none";
    });

    document.getElementById("btnGerenciarCategorias")?.addEventListener("click", () => {
        document.getElementById("modalGerenciarCategorias").style.display = "block";
    });

    document.getElementById("fecharModalCategorias")?.addEventListener("click", () => {
        document.getElementById("modalGerenciarCategorias").style.display = "none";
    });

    
    document.getElementById("btnLogout")?.addEventListener("click", () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        window.location.href = "http://localhost:8080/index.html";
    });

    document.getElementById("btnVerMaisExtrato")?.addEventListener("click", () => {
        window.location.href = "extrato.html";
    });
}
