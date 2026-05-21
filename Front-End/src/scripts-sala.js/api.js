const BASE_URL = "http://localhost:3000"

//Buscar Produtos

async function buscarProdutos(){

    //Realizar conexão até receber a resposta
    const response = await fetch(`${BASE_URL}/produtos`)
    const dados = await response.json()

    //Armazenar os dados
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados.dados //
}

//Criar pedidos:

async function criarPedido(cliente, itens){
    const repsonse = await fetch(`${BASE_URL}/pedidos`,{
         method: "POST",
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify({cliente, itens}),
    })

    const dados = await response.json()
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
    
}

// Buscar pedidos:

async function buscarPedidos(){
    const response = await fetch(`${BASE_URL}/pedidos`)
    const dados = await response.json()

    //Armazenar os dados
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
    
}

//Deletar Pedido:

async function deletarPedido(id){
    const response = await fetch(`${BASE_URL}/pedidos/${id}`,{
        method: "DELETE",
    });

    const dados = await response.json()
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
    
}

//Atualizar Pedido:

async function atualizarStatusPedido(id, novoStatus) {
  const response = await fetch(`${BASE_URL}/pedidos/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
  });

  const dados = await response.json();
  if (!response.ok) throw new Error(dados.erro || `Erro ${response.status}`);
  
  return dados;
}