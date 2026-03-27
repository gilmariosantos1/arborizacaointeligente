document.getElementById("resetForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const erro = document.getElementById("mensagemErro");

  if (senha !== confirmarSenha) {
    erro.textContent = "As senhas não coincidem!";
    return;
  }

  if (senha.length < 6) {
    erro.textContent = "A senha deve ter pelo menos 6 caracteres.";
    return;
  }

  erro.textContent = "";

  alert("Senha redefinida com sucesso!");
  
});

function voltar() {
  window.history.back();
}