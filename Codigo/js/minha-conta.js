const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.querySelector("input[name='nome']").value;
  const email = document.querySelector("input[name='email']").value;

  const user = { nome, email };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Dados salvos com sucesso!");
});

// carregar dados salvos
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  document.querySelector("input[name='nome']").value = user.nome;
  document.querySelector("input[name='email']").value = user.email;
}