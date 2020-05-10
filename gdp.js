{
  /* <script>
   $(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
      console.log('hola')
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.galletas;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    })
  }); 
  </script> */
}
let products = [{
    name: 'ZanaBana Muffin',
    description: '6 unidades de galletas Gluten free.',
    idProduct: 1,
    idCategory: 1,
    price: 2000,
    quantity: 1
  },
  {
    name: 'Choco ZanaBana Muffin',
    description: '6 unidades de galletas Gluten free.',
    idProduct: 2,
    idCategory: 1,
    price: 2000,
    quantity: 1
  },
  {
    name: 'Mantequilla de Almendras',
    description: '6 unidades de galletas Gluten free.',
    idProduct: 3,
    idCategory: 2,
    price: 2000,
    quantity: 1
  },
  {
    name: 'Mantequilla de Maní',
    description: '6 unidades de galletas Gluten free.',
    idProduct: 4,
    idCategory: 2,
    price: 2000,
    quantity: 1
  },
]
let categories = [{
    name: 'Galletas',
    id: 0
  },
  {
    name: 'Muffins',
    description: 'prueba',
    id: 1
  },
  {
    name: 'Mantequillas',
    description: 'prueba',
    id: 2
  },
  {
    name: 'Choco Cocadas',
    description: 'prueba',
    id: 3
  },
  {
    name: 'Nutcracker Bread',
    description: 'prueba',
    id: 4
  },
  {
    name: 'Proballs',
    description: 'prueba',
    id: 5
  },
  {
    name: 'Crunch Bars',
    description: 'prueba',
    id: 6
  },
  {
    name: 'Donas',
    description: 'prueba',
    id: 7
  },
  {
    name: 'Queques',
    description: 'prueba',
    id: 8
  },
]

function getData() {
  const response = new XMLHttpRequest()
  response.open('GET', 'gdp.json', true)
  response.send();
  response.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText))
      categories = JSON.parse(this.responseText)
    }
  }
  const resProducts = new XMLHttpRequest()
  resProducts.open('GET', 'products.json', true)
  resProducts.send();
  resProducts.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText))
      products = JSON.parse(this.responseText)
    }
  }
  let section = document.querySelector('#products');
  for (let category of categories) {
    section.innerHTML += `
    <h1 class="display-4 text-center">-${category.name}-</h1>
    `;
    let cards = document.createElement('div');
    cards.classList.add('row', 'd-flex', 'justify-content-center');
    section.appendChild(cards);
    for (let item of products) {
      if (item.idCategory == category.id) {
        cards.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12 mt-lg-2 mt-2">
          <div id = 'card-id' class="card">
            <img src="gfpimg/galletas-almendra.jpg" class="card-img-top" alt="...">
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
getData()
let temp2 = ''
var numberCart = 0
var total = 0

function cartInit() {
  total = 0
  let cart = document.getElementById('product-card')
  let temp = products
  let data = JSON.parse(localStorage.getItem('cart'))
  if (data) {
    numberCart = data.length
    data.forEach(item => {
      temp.forEach(product => {
        if (item.idProduct == product.idProduct) {
          document.getElementById(item.idProduct).innerHTML = `
            <a style='color:white;' class="btn btn-success add-cart cart1">Añadido al carrito</a>
          `
        }
      });
    });
  }
  document.getElementById("numberCart").innerHTML = numberCart;
  cart.innerHTML = ''
  if (data) {
    data.forEach(dato => {
      let suma = parseFloat(dato.price) * dato.quantity
      total += parseFloat(suma)
    });
    for (const product of data) {
      cart.innerHTML += `
        <div class='d-flex'>
        <span class='delete-product' onclick="deleteProduct(${product.idProduct})">x</span>
          <h5>${product.name}</h5>
          <p>${product.description}</p>
          <p class='mr-3'><b>&#8353;${product.price}</b></p>
          <p><b>${product.quantity}</b></p>
        </div>
        `
    }
    document.getElementById('total').innerHTML = `
        <h5>Total:&#8353;${total}</h5>
      `
    let name = ''
    let quantity = ''
    data.forEach(product => {
      name += product.name + ', precio: ' + product.price + ', cantidad: ' + product.quantity + '%0D%0A'
      console.log(name)
    });
    document.getElementById('whatsapp').innerHTML = `
      <a class="btn btn-primary" href="https://web.whatsapp.com/send?text=Lista de productos:%0D%0A${name} %0D%0ATotal:&#8353;${total}" target="_blank">Share via Whatsapp</a>
      `
  }
}

function deleteProduct(id) {
  let cart = JSON.parse(localStorage.getItem('cart'))
  cart.forEach((product, index) => {
    if (id == product.idProduct) {
      cart.splice(index, 1)
      document.getElementById(product.idProduct).innerHTML = `
        <a onclick="addCart(${product.idProduct})" class="btn btn-success add-cart cart1">Añadir al Carrito</a>
      `
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart))
  cartInit()
}
cartInit()

function addCart(id) {
  let data;
  let cart = []
  if (localStorage.getItem('cart')) {
    data = JSON.parse(localStorage.getItem('cart'))
    cart = data
  }
  products.forEach(item => {
    if (item.idProduct == id) {
      cart.push(item)
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart))
  numberCart = numberCart + 1
  let iconCart = document.getElementById("numberCart")
  iconCart.innerHTML = numberCart
  document.getElementById(id).innerHTML = `
  <a style='color:white;' class="btn btn-success add-cart cart1">Añadido al carrito</a>
  `
  cartInit()
} {
  /* <style>
  #section1 {
    height: 600px;
    background-color: pink;
  }

  #section2 {
    height: 600px;
    background-color: yellow;
  }
  </style>
  </head>
  <body>

  <h1>Smooth Scroll</h1>

  <div class="main" id="section1">
    <h2>Section 1</h2>
    <p>Click on the link to see the "smooth" scrolling effect.</p>
    <a href="#section2">Click Me to Smooth Scroll to Section 2 Below</a>
    <p>Note: Remove the scroll-behavior property to remove smooth scrolling.</p>
  </div>

  <div class="main" id="section2">
    <h2>Section 2</h2>
    <a href="#section1">Click Me to Smooth Scroll to Section 1 Above</a>
  </div>

  </body>
  </html> */
}