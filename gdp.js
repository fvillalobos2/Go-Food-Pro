function getData() {
  let section = document.querySelector('#products');
  let dropdown = document.querySelector('#categories-menu');
  for (let category of categories) {
    section.innerHTML += `
    <h1 id=${category.htmlId} class="display-4 text-center">-${category.name}-</h1>
    `;
    dropdown.innerHTML += `
    <a class="dropdown-item" href="#${category.htmlId}">${category.name}</a>
    `;
    let cards = document.createElement('div');
    cards.classList.add('row', 'd-flex', 'justify-content-center');
    section.appendChild(cards);
    for (let item of products) {
      if (item.idCategory == category.id) {
        cards.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12 mt-lg-2 mt-2">
          <div id = 'card-id' class="card">
            <img src=${item.image} class="card-img-top" alt="...">
            <div class= "card-body">
              <h4 id = 'title-card' class="card-title">${item.name}</h4>
              <h5 id ='price-card' class="card-title">&#8353; ${item.price}</h5>
              <p>
                <a class="btn btn-info" data-toggle="collapse" href="#cart1desc" role="button" aria-expanded="false" aria-controls="collapseExample">
                  Descripcion del Producto
                </a>
              </p>
              <div class="collapse" id="cart1desc">
                <div id="description-card" class="card card-body">
                  6 unidades de galletas Gluten free.
                </div>
              </div>
              <div id="${item.idProduct}">
                <a onclick="addCart(${item.idProduct})" class="btn btn-success add-cart cart1">Añadir al Carrito</a>
              </div>
            </div>
          </div>
        </div>
      `
      }
    }
  }
}

getData();;
let temp2 = '';
var numberCart = 0;
var total = 0;

function cartInit() {
  total = 0;
  numberCart = 0;
  let cart = document.getElementById('product-card');
  let temp = products;
  let data = JSON.parse(localStorage.getItem('cart'));
  if (data) {
    data.forEach(item => {
      numberCart += item.quantity;
      temp.forEach(product => {
        if (item.idProduct == product.idProduct) {
          document.getElementById(item.idProduct).innerHTML = `
            <a style='color:white;' class="btn btn-success add-cart cart1">Añadido al carrito</a>
            <div class="d-flex">
            <span class='lessProduct' onclick = "lessItems(${item.idProduct})">-</span>
              <p><b>${item.quantity}</b></p>
            <span class='moreProduct' onclick="moreProduct(${item.idProduct})"><i class="fas fa-plus"></i></span>
            </div>
          `
        };
      });
    });
  }

  document.getElementById("numberCart").innerHTML = numberCart;
  cart.innerHTML = '';
  if (data) {
    data.forEach(dato => {
      let suma = parseFloat(dato.price) * dato.quantity;
      total += parseFloat(suma);
    });
    for (const product of data) {
      cart.innerHTML += `
        <div class='d-flex'>
        <span class='delete-product' onclick="deleteProduct(${product.idProduct})"><i class="fas fa-trash-alt"></i></span>
          <h5>${product.name}</h5>
          <p>${product.description}</p>
          <p class='mr-3'><b>&#8353;${product.price}</b></p>
            <div class="d-flex">
            <span class='lessProduct' onclick = "lessItems(${product.idProduct})">-</span>
              <p><b>${product.quantity}</b></p>
            <span class='moreProduct' onclick="moreProduct(${product.idProduct})"><i class="fas fa-plus"></i></span>
            </div>
          </div>
        `
    }
    document.getElementById('total').innerHTML = `
      <h5>Total:&#8353;${total}</h5>
    `;
    let name = '';
    let quantity = '';
    data.forEach(product => {
      name += product.name + ', precio unitario: &#8353;' + product.price + ', cantidad: ' + product.quantity + '%0D%0A';
    });
    document.getElementById('whatsapp').innerHTML = `
      <a class="btn btn-primary" href="https://web.whatsapp.com/send?phone=50685860314&text=Lista de productos:%0D%0A${name} %0D%0ATotal:&#8353;${total}" target="_blank">Share via Whatsapp</a>
      `;
  }
}

function payPal() {
  paypal.Buttons({
    createOrder: function (data, actions) {

      // This function sets up the details of the transaction, including the amount and line item details.
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total
          }
        }]
      });
    },
    onApprove: function (data, actions) {
      // This function captures the funds from the transaction.
      return actions.order.capture().then(function (details) {
        // This function shows a transaction success message to your buyer.
        localStorage.clear();
        total = 0;
        document.getElementById('total').innerHTML = `
          <h5>Total:&#8353;${total}</h5>
          `;
        document.getElementById("numberCart").innerHTML = 0;
        alert('Transaction completed by ' + details.payer.name.given_name);
        products.forEach((product, index) => {
          document.getElementById(product.idProduct).innerHTML = `
            <a onclick="addCart(${product.idProduct})" class="btn btn-success add-cart cart1">Añadir al Carrito</a>
          `;
        });
        cartInit();
      });
    }
  }).render('#paypal-button-container');
}

payPal();

function moreProduct(id) {
  let data = JSON.parse(localStorage.getItem('cart'))
  data.forEach(product => {
    if (product.idProduct == id) {
      product.quantity = product.quantity + 1;
    }
  });
  localStorage.setItem('cart', JSON.stringify(data));
  cartInit();
}

function lessItems(id) {
  let data = JSON.parse(localStorage.getItem('cart'));
  data.forEach(product => {
    if (product.idProduct == id && product.quantity > 1) {
      product.quantity = product.quantity - 1;
    }
  });
  localStorage.setItem('cart', JSON.stringify(data));
  cartInit();
}

function deleteProduct(id) {
  let cart = JSON.parse(localStorage.getItem('cart'))
  cart.forEach((product, index) => {
    if (id == product.idProduct) {
      cart.splice(index, 1);
      document.getElementById(product.idProduct).innerHTML = `
        <a onclick="addCart(${product.idProduct})" class="btn btn-success add-cart cart1">Añadir al Carrito</a>
      `;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  cartInit();
}
cartInit();

function addCart(id) {
  let data;
  let cart = [];
  if (localStorage.getItem('cart')) {
    data = JSON.parse(localStorage.getItem('cart'));
    cart = data;
  }
  products.forEach(item => {
    if (item.idProduct == id) {
      cart.push(item);
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  numberCart = numberCart + 1;
  let iconCart = document.getElementById("numberCart");
  iconCart.innerHTML = numberCart;
  document.getElementById(id).innerHTML = `
  <a style='color:white;' class="btn btn-success add-cart cart1">Añadido al carrito</a>
  `;
  cartInit();
}