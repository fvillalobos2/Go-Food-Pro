let band = false
let band2 = false
let band3 = false
let name;
let bandShow = true
let totalDolars = 0
if(localStorage.getItem('delivery')){
  localStorage.removeItem('delivery')
}
let totalSendTax = 0
function payPal() {
  let dataCart = JSON.parse(localStorage.getItem('cart'));
  if(band){
    totalSendTax = localStorage.getItem('delivery')
  }else{
    totalSendTax = 0
  }
  let result = []
  for(var i in dataCart){
    let dataSend = {}
    dataSend.name = dataCart[i].name
    dataSend.quantity = dataCart[i].quantity
    dataSend.unit_amount = {currency_code:'USD',value:parseFloat(dataCart[i].price / 582).toFixed(2)}
    dataSend.tax = {currency_code: "USD",value:0}
    result.push(dataSend)
  }
  
  let totalItems = parseFloat(total / 582).toFixed(2) - parseFloat(totalSendTax / 582).toFixed(2)
  paypal.Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [{
          "description": "Compra en go-food-pro",
          "amount": {
            "currency_code": "USD",
            "value": totalDolars,
            "breakdown": {
              "item_total": { "currency_code":"USD", "value":totalItems.toFixed(2)},
              "shipping": { "currency_code":"USD", "value":parseFloat(totalSendTax / 605).toFixed(2)},
              "tax_total": { "currency_code":"USD", "value":0},
              "discount": { "currency_code":"USD", "value":"0"}
            }
          },
          "items": result
        }]
      });
      // This function sets up the details of the transaction, including the amount and line item details.
    },
    onApprove: function (data, actions) {
      // This function captures the funds from the transaction.
      return actions.order.capture().then(function (details) {
        onCheckoutCart()
        // This function shows a transaction success message to your buyer.
        localStorage.clear();
        total = 0;
        if (document.getElementById("numberCart") != null) {
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
        alert('Gracias por su compra ' + details.payer.name.given_name );
        cartInitPage();
        window.location.href = 'index.html'
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
  let tempSuma = 0
  if (data) {
    data.forEach((dato, index) => {
      let suma = parseFloat(dato.price) * dato.quantity;
      tempSuma += parseFloat(dato.price) * dato.quantity;
      total += parseFloat(suma)
      totalDolars = parseFloat(total / 582).toFixed(2)
    });
    if (band) {
      tempSuma += 2000
      totalSendTax = 2000
      total = tempSuma
      totalDolars = parseFloat(total / 582).toFixed(2)
    }
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
                <span class='moreProduct' onclick="moreProduct(${product.idProduct})">+</span>
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
      //   <a onclick='alertDelivery()' id='button-whatsapp' class="btn btn-primary mr-5 disabled" href="https://wa.me/50685860314?text=Lista de productos:%0D%0A${name} %0D%0ATotal:&#8353;${total}" target="_blank">Share via Whatsapp</a>
      // `;
      if (document.getElementById('a-cart') != null) {
        document.getElementById('a-cart').innerHTML = `
          <a class="btn btn-primary" href="carrito">Comprar</a>
          `;
      }
    }
  }
  if (band3) {
    document.getElementById('button-comprar').innerHTML = ''
    document.getElementById('whatsapp').innerHTML = ``;
    if (!band2) {
      document.getElementById('whatsapp').innerHTML = `
        <a id='button-whatsapp' class="btn btn-success mr-3 ml-3" onclick="onCheckoutCart()"  href="https://wa.me/50688273627?text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0AEnvío: ₡2000 %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
     `;
    } else {
      document.getElementById('whatsapp').innerHTML = `
        <a id='button-whatsapp' class="btn btn-success mr-3 ml-3" onclick="onCheckoutCart()" href="https://wa.me/50688273627?text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0AEnvío:No incluido %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
     `;
    }
  }
}

function alertDelivery() {
  if (!band && !band2) {
    alert('Por favor elija si requiere envío o no')
  } else {
    payPal()
    cartInitPage()
    document.getElementById('button-comprar').innerHTML = ''
    document.getElementById('whatsapp').innerHTML = ``;
    if (!band2) {
      document.getElementById('whatsapp').innerHTML = `
      <a id='button-whatsapp' class="btn btn-success mr-3 ml-3" onclick="onCheckoutCart()"  href="https://wa.me/50688273627?text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0AEnvío: ₡2000 %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
   `;
    } else {
      let url = ``
      document.getElementById('whatsapp').innerHTML = `
      <a id='button-whatsapp' class="btn btn-success mr-3 ml-3" onclick="onCheckoutCart()" href="https://wa.me/50688273627?text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0AEnvío:No incluido %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
   `;
    }

    band3 = true
  }
}
cartInitPage()

function changeDevilery(e) {
  let temp = document.getElementById('button-whatsapp')
  if(e === "GAM"){
    if (band3) {
      document.getElementById('whatsapp').innerHTML = ``
      document.getElementById('whatsapp').innerHTML = `
          <a id='button-whatsapp' class="btn btn-success mr-3 ml-3" onclick="onCheckoutCart()"  href="https://wa.me/50688273627?text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0AEnvío: ₡2000 %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
       `;
    }
    if(localStorage.getItem('delivery')){
      total -= localStorage.getItem('delivery')
    }
    band = true
    band2 = false
    total += 2000
    localStorage.setItem('delivery', 2000)
    document.getElementById('total-cart').innerHTML = `
        <h5>Total:&#8353;${total}</h5>
        `;
  }
 if(e === "NOGAM"){
  if (band3) {
    document.getElementById('whatsapp').innerHTML = ``
    document.getElementById('whatsapp').innerHTML = `
        <a id='button-whatsapp' class="btn btn-success mr-3 ml-3" onclick="onCheckoutCart()"  href="https://wa.me/50688906767?text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0AEnvío: ₡2000 %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
     `;
  }
  if(localStorage.getItem('delivery')){
    total -= localStorage.getItem('delivery')
  }
  band = true
  band2 = false
  total +=  2500
  localStorage.setItem('delivery', 2500)
  document.getElementById('total-cart').innerHTML = `
      <h5>Total:&#8353;${total}</h5>
      `;
 }
 if(e === "no") {
    if (band == true) {
      total -= localStorage.getItem('delivery')
      localStorage.removeItem('delivery')
      //localStorage.setItem('delivery', 2000)
      document.getElementById('total-cart').innerHTML = `
            <h5>Total:&#8353;${total}</h5>
            `;
    }
    if (band3) {
      document.getElementById('whatsapp').innerHTML = ``
      document.getElementById('whatsapp').innerHTML = `
        <a id='button-whatsapp' class="btn btn-success mr-3 ml-3" onclick="onCheckoutCart()" href="https://wa.me/50688273627?text=Hola me gustaría ordenar el siguiente carrito:%0D%0A${name} %0D%0ADelivery:No incluido %0D%0ATotal:&#8353;${total}" target="_blank">Comprar vía Whatsapp</a>
     `;
    }
    band2 = true
    band = false
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
function bankFunction(){
  let element = document.querySelectorAll('#banco')
  if(bandShow){
    element[0].innerHTML = `CUENTA COLONES
    GO FOOD PRO GROUP SOCIEDAD ANO 
    Número de cuenta BAC: 944595131 
    Número de cuenta IBAN: CR86010200009445951318
    SINPE MOVIL: 8827 3627
    Cédula jurídica 3-101-796857`
    element[1].innerHTML = `CUENTA COLONES
    GO FOOD PRO GROUP SOCIEDAD ANO 
    Número de cuenta BAC: 944595131 
    Número de cuenta IBAN: CR86010200009445951318
    SINPE MOVIL: 8827 3627
    Cédula jurídica 3-101-796857`
    bandShow = false
  }else{
    element[0].innerHTML = ''
    element[1].innerHTML = ''
    bandShow = true
  }
 
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
function onCheckoutCart(url) {
  let data = JSON.parse(localStorage.getItem('cart'))
  let products = []
  let total = 0
  data.map(item => {
    let product = {
      name : item.name,
      id : item.idProduct,
      price : item.price,
      brand : "Go Food Pro",
      category : item.idCategory,
      variant : "Variant",
      quantity : item.quantity
    }
    total += item.price * item.quantity
    products.push(product)
  })
  if(localStorage.getItem("delivery")){
    total += localStorage.getItem("delivery")
  }
  dataLayer.push({
    'ecommerce': {
      'purchase': {
        'actionField': {
          'id': Math.floor(Math.random() * 999999),                         
          'affiliation': 'Online Store',
          'revenue': total,                     
          'shipping': localStorage.getItem('delivery') ,
        },
        'products':products
      }
    }
  });
}
document.getElementById("button-comprar-2").addEventListener("click", alertDelivery);