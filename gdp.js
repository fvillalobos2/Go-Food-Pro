function getData() {
  let section = document.querySelector('#products');
  let dropdown = document.querySelector('#categories-menu');
  for (let category of categories) {
    if(section != null){
      section.innerHTML += `
      <h1 id=${category.htmlId} class="display-4 text-center">-${category.name}-</h1>
      `;
    }
    if(dropdown != null){
      dropdown.innerHTML += `
      <a class="dropdown-item" href="#${category.htmlId}">${category.name}</a>
      `;
    }
    if(section != null){
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
                  <a class="btn btn-info" data-toggle="collapse" href="#a${item.idProduct}" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Descripcion del Producto
                  </a>
                </p>
                <div class="collapse" id="a${item.idProduct}">
                  <div id="description-card" class="card card-body">
                   ${item.description}
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
}

getData();
let temp2 = '';
var numberCart = 0;
var total = 0;

function cartInit() {
  total = 0;
  numberCart = 0;
  let cart = document.getElementById('product-card');
  let temp = products;
  let data = JSON.parse(localStorage.getItem('cart'));
  let td = document.getElementById('td-products')
  if (data) {
    data.forEach(item => {
      numberCart += item.quantity;
      temp.forEach(product => {
        if (item.idProduct == product.idProduct){
          if(document.getElementById(item.idProduct) != null){
            document.getElementById(item.idProduct).innerHTML = `
            <a style='color:white;' class="btn btn-success add-cart cart1">Añadido al carrito</a>
            <div class="d-flex">
            <span class='lessProduct' onclick = "lessItems(${item.idProduct})">-</span>
              <p><b>${item.quantity}</b></p>
            <span class='moreProduct' onclick="moreProduct(${item.idProduct})">+</span>
            </div>
          `
          }
        };
      });
    });
  }
  if(document.getElementById("numberCart") != null){
    document.getElementById("numberCart").innerHTML = numberCart;
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
          <th ><img class='img-td-home' src=${product.image}></th>
          <td>${product.name}</td>
          <td>
          <div class="d-flex">
          <span class='lessProduct' onclick = "lessItems(${product.idProduct})">-</span>
            <p><b>${product.quantity}</b></p>
          <span class='moreProduct' onclick="moreProduct(${product.idProduct})">+</i></span>
          </div>
          </td>
          <td><span class='delete-table' onclick="deleteProduct(${product.idProduct})"><i class="fas fa-trash-alt"></i></span></td>
      </tr>
      `
      // cart.innerHTML += `
      //   <div class='d-flex'>
      //   <span class='delete-product' onclick="deleteProduct(${product.idProduct})"><i class="fas fa-trash-alt"></i></span>
      //     <h5>${product.name}</h5>
      //     <p>${product.description}</p>
      //     <p class='mr-3'><b>&#8353;${product.price}</b></p>
      //       <div class="d-flex">
      //       <span class='lessProduct' onclick = "lessItems(${product.idProduct})">-</span>
      //         <p><b>${product.quantity}</b></p>
      //       <span class='moreProduct' onclick="moreProduct(${product.idProduct})">+</span>
      //       </div>
      //     </div>
      //   `
    }
    document.getElementById('total').innerHTML = `
      <h5>Total:&#8353;${total}</h5>
    `;
    let name = '';
    let quantity = '';
    data.forEach(product => {
      name += product.name + ', precio unitario: &#8353;' + product.price + ', cantidad: ' + product.quantity + '%0D%0A';
    });
    if(total != 0){
      document.getElementById('whatsapp').innerHTML = `
      <a class="btn btn-success" href="https://wa.me/50688906767?text=Hola me gustaria ordenar el siguiente carrito:%0D%0A${name} %0D%0ATotal:&#8353;${total}" target="_blank">Comprar via Whatsapp</a>
      `;
      if(document.getElementById('a-cart') != null){
        document.getElementById('a-cart').innerHTML = `
        <a class="btn btn-primary" href="carrito.html">Comprar</a>
        `;
      }
    }else{
      document.getElementById('whatsapp').innerHTML =''
      if(document.getElementById('a-cart') != null){
        document.getElementById('a-cart').innerHTML = ``;
      }
    }
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
      if(document.getElementById(product.idProduct) != null){
        document.getElementById(product.idProduct).innerHTML = `
        <a onclick="addCart(${product.idProduct})" class="btn btn-success add-cart cart1">Añadir al Carrito</a>
      `;
      }
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

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
