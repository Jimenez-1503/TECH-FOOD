document.addEventListener("DOMContentLoaded", function () {
  renderizarPedidos();
  configurarLimparPedidos();
});

function renderizarPedidos() {
  const lista = document.querySelector("#lista-pedidos");
  const spanTotal = document.querySelector("#valor-total");
  const spanResumo = document.querySelector("#valor-total-resumo");
  const spanContador = document.querySelector("#contador-itens");

  if (!lista) return;

  // Padrão seguro: || "[]" evita JSON.parse(null) que lançaria erro
  const pedidos = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");

  if (pedidos.length === 0) {
    lista.innerHTML =
      "<li class='pedido-vazio'>Nenhum pedido ainda. Acesse o " +
      "<a href='index.html'>Cardápio</a> para adicionar! 😊</li>";
    // Zera os totais ao esvaziar o carrinho — sem isso os valores
    // anteriores ficam na tela porque o return impede o trecho
    // que os atualiza lá embaixo de ser executado.
    if (spanTotal) spanTotal.textContent = "R$ 0,00";
    if (spanResumo) spanResumo.textContent = "R$ 0,00";
    if (spanContador) spanContador.textContent = "0 itens";
    return;
  }

  // Limpa antes de renderizar — evita duplicatas se chamada mais de uma vez
  lista.innerHTML = "";
  let total = 0;

  pedidos.forEach(function (pedido, indice) {
    // createElement + appendChild — Aula 7, mesmo padrão, nova página.
    // Cada item tem um botão ✕ para remover individualmente —
    // o mesmo padrão do botão de remover da Aula 7, agora com
    // persistência: remove do localStorage e re-renderiza a lista.
    const li = document.createElement("li");
    li.classList.add("item-pedido");

    const textoSpan = document.createElement("span");
    textoSpan.innerHTML = "<strong>" + pedido.nome + "</strong>" + " — " + pedido.qtd + "x" + " R$ " + pedido.preco.toFixed(2).replace(".", ",") + " = <span class='subtotal-item'>R$ " + pedido.subtotal.toFixed(2).replace(".", ",") + "</span>";

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "✕";
    btnRemover.classList.add("btn-remover-item");

    // Ao clicar: remove do array pelo índice, salva e re-renderiza.
    // splice(indice, 1) remove 1 elemento na posição exata do pedido.
    btnRemover.addEventListener("click", function () {
      const lista = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]");
      lista.splice(indice, 1);
      localStorage.setItem("techfood_pedidos", JSON.stringify(lista));
      renderizarPedidos();
    });

    li.appendChild(textoSpan);
    li.appendChild(btnRemover);
    lista.appendChild(li);
    total += pedido.subtotal;
  });

  const totalFmt = "R$ " + total.toFixed(2).replace(".", ",");
  if (spanTotal) spanTotal.textContent = totalFmt;
  if (spanResumo) spanResumo.textContent = totalFmt;

  // reduce acumula as quantidades — devolve o total de itens
  const totalItens = pedidos.reduce(function (acc, p) {
    return acc + p.qtd;
  }, 0);
  if (spanContador) {
    spanContador.textContent =
      totalItens + (totalItens === 1 ? " item" : " itens");
  }
}

function configurarLimparPedidos() {
  const btn = document.querySelector("#btn-limpar-pedidos");
  if (!btn) return;

  btn.addEventListener("click", function () {
    localStorage.removeItem("techfood_pedidos");
    renderizarPedidos();
  });
}
