const currentPage = location.pathname
const menuItens = document.querySelectorAll("header .links a")

for (item of menuItens) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
    // o for verifica se o caminho da url é igual 
    // ao caminho da rota e adiciona a classe active ao CSS
}


const formDelete = document.querySelector("#formDelete")

formDelete.addEventListener("submit", function(e) {
    const confirmation = confirm("Deseja deletar?")

    if (!confirmation) {
        e.preventDefault()
    }

})