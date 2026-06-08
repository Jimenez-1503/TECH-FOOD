document.addEventListener("DOMContentLoaded", function () {
  solicitarNomeCliente();
  exibirNomeCliente();
  exibirBoasVindas();
  exibirDataFooter();
  fecharMenuAoNavegar();
});

function solicitarNomeCliente() {
  if (sessionStorage.getItem("techfood_cliente")) return;

  const modal = document.querySelector("#modal-boas-vindas");
  if (modal) modal.style.display = "flex";

  const btnConfirmar = document.querySelector("#btn-confirmar-nome");
  const inputNome = document.querySelector("#input-nome-cliente");

  if (!btnConfirmar || !inputNome) return;

  btnConfirmar.addEventListener("click", function () {
    const nome = inputNome.value.trim();

    if (!nome) {
      inputNome.focus();
      return;
    }

    sessionStorage.setItem("techfood_cliente", nome);
    if (modal) modal.style.display = "none";

    exibirNomeCliente();
  });

  inputNome.addEventListener("keydown", function (e) {
    if (e.key === "Enter") btnConfirmar.click();
  });

  setTimeout(function () {
    inputNome.focus();
  }, 100);
}

function exibirNomeCliente() {
  const nome = sessionStorage.getItem("techfood_cliente");
  const elemento = document.querySelector("#boas-vindas");
  if (!elemento) return;

  const agora = new Date();
  const horaExata = agora.getHours() + agora.getMinutes() / 60;
  
  let saudacao; 

  if (horaExata >= 5 && horaExata < 12) {
    saudacao = "☀️ Bom dia";
  } else if (horaExata >= 12 && horaExata < 18) {
    saudacao = "🌤️ Boa tarde";
  } else {
    saudacao = "🌙 Boa noite";
  }

  if (nome) {
    elemento.textContent = `${saudacao}, ${nome}! O que vai pedir hoje?`;
  } else {
    elemento.textContent = `${saudacao}! Confira nosso cardápio e faça seu pedido.`;
  }
}

function exibirBoasVindas() {
  const agora = new Date();
  const hora = agora.getHours();
  const minutos = agora.getMinutes();
  const horaExata = hora + minutos / 60;

  let saudacao;
  if (horaExata >= 5 && horaExata < 12) {
    saudacao = "☀️ Bom dia! Qual o seu pedido?";
  } else if (horaExata >= 12 && horaExata < 18) {
    saudacao = "🌤️ Boa tarde! Confira nosso cardápio.";
  } else {
    saudacao = "🌙 Boa noite! Ainda dá tempo de pedir.";
  }

  const elemSaudacao = document.querySelector("#boas-vindas");
  if (elemSaudacao) elemSaudacao.textContent = saudacao;
}

function exibirDataFooter() {
  const elemFooter = document.querySelector("#data-hora-footer");
  if (!elemFooter) return;

  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  elemFooter.textContent = dataFormatada;
}

function fecharMenuAoNavegar() {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (!isMobile) return;

  const linksMenu = document.querySelectorAll("#menu a");
  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      const checkbox = document.querySelector("#bt_menu");
      if (checkbox) checkbox.checked = false;
    });
  });
}
