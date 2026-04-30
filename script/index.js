// 🔗 TROQUE ISSO DEPOIS PELO SEU BACKEND
const API = "http://localhost:3000";

// 📥 Carregar alunos
function carregar() {
  fetch(API + "/alunos")
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";

      data.forEach(aluno => {
        lista.innerHTML += `
          <li>
            ${aluno.nome} (${aluno.idade})
            <button class="delete-btn" onclick="deletar(${aluno.id})">Excluir</button>
          </li>
        `;
      });
    })
    .catch(err => console.error("Erro:", err));
}

// ➕ Adicionar aluno
function addAluno() {
  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;

  if (!nome || !idade) {
    alert("Preencha todos os campos!");
    return;
  }

  fetch(API + "/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nome, idade })
  })
  .then(() => {
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    carregar();
  });
}

// ❌ Deletar aluno
function deletar(id) {
  fetch(API + "/alunos/" + id, {
    method: "DELETE"
  }).then(() => carregar());
}

// 🔄 Iniciar
carregar();