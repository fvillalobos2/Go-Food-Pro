
$('.navbar-nav>li>div').on('click', function(){
  $('.navbar-collapse').collapse('hide');
});

function getData() {
  let section = document.querySelector('#products');
  let dropdown = document.querySelector('#categories-menu');
  for (let category of categories) {
    if(section != null){
      section.innerHTML += `
      <h1 id=${category.htmlId} class="display-4 text-center">-${category.name}-</h1>
      `;
      var scroll = new SmoothScroll(`a[href*="#${category.htmlId}"]`);
    }
    var url = location.href;
    var array = url.split('/');
    if(dropdown != null){
       if(array.pop() == ''){
        dropdown.innerHTML += `
        <a class="dropdown-item" href="#${category.htmlId}">${category.name}</a>
        `;
       }else{
        dropdown.innerHTML += `
        <a class="dropdown-item" href="/#${category.htmlId}">${category.name}</a>
        `;
       }
     
    }
    if(section != null){
      let cards = document.createElement('div');
      cards.classList.add('row', 'd-flex', 'justify-content-center');
      section.appendChild(cards);
      for (let item of products) {
        if (item.idCategory == category.id) {
          item.idSubCategories = item.idSubCategories.map(elem => "cat-" + elem)
          item.idSubCategories = item.idSubCategories.join(' ')
          cards.innerHTML += `
          <div id=${item.name.replace(/ /g, "").toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"")} class="col-lg-4 col-md-6 col-sm-12 mt-lg-2 mt-2 card-products ${item.idSubCategories}">
            <div id = 'card-id' class="card">
            <div class="container-image ${item.idSubCategories}"></div>
            <div id="b${item.idProduct}" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner products-carrousel">
              </div>
              <a class="carousel-control-prev" href="#b${item.idProduct}" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
              </a>
              <a class="carousel-control-next" href="#b${item.idProduct}" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
              </a>
            </div>
              <div class= "card-body">
                <h4 id = 'title-card' class="card-title">${item.name}</h4>
                <p><span>${item.unit}</span><p>
                <h5 id ='price-card' class="card-title">&#8353; ${item.price}</h5>
                <p>
                  <a class="btn btn-info" data-toggle="collapse" href="#a${item.idProduct}" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Descripción del Producto
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
displaySubCategories=()=>{
  let products = document.querySelectorAll(`.container-image`);
  subcategories.forEach(item => {
    products.forEach(elem => {
      if(elem.classList.contains(`cat-${item.id}`)){
        const div = document.createElement('div')
        const img = document.createElement('img');
        img.classList.add('subcat-item');
        img.src = item.image
        img.title = item.name
        div.classList.add('more-info')
        div.title = item.name
        div.appendChild(img)
        elem.appendChild(div)
      }
    });
  })
}
addImageToCarrousel=()=>{
  let items = document.querySelectorAll(`.products-carrousel`);
  items.forEach((elem,index) => {
    console.log(elem)
    products[index].image.forEach((item,index) => {
          const div = document.createElement('div')
          const itemCarrousel = document.createElement('img');
          itemCarrousel.src = item
          div.classList.add('carousel-item')
          if(index === 0){
            div.classList.add('active')
          }
          div.appendChild(itemCarrousel)
          elem.appendChild(div)
          console.log(elem)
    })
  })
}
getData();
addImageToCarrousel()
displaySubCategories()


function myFunction(x){
  if (x.matches) {
    $(".more-info").click(function () {
      var $title = $(this).find(".title");
      let span = document.createElement('span')
      span.innerHTML = $title
      span.classList.add('titleSpan')
      if (!$title.length) {
        $(this).append('<span class="title">' + $(this).attr("title") + '</span>');
      
      } else {
          $title.remove();
      }
      setTimeout(() => {
        if(!$title.length){
          $(this).trigger( "click" );
        }
      }, 2000);
    });
  }
}

var x = window.matchMedia("(max-width: 765px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction)
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
          // <span class='lessProduct' onclick = "lessItems(${item.idProduct})">-</span>
          // <span class='moreProduct' onclick="moreProduct(${item.idProduct})">+</span>
          if(document.getElementById(item.idProduct) != null){
            document.getElementById(item.idProduct).innerHTML = `
            <a onclick="moreProduct(${item.idProduct})" style='color:white;' class="btn btn-success add-cart cart1">Añadido al carrito</a>
            <div class="d-flex">
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
  if(document.getElementById("numberCartMobile") != null){
    document.getElementById("numberCartMobile").innerHTML = numberCart;
  }
  cart.innerHTML = '';
  td.innerHTML = '';
  if (data) {
    data.forEach(dato => {
      let suma = parseFloat(dato.price) * dato.quantity;
      total += parseFloat(suma);
    });
    for (const product of data) {
      product.price = product.price * product.quantity
      td.innerHTML += `
      <tr>
          <th ><img class='img-td-home' src=${product.image}></th>
          <td>${product.name}</td>
          <td>${product.unit}</td>
          <td>
          <div class="d-flex">
          <span class='lessProduct' onclick = "lessItems(${product.idProduct})">-</span>
            <p><b>${product.quantity}</b></p>
          <span class='moreProduct' onclick="moreProduct(${product.idProduct})">+</i></span>
          </div>
          </td>
        
          </td>
          <td><p class='mr-3'><b>&#8353;${product.price}</b></p></td>
          <td><span class='delete-table' onclick="deleteProduct(${product.idProduct})"><i class="fas fa-trash-alt"></i></span></td>
      </tr>
      `
      cart.innerHTML += `
        <div class='d-flex flex-column'>
        <img class='img-td-home' src=${product.image}>
          <h5>${product.name}</h5>
          <p class='mr-3'><b>&#8353;${product.price}</b></p>
            <div class="d-flex">
            <span class='lessProduct' onclick = "lessItems(${product.idProduct})">-</span>
              <p><b>${product.quantity}</b></p>
            <span class='moreProduct' onclick="moreProduct(${product.idProduct})">+</span>
            <span class='delete-product' onclick="deleteProduct(${product.idProduct})"><i class="fas fa-trash-alt"></i></span>
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
    if(total != 0){
      // document.getElementById('whatsapp').innerHTML = `
      // <a class="btn btn-success" href="https://wa.me/50688906767?text=Hola me gustaria ordenar el siguiente carrito:%0D%0A${name} %0D%0ATotal:&#8353;${total}" target="_blank">Comprar via Whatsapp</a>
      // `;
      if(document.getElementById('a-cart') != null){
        document.getElementById('a-cart').innerHTML = `
        <a style="color:white;" class="btn btn-success" onclick="onCheckout()">Comprar</a>
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
function onCheckout() {
  let data = JSON.parse(localStorage.getItem('cart'))
  let products = []
  data.map(item => {
    let product = {
      name : item.name,
      id : item.idProduct,
      price : item.price,
      brand : "Go Food Pro",
      category : item.idCategory,
      quantity : item.quantity
    }
    products.push(product)
  })
  dataLayer.push({
    'event': 'checkout',
    'ecommerce': {
      'checkout': {
        'actionField': {'step': 1, 'option': 'Comprar'},
        'products': products
     }
   },
   'eventCallback': function() {
      document.location = 'carrito';
   }
  });
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
  products.forEach((item,index) => {
    if (item.idProduct == id) {
      cart.push(item);
      let category = categories.filter(elem => elem.id === item.idCategory)
      dataLayer.push({
        'event': 'addToCart',
        'ecommerce': {
          'currencyCode': 'USD',
          'add': {                                // 'add' actionFieldObject measures.
            'products': [{                        //  adding a product to a shopping cart.
              'name': item.name,
              'id': item.idProduct,
              'price': item.price,
              'brand': 'Go Food Pro',
              'category': category[0].name,
              'variant': 'Gray',
              'quantity': item.quantity
             }]
          }
        }
      });
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  numberCart = numberCart + 1;
  let iconCart = document.getElementById("numberCart");
  iconCart.innerHTML = numberCart;
  document.getElementById(id).innerHTML = `
    <a onclick="moreProduct(${id})" style='color:white;' class="btn btn-success add-cart cart1">Añadido al carrito</a>
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
  var body = $("html, body");
  body.stop().animate({scrollTop:0}, 1000, 'swing', function() {});
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


