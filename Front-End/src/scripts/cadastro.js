const form = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", cadastrarProduto);

async function cadastrarProduto(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const preco = document.getElementById("preco").value;
    const categoria = document.getElementById("categoria").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!nome || !descricao || !preco || !categoria || !imagem) {
        mensagem.textContent = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;
    }

    if (Number(preco) <= 0) {
        mensagem.textContent = "O preço deve ser maior que zero!";
        mensagem.style.color = "red";
        return;
    }

    const produto = {
        nome,
        descricao,
        preco: Number(preco),
        categoria,
        imagem
    };

    try {
        const resposta = await fetch(
            "http://localhost:3000/produtos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(produto)
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar");
        }

        mensagem.textContent = "Produto cadastrado com sucesso!";
        mensagem.style.color = "green";

        form.reset();

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);

    } catch (erro) {
        mensagem.textContent = "Erro ao cadastrar produto.";
        mensagem.style.color = "red";
        console.error(erro);
    }
}