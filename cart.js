let band = false
let band2 = false
let name;

function payPal() {
  if(band){
    alert('hola')
  }
    paypal.Buttons({
      createOrder: function (data, actions) {
        if(!band){
          alert('Por favor elija si requiere envío o no')
        }else{
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: total
              }
            }]
          });
        }
        // This function sets up the details of the transaction, including the amount and line item details.
      },
      onApprove: function (data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
          // This function shows a transaction success message to your buyer.
          localStorage.clear();
          total = 0;
          if(document.getElementById("numberCart") != null){
            document.getElementById('total').innerHTML = `
            <h5>Total:&#8353;${total}</h5>
            `;
          document.getElementById("numberCart").innerHTML = 0;
            products.forEach((product, index) => {
              document.getElementById(product.idProduct).innerHTML = `
                <a onclick="addCart(${product.idProduct})" class="btn btn-success add-cart cart1">Añadir al Carrito</a>
              `;
            });
          }
          alert('Transaction completed by ' + details.payer.name.given_name + "thanks for your purchase");
          cartInit();
          window.location.href = 'gofoodpro.html'
        });
      }
    }).render('#paypal-button-container');
  }
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
                <td><div id='description-card-page'>${product.description}</div></td>
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
        name = '';
        let quantity = '';
        data.forEach(product => {
            name += product.name + ', precio unitario: &#8353;' + product.price + ', cantidad: ' + product.quantity + '%0D%0A';
        });
        if (total != 0) {
        //     document.getElementById('whatsapp').innerHTML = `
        //   <a onclick='alertDelivery()' id='button-whatsapp' class="btn btn-primary mr-5 disabled" href="https://web.whatsapp.com/send?phone=50685860314&text=Lista de productos:%0D%0A${name} %0D%0ATotal:&#8353;${total}" target="_blank">Share via Whatsapp</a>
        // `;
        document.getElementById('whatsapp').innerHTML = `
        <button class="btn btn-success ml-5 mr-3" onclick='alertDelivery()'>Comprar via Whatsapp</button>
      `;
            if (document.getElementById('a-cart') != null) {
                document.getElementById('a-cart').innerHTML = `
          <a class="btn btn-primary" href="cart.html">Comprar</a>
          `;
            }
        }
    }
}
function alertDelivery(){
  if(!band){
    alert('Por favor elija si requiere envío o no')
  }
}
cartInitPage()
payPal()
function changeDevilery(e){
    let temp = document.getElementById('button-whatsapp')
    if(e == 'Si'){
        band = true
        total = total + 2000
        document.getElementById('total-cart').innerHTML = `
        <h5>Total:&#8353;${total}</h5>
        `;
        document.getElementById('whatsapp').innerHTML = `
          <a onclick='alertDelivery()' id='button-whatsapp' class="btn btn-success mr-3 ml-3" href="https://web.whatsapp.com/send?phone=50688906767&text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0ADelivery: ₡2000 %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
       `;
    }else{
        if(band == true){
            total = total - 2000
            document.getElementById('total-cart').innerHTML = `
            <h5>Total:&#8353;${total}</h5>
            `;
        }
        document.getElementById('whatsapp').innerHTML = `
        <a onclick='alertDelivery()' id='button-whatsapp' class="btn btn-success mr-3 ml-3" href="https://web.whatsapp.com/send?phone=50688906767&text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0ADelivery:No incluido %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
     `;
        band = true
    }
}
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