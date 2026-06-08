document.addEventListener("DOMContentLoaded", function () {
  renderizarCardapio();
  inicializarHoverCards();
  inicializarVitrine();

});

async function renderizarCardapio() {
  const grid = document.querySelector("#grid-cardapio")
  if(!grid) return

  grid.innerHTML = "<p class='loading'>Carregando cardápio...</p>"

  try{
    const produto = await buscarProdutos()

    grid.innerHTML= ""

    produto.forEach(function(produto){
      const card = document.createElement("article")
      card.classList.add("card")
      card.setAttribute("data-id", produto.id)

      card.innerHTML = "<img src='src/images/" + produto.imagem +"' alt='" + produto.nome + "'>" + "<h3>" + produto.nome + "</h3>" + "<p class='desc'>" + produto.descricao + "</p>" + "<div class='quantidade-box'>" + "<button class='btn-qtd btn-menos'>-</button>" + "<span class='qtd-valor'>1</span>" + "<button class='btn-qtd btn-mais'>+</button>" + "</div>" + "<span class='preco' data-preco='" + produto.preco + "'>" + "R$ " + parseFloat(produto.preco).toFixed(2).replace(".", ",") + "</span>" + "<button class='btn-pedido'>Pedir Agora</button>";
    
      grid.appendChild(card)
    })


  }catch(erro){
    grid.innerHTML = "<p class='loading erro'>Erro ao carregar o cardápio.</p>"

  }
  
}


function inicializarSubtotal() {
  const inputQtd = document.querySelector("#qtd-lasanha");
  const precoTexto = document.querySelector("#preco-lasanha");
  const subTexto = document.querySelector("#sub-lasanha");

  if (!inputQtd || !precoTexto) return;

  inputQtd.addEventListener("input", function () {
    const precoUnitario = 45.0;
    const quantidade = Number(inputQtd.value);

    if (isNaN(quantidade) || quantidade < 1) return;

    const total = quantidade * precoUnitario;
    precoTexto.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    precoTexto.style.color = total > 150 ? "#c0392b" : "#e67e22";

    if (subTexto) {
      subTexto.textContent =
        quantidade > 1
          ? `${quantidade}x R$ ${precoUnitario.toFixed(2).replace(".", ",")}`
          : "";
    }
  });
}

function inicializarHoverCards() {
  const cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      // Espaço para lógica futura — visual tratado pelo CSS :hover
    });
    card.addEventListener("mouseleave", function () {
      // Limpeza de estado ao sair do card
    });
  });
}


function inicializarVitrine() {
  const main = document.querySelector("main");
  if (!main) return;

  main.addEventListener("click", function (event) {
    const clicado = event.target;

    if (clicado.classList.contains("btn-menos")) {
      const box = clicado.parentElement;
      const spanQtd = box.querySelector(".qtd-valor");
      spanQtd.textContent = Math.max(1, Number(spanQtd.textContent) - 1);
      atualizarPrecoCard(box);
      return;
    }

    if (clicado.classList.contains("btn-mais")) {
      const box = clicado.parentElement;
      const spanQtd = box.querySelector(".qtd-valor");
      spanQtd.textContent = Number(spanQtd.textContent) + 1;
      atualizarPrecoCard(box);
      return;
    }

    if (clicado.classList.contains("btn-pedido")) {
      event.preventDefault();

      const card = clicado.parentElement;
      const produtoId = Number(card.getAttribute("data-id"))
      const quantidade = Number(card.querySelector(".qtd-valor").textContent)
      clicado.disabled = true;
      clicado.textContent = "Enviando...";
      salvarPedido(produtoId, quantidade, clicado);

      // Aula 8: salva no localStorage e destaca o botão Meus Pedidos
      salvarPedido({ nome: nomePrato, preco: preco, qtd: quantidade });
      atualizarContadorPedidos();
    }
  });
}

function atualizarPrecoCard(box) {
  const card = box.parentElement;
  const spanPreco = card.querySelector(".preco");
  const precoUnitario = parseFloat(spanPreco.getAttribute("data-preco"));
  const quantidade = Number(box.querySelector(".qtd-valor").textContent);
  const total = precoUnitario * quantidade;

  spanPreco.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
  spanPreco.style.color = total > 150 ? "#c0392b" : "#e67e22";
}

function salvarPedido(pedido) {
  const card = botao.parentElement
  const nome = querySelector("h3").textContent
  const preco = parseFloat(card.querySelector(".preco").getAttribute("data-preco"))
  const subtotal = preco * quantidade

  const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");
  lista.push({
    produto_id: produtoId,
    quantidade,
    nome,
    preco,
    subtotal
  });

  localStorage.setItem("techfood_pedidos", JSON.stringify(lista));

  clicado.textContent = "✓ Adicionado!";
      clicado.style.backgroundColor = "#27ae60";
      clicado.disabled = true;

      atualizarContadorPedidos()

      setTimeout(function () {
        clicado.textContent = "Pedir Agora";
        clicado.style.backgroundColor = "";
        clicado.disabled = false;

        const box = card.querySelector(".quantidade-box");
        if (box) {
          const spanQtd = box.querySelector(".qtd-valor");
          if (spanQtd) spanQtd.textContent = "1";
          atualizarPrecoCard(box);
        }
      }, 1500);
}

function exibirLinkPedidos() {
  const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");
  const total = lista.reduce(function (acc, p) {
    return acc + p.qtd;
  }, 0);
  let linkEl = document.querySelector("#link-ver-pedidos");

  if (!linkEl) {
    const header = document.querySelector("#topo-loja");
    header.insertAdjacentHTML(
      "beforeend",
      "<a href='pedidos.html' id='link-ver-pedidos' class='link-pedidos'>" +
        "🛒 Ver pedidos (<span id='contador-link'>0</span>)" +
        "</a>",
    );
    linkEl = document.querySelector("#link-ver-pedidos");
  }

  const contador = document.querySelector("#contador-link");
  if (contador) contador.textContent = total;
}
