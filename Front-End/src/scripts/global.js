document.addEventListener("DOMContentLoaded", function () {
  solicitarNomeCliente(); // NEW — exibe popup se ainda não tem nome na sessão
  exibirNomeCliente(); // NEW — atualiza saudação com o nome confirmado
  exibirBoasVindas();
  exibirDataFooter();
  fecharMenuAoNavegar();
});


function solicitarNomeCliente() {
  // Se já tem nome na sessão, não exibe o popup de novo
  if (sessionStorage.getItem("techfood_cliente")) return;

  var modal = document.getElementById("modal-boas-vindas");
  if (modal) modal.style.display = "flex";

  var btnConfirmar = document.getElementById("btn-confirmar-nome");
  var inputNome = document.getElementById("input-nome-cliente");

  if (!btnConfirmar || !inputNome) return;

  btnConfirmar.addEventListener("click", function () {
    var nome = inputNome.value.trim();
    // Se o campo estiver vazio após o trim, foca e aborta
    if (!nome) {
      inputNome.focus();
      return;
    }

    // setItem salva o nome na sessão atual
    sessionStorage.setItem("techfood_cliente", nome);
    modal.style.display = "none";

    // Atualiza a saudação imediatamente após confirmar
    exibirNomeCliente();
  });

  // Permite confirmar com Enter além do botão
  inputNome.addEventListener("keydown", function (e) {
    if (e.key === "Enter") btnConfirmar.click();
  });

  // Foca no input automaticamente ao abrir o modal
  setTimeout(function () {
    inputNome.focus();
  }, 100);
}


function exibirNomeCliente() {
  var nome = sessionStorage.getItem("techfood_cliente");
  var elemento = document.querySelector("#boas-vindas");
  if (!elemento) return;

  var agora = new Date();
  var hora = agora.getHours() + agora.getMinutes() / 60;
  var saudacao =
    hora < 12 ? "☀️ Bom dia" : hora < 18 ? "🌤️ Boa tarde" : "🌙 Boa noite";

  if (nome) {
    // Personaliza com o nome do cliente
    elemento.textContent = saudacao + ", " + nome + "! O que vai pedir hoje?";
  } else {
    elemento.textContent = saudacao + "! Qual o seu pedido?";
  }
}

function exibirBoasVindas() {
  // Se já tem nome, exibirNomeCliente() já cuidou da saudação
  if (sessionStorage.getItem("techfood_cliente")) return;

  var agora = new Date();
  var hora = agora.getHours();
  var minutos = agora.getMinutes();
  var horaExata = hora + minutos / 60;

  var saudacao;
  if (horaExata >= 5 && horaExata < 12) {
    saudacao = "☀️ Bom dia! Qual o seu pedido?";
  } else if (horaExata >= 12 && horaExata < 18) {
    saudacao = "🌤️ Boa tarde! Confira nosso cardápio.";
  } else {
    saudacao = "🌙 Boa noite! Ainda dá tempo de pedir.";
  }

  var elemSaudacao = document.querySelector("#boas-vindas");
  if (elemSaudacao) elemSaudacao.textContent = saudacao;
}


function exibirDataFooter() {
  var elemFooter = document.querySelector("#data-hora-footer");
  if (!elemFooter) return;

  var agora = new Date();
  var dataFormatada = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  elemFooter.textContent = dataFormatada;
}

function fecharMenuAoNavegar() {
  var isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (!isMobile) return;

  var linksMenu = document.querySelectorAll("#menu a");
  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      var checkbox = document.querySelector("#bt_menu");
      if (checkbox) checkbox.checked = false;
    });
  });
}
