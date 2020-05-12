function cartInitPage() {
    total = 0;
    numberCart = 0;
    let cart = document.getElementById('carts');
    let temp = products;
    let data = JSON.parse(localStorage.getItem('cart'));
    let td = document.getElementById('td-products')
    if (data) {
        data.forEach(item => {
            numberCart += item.quantity;
        });
    }
    cart.innerHTML = '';
    td.innerHTML = '';
    if (data) {
        data.forEach(dato => {
            let suma = parseFloat(dato.price) * dato.quantity;
            total += parseFloat(suma);
        });
        for (const product of data) {
            td.innerHTML += `
            <tr>
                <th ><img class='img-td' src=${product.image}></th>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>
                <div class="d-flex">
                <span class='lessProduct' onclick = "lessItems(${product.idProduct})">-</span>
                  <p><b>${product.quantity}</b></p>
                <span class='moreProduct' onclick="moreProduct(${product.idProduct})"><i class="fas fa-plus"></i></span>
                </div>
                </td>
                <td><span class='delete-table' onclick="deleteProduct(${product.idProduct})"><i class="fas fa-trash-alt"></i></span></td>
            </tr>
            `
        //     cart.innerHTML += `
        //   <div class='d-flex cart-page'>
        //   <span class='delete-product' onclick="deleteProduct(${product.idProduct})"><i class="fas fa-trash-alt"></i></span>
        //     <h5>${product.name}</h5>
        //     <p class='mr-3 ml-3'>${product.description}</p>
        //     <p class='mr-3'><b>&#8353;${product.price}</b></p>
        //       <div class="d-flex">
        //       <span class='lessProduct' onclick = "lessItems(${product.idProduct})">-</span>
        //         <p><b>${product.quantity}</b></p>
        //       <span class='moreProduct' onclick="moreProduct(${product.idProduct})"><i class="fas fa-plus"></i></span>
        //       </div>
        //     </div>
        //   `
        }
        document.getElementById('total-cart').innerHTML = `
        <h5>Total:&#8353;${total}</h5>
      `;
        let name = '';
        let quantity = '';
        data.forEach(product => {
            name += product.name + ', precio unitario: &#8353;' + product.price + ', cantidad: ' + product.quantity + '%0D%0A';
        });
        if (total != 0) {
            document.getElementById('whatsapp').innerHTML = `
        <a class="btn btn-primary mr-5" href="https://web.whatsapp.com/send?phone=50685860314&text=Lista de productos:%0D%0A${name} %0D%0ATotal:&#8353;${total}" target="_blank">Share via Whatsapp</a>
        `;
            if (document.getElementById('a-cart') != null) {
                document.getElementById('a-cart').innerHTML = `
          <a class="btn btn-primary" href="cart.html">Comprar</a>
          `;
            }
        }
    }
}
cartInitPage()

function moreProduct(id) {
    let data = JSON.parse(localStorage.getItem('cart'))
    data.forEach(product => {
        if (product.idProduct == id) {
            product.quantity = product.quantity + 1;
        }
    });
    localStorage.setItem('cart', JSON.stringify(data));
    cartInitPage()
}

function lessItems(id) {
    let data = JSON.parse(localStorage.getItem('cart'));
    data.forEach(product => {
        if (product.idProduct == id && product.quantity > 1) {
            product.quantity = product.quantity - 1;
        }
    });
    localStorage.setItem('cart', JSON.stringify(data));
    cartInitPage();
}

function deleteProduct(id) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach((product, index) => {
        if (id == product.idProduct) {
            cart.splice(index, 1);
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    cartInitPage()
}