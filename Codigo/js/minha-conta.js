// Selecionando o formulário
const form = document.querySelector("#form-conta");

// 1. Carregar dados salvos assim que a página abrir
window.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        document.querySelector("#nome").value = user.nome || "";
        document.querySelector("#email").value = user.email || "";
    }
});

// 2. Salvar dados ao clicar no botão
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.querySelector("#nome").value;
    const email = document.querySelector("#email").value;

    // Criando o objeto de usuário
    const user = { 
        nome: nome, 
        email: email 
    };

    // Salvando no LocalStorage do navegador
    localStorage.setItem("user", JSON.stringify(user));

    alert("Dados atualizados com sucesso!");
});