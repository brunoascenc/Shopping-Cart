if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', loading)
} else {
    loading()
}

function loading()  {
    const removerItemButton = document.getElementsByClassName('btn-remover')
    for (let i = 0; i < removerItemButton.length; i++) {
        let button = removerItemButton[i]
        button.addEventListener('click', removerItemCarrinho)
    }

    const quantidade = document.getElementsByClassName('cart-quantity-input')
    for (let i = 0; i < quantidade.length; i++) {
        let input = quantidade[i]
        input.addEventListener('change', mudarQtd)
    }

    const addCarrinho= document.getElementsByClassName('comprar-btn')
    for (let i = 0; i < addCarrinho.length; i++) {
        let button = addCarrinho[i]
        button.addEventListener('click', adicionarClick)
    }

    document.getElementsByClassName('btn-finalizar')[0].addEventListener('click', finalizarCompra)
}

function finalizarCompra() {
    alert('Obrigado pela compra!')
    let itensCarrinho = document.getElementsByClassName('cart-items')[0]
    while (itensCarrinho.hasChildNodes()) {
        itensCarrinho.removeChild(itensCarrinho.firstChild)
    }
    atualizarTotal()
}

function removerItemCarrinho(event) {
    const removerBtn = event.target
    removerBtn.parentElement.parentElement.remove()
    atualizarTotal()
}

function mudarQtd(event) {
    const input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    atualizarTotal()
}

function adicionarClick(event) {
    const button = event.target
    const shopItem = button.parentElement.parentElement
    let titulo = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let preco = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    adicionarItem(titulo, preco, imageSrc)
    atualizarTotal()
}

function adicionarItem(titulo, preco, imageSrc) {
    let carrinhoRow = document.createElement('div')
    carrinhoRow.classList.add('cart-row')
    let carrinhoItens = document.getElementsByClassName('cart-items')[0]
    let cartItemNome = carrinhoItens.getElementsByClassName('cart-item-title')
    for (let i = 0; i < cartItemNome.length; i++) {
        if (cartItemNome[i].innerText == titulo) {
            alert('Esse item já está no carrinho')
            return
        }
    }
    let carrinhoConteudo = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${titulo}</span>
        </div>
        <span class="cart-price cart-column">${preco}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-remover btn-danger" type="button">X</button>
        </div>`
    carrinhoRow.innerHTML = carrinhoConteudo
    carrinhoItens.append(carrinhoRow)
    carrinhoRow.getElementsByClassName('btn-remover')[0].addEventListener('click', removerItemCarrinho)
    carrinhoRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', mudarQtd)
}

function atualizarTotal() {
    let carrinhoContainer = document.getElementsByClassName('cart-items')[0]
    const carrinhoRowCont = carrinhoContainer.getElementsByClassName('cart-row')
    let total = 0
    for (let i = 0; i < carrinhoRowCont.length; i++) {
        let carrinhoRow= carrinhoRowCont[i]
        let precoItem = carrinhoRow.getElementsByClassName('cart-price')[0]
        const quantidadeItem = carrinhoRow.getElementsByClassName('cart-quantity-input')[0]
        const preco = parseFloat(precoItem.innerText.replace('R$', ''))
        const quantidade = quantidadeItem.value
        total = total + (preco * quantidade)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = 'R$' + total
}