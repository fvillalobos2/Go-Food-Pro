let subcategories=[
    {
        id:0,
        name:'Sin preservantes',
        image:'gfpimg/sinpreservantes-32px-min.png'
    },
    {
        id:1,
        name:'Keto',
        image:'gfpimg/keto-32px-min.png'
    },
    {
        id:2,
        name:'Vegano',
        image:'gfpimg/vegano-32px-min.png'
    },
    {
        id:3,
        name:'Sin Azúcar',
        image:'gfpimg/sinazucar-32px-min.png'
    },
    {
        id:4,
        name:'Gluten Friendly',
        image:'gfpimg/glutenfriendly-32px-min.png'
    },
    {
        id:5,
        name:'Sin Lácteos',
        image:'gfpimg/sinlacteos-32px-min.png'
    },
]
let products = [
    {
        name: "Maní Sabor a Leche Condensada",
        description: "<p>Sin Lácteos y Sin Azúcar</p><p>Frasco de vidrio de <b>240g</b></p><p><b>Intercambio nutricional:</b> 1 cucharada = 1,5 grasas</p><p><b>Ingredientes:</b> Maní, extracto de stevia como endulzante, sabor a leche condensada. Contiene maní. Puede contener trazas de semillas o nueces.</p>",
        idProduct: 7,
        image: ["gfpimg/peanut-saboraleche.png"],
        idCategory: 0,
        idSubCategories:[0,2,3,4,5],
        price: 5500,
        unit:'Frasco de vidrio de 240g',
        quantity: 1
    },
    {
        name: "Mantequilla de Maní 100% Natural",
        description: "<p>Frasco de vidrio de <b>240g</b></p><p><b>Intercambio nutricional:</b> 1 cucharada = 1,5 grasas</p><p><b>Ingredientes:</b> Maní. Puede contener trazas de semillas o nueces.</p>",
        idProduct: 6,
        image: ["gfpimg/peanut-butter.png","gfpimg/almond-butter.png"],
        idCategory: 0,
        idSubCategories:[0,2,3,4,5],
        price: 5500,
        unit:'Frasco de vidrio de 240g',
        quantity: 1
    },
    {
        name: "Mantequilla de Almendras 100% Natural",
        description: "<p>Frasco de vidrio de <b>240g</b></p><p><b>Intercambio nutricional:</b> 1 cucharada = 1,5 grasas</p><p><b>Ingredientes:</b>Almendras. Puede contener trazas de gluten, semillas o nueces.</p>",
        idProduct: 5,
        image: ["gfpimg/almond-butter.png"],
        idCategory: 0,
        idSubCategories:[0,1,2,3,4,5],
        price: 6500,
        unit:'Frasco de vidrio de 240g',
        quantity: 1
    },
    {
        name: "Mantequilla de Almendras Sabor a Leche Condensada",
        description: "<p>Sin Lácteos y Sin Azúcar</p><p>Frasco de vidrio de <b>240g</b></p><p><b>Intercambio nutricional:</b> 1 cucharada = 1,5 grasas</p><p><b>Ingredientes:</b> Almendras, extracto de stevia como endulzante, sabor a leche condensada. Contiene almendras. Puede contener trazas de semillas o nueces.</p>",
        idProduct: 8,
        image: ["gfpimg/almond-butter.png"],
        idCategory: 0,
        idSubCategories:[0,1,2,3,4,5],
        price: 7500,
        unit:'Frasco de vidrio de 240g',
        quantity: 1
    },
    {
        name: "Mantequilla de Maní con Proteína y Vainilla",
        description: "<p>Sin Lácteos y Sin Azúcar</p><p>Frasco de vidrio de <b>240g</b></p><p><b>Intercambio nutricional:</b> 1 cucharada de 16g = 1 proteína y 1.5 grasas</p><p><b>Ingredientes:</b>Maní, proteína hidrolizada de suero de leche, vainilla.<br><b>Contiene: Maní y Suero de Leche.</b></p>",
        idProduct: 20,
        image: ["gfpimg/vainilla-protein-peanut.png"],
        idCategory: 0,
        idSubCategories:[0,3,4],
        price: 6500,
        unit:'Frasco de vidrio de 240g',
        quantity: 1
    },
    {
        name: "Mantequilla de Maní Crunchy con Proteína & Chocolate",
        description: "<p>Sin Lácteos y Sin Azúcar</p><p>Frasco de vidrio de <b>240g</b></p><p><b>Intercambio nutricional:</b> 1 cucharada de 16g = 1 proteína y 1.5 grasas</p><p><b>Ingredientes:</b> Maní, proteína hidrolizada de suero de leche, vainilla y chocolate al 70%.<br><b>Contiene: Maní y Suero de Leche.</b></p>",
        idProduct: 21,
        image: ["gfpimg/choco-protein.png"],
        idCategory: 0,
        idSubCategories:[0,3,4],
        price: 6500,
        unit:'Frasco de vidrio de 240g',
        quantity: 1
    },
    {
        name: "Cajetas KETO Veganas",
        description: "<p>Cajetas a base de mantequilla de mani y coco crocante con notas a dulce de leche.</p><p> Bolsita de <b> 6 unidades</b></p><p><b>Intercambio nutricional:</b> 1 bolita = 1/2 grasa</p><p><b>Ingredientes:</b> Mantequilla de maní natural (sin aceites ni azúcares añadidos), coco rallado, sabor a dulce de leche y estevia (rebiana) como endulzante natural.</p>",
        idProduct: 16,
        image: ["gfpimg/cajetas-keto-veganas-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,1,2,3,4,5], 
        price: 3000,
        unit:'Bolsita de 6 unidades',
        quantity: 1
    },
    {
        name: "Peanut Butter Cups",
        description: "<p>Tacitas de mantequilla de maní con sabor a leche condensada.</p> <p> Caja de <b> 6 unidades</b></p><p><b>Intercambio nutricional:</b> 2,5 grasas / 1 carbohidrato</p><p><b>Ingredientes:</b> Chocolate al 70%, vainilla, cacao en polvo, mantequilla de maní con sabor a leche condensada sin lácteos ni azúcar. Puede contener trazas de soya.</p>",
        idProduct: 15,
        image: ["gfpimg/peanutbuttercups-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,2,4,5], 
        price: 5700,
        unit:'Paquete de 6 unidades',
        quantity: 1
    },
    // {
    //     name: "Keto Cocadas",
    //     description: "<p>Galletas a base de coco y cacao puro.</p> <p> Paquete de <b> 200 gramos</b></p><p><b>Intercambio nutricional:</b> 1 cocadas =<br> 2 ½ grasas</p><p><b>Ingredientes:</b> Coco, claras de huevo, eritritol, mantequilla de almendras, aceite de coco, cocoa pura, y bicarbonato de sodio. Contiene: almendras y huevo. Puede contener trazas de gluten, semillas o nueces.</p>",
    //     idProduct: 9,
    //     image: ["gfpimg/chocococadas-1-min.jpg"],
    //     idCategory: 1,
    //     idSubCategories:[0,1,3,4,5],
    //     price: 5500,
    //     unit:'Paquete de 200 gramos',
    //     quantity: 1
    // },
    // {
    //     name: "Nutcracker Bread",
    //     description: "<p>Pan a base de semillas mixtas con fibra natural.</p> <p> Unidad de <b> 750 gramos</b><br>(de 10 a 15 tajadas)</p><p><b>Intercambio nutricional:</b> 1 rebanada de 50g = 2 grasas</p><p><b>Ingredientes:</b> Agua, semillas mixtas (girasol, linaza, chía, almendras, ajonjolí, calabaza) avena, ƒibra, aceite de coco, agave azul orgánico, sal. Contiene: almendras y ajonjolí. Puede contener trazas de gluten.</p>",
    //     idProduct: 10,
    //     image: ["gfpimg/nutcrackerbread-min.jpg"],
    //     idCategory: 1,
    //     idSubCategories:[0,2,4,5],
    //     price: 6000,
    //     unit:'Unidad de 750 gramos',
    //     quantity: 1
    // },
    // {
    //     name: "Keto Nutcracker Bread",
    //     description: "<p>Pan a base de semillas mixtas con fibra natural, sin avena ni azúcares añadidos.</p> <p> Unidad de <b> 750 gramos</b><br>(de 10 a 15 tajadas)</p><p><b>Intercambio nutricional:</b> 1 rebanada de 50g = Carbohidratos totales: 3g Carbohidratos netos : 0g  Grasas: 2</p><p><b>Ingredientes:</b> Agua, semillas mixtas (girasol, linaza, chía, almendras, ajonjolí, calabaza), ƒibra, aceite de coco, sal. Contiene: almendras y ajonjolí. Puede contener trazas de gluten.</p>",
    //     idProduct: 11,
    //     image: ["gfpimg/ketonutcracker-min.jpg"],
    //     idCategory: 1,
    //     idSubCategories:[0,1,2,3,4,5],
    //     price: 6000,
    //     unit:'Unidad de 750 gramos',
    //     quantity: 1
    // },
    // {
    //     name: "Proballs",
    //     description: "6 unidades de galletas Gluten free.",
    //     idProduct: 10,
    //     image: "gfpimg/proballs-min.jpg",
    //     idCategory: 1,
    //     price: 100,
    //     quantity: 1
    // },
    {
        name: "Crunch Bars",
        description: "<p>Barritas a base de arroz tostado y mantequilla de almendras 100% natural.</p> <p> Paquete de <b> 6 unidades</b><br></p><p><b>Intercambio nutricional:</b> 1 barrita =<br> 1 grasa, ½ proteína y 1 carbohidrato</p><p><b>Ingredientes:</b> Arroz tostado, agave azul orgánico, mantequilla de almendras (sin azúcar o aceites añadidos), chocolate semiamargo, proteína aislada de suero de leche. Contiene: almendras y suero de leche. Puede contener trazas de gluten, semillas o nueces.</p>",
        idProduct: 12,
        image: ["gfpimg/Crunchbars-1-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,4],
        price: 4500,
        unit:'Paquete de 6 unidades',
        quantity: 1
    },
    {
        name: "Donas",
        description: "<p>Donitas a base de camote como primer ingrediente con chocolate semiamargo y cremosa mantequilla de maní.</p> <p> Paquete de <b> 6 unidades</b></p><p><b>Intercambio nutricional:</b> 1 dona = <br> ½ carbohidrato y 1 grasa</p><p><b>Ingredientes:</b> Camote, chocolate semiamargo, leche de coco, avena, mantequilla de maní (sin azúcares o aceites añadidos). Contiene: maní. Puede contener trazas de gluten, semillas o nueces.</p>",
        idProduct: 13,
        image: ["gfpimg/donas-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,2,4,5],
        price: 3900,
        unit:'Paquete de 6 unidades',
        quantity: 1
    },
    {

        name: "Galletas de Almendra",
        description: "<p>Galletas a base de nuestra cremosa mantequilla de almendras con crujientes nibs de cacao.</p> <p> Paquete de <b> 6 unidades</b></p><p><b>Intercambio nutricional:</b> 1 galleta =<br> 2 grasas, 1 proteína y 1 carbohidrato</p><p><b>Ingredientes:</b>  Almendras, cacao nibs recubiertos de chocolate al 70%, claras de huevo, azúcar de coco, almidón de yuca, bicarbonato de sodio. Contiene: Almendras y claras de huevo. Puede contener trazas de gluten, semillas o nueces.</p>",
        idProduct: 1,
        image: ["gfpimg/galletas-almendra-1-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,4,5],
        price: 5500,
        unit:'Paquete de 6 unidades',
        quantity: 1
    },
    {
        name: "Galletas de Cacao",
        description: "<p>Galletas de cacao intenso sin harinas.</p> <p> Paquete de <b> 6 unidades</b></p><p><b>Intercambio nutricional:</b> 1 galleta =<br> 1 ½ grasas, ½ proteína y ½ carbohidrato</p><p><b>Ingredientes:</b>  Cacao nibs recubiertos de chocolate al 70%, mantequilla de almendras, mantequilla de maní, azúcar de coco, claras de huevo, cocoa en polvo, bicarbonato de sodio. Contiene: Almendras, maní y huevo. Puede contener trazas de gluten, semillas o nueces.</p>",
        idProduct: 2,
        image: ["gfpimg/galletas-cacao-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,4,5],
        price: 5000,
        unit:'Paquete de 6 unidades',
        quantity: 1
    },
    // {
    //     name: "Galletas Choco-Chips",
    //     description: "<p>Deliciosas y chiclosas galletas veganas con chispas de chocolate.</p><p> Paquete de <b> 5 unidades</b></p><p><b>Intercambio nutricional:</b> 1 galleta =<br> 2,5 grasas | 1 carbohidrato</p><p><b>Ingredientes:</b>Mantequilla de almendras, azúcar cruda, chips de chocolate oscuro, agua, harina de yuca, nibs de chocolate, chía, vainilla, stevia, bicarbonato de sodio. Contiene: Almendras.</p>",
    //     idProduct: 17,
    //     image: ["gfpimg/galletas-veganas-choco-chips-min.jpg"],
    //     idCategory: 1,
    //     idSubCategories:[0,2,4,5],
    //     price: 5500,
    //     unit:'Paquete de 5 unidades',
    //     quantity: 1
    // },
    {
        name: "ZanaBana Muffin",
        description: "<p>Muffins a base de zanahoria con banano y sin azúcar.</p> <p> Paquete de <b> 6 unidades</b></p><p><b>Intercambio nutricional:</b> 1 muffin = <br> 1 carbohidrato y ½ grasa</p><p><b>Ingredientes:</b> Bananos, avena, claras de huevo, zanahorias, aceite de coco, sucralosa, sal, especias (menos del 2%) y bicarbonato de sodio. Contiene huevo. Puede contener trazas de gluten, semillas o nueces.</p>",
        idProduct: 3,
        image: ["gfpimg/zanabana-muffin-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,3,4,5],
        price: 5500,
        unit:'Paquete de 6 unidades',
        quantity: 1
    },
    {
        name: "Choco ZanaBana Muffin",
        description: "<p>Muffins a base de zanahoria con banano, sin azúcar y con chips de chocolate oscuro</p> <p> Paquete de <b> 6 unidades</b></p><p><b>Intercambio nutricional:</b> 1 muffin =<br> 1 carbohidrato, 1 grasa y ½ proteína</p><p><b>Ingredientes:</b> Bananos, avena, claras de huevo, zanahorias, chocolate semiamargo, aceite de  coco, sucralosa, sal, especias (menos del 2%) y bicarbonato de sodio. Contiene: huevo. Puede contener trazas de gluten, semillas o nueces.</p>",
        idProduct: 4,
        image: ["gfpimg/choco-muffin-min.jpg"],
        idCategory: 1,
        idSubCategories:[0,4,5],
        price: 5500,
        unit:'Paquete de 6 unidades',
        quantity: 1
    },

    // {
    //     name: "Mantequilla de Marañon con Vainilla y Coco",
    //     description: "<p>Frasco de vidrio de <b>240g</b></p><p><b>Intercambio nutricional:</b> 1 cucharada = 1,5 grasas</p><p><b>Ingredientes:</b> Contiene Marañon, Coco y Vainilla.</p>",
    //     idProduct: 14,
    //     image: "gfpimg/mantequillamaranon-1-min.jpg",
    //     idCategory: 0,
    //     price: 7500,
    //     quantity: 1
    // },
  
    // {
    //     name: "Go-Bucha Manzana Canela",
    //     description: "<p>Bebida fermentada abase de té, agua y frutas</p> <p> Envase de <b>500 ml</b></p><p><b>Ingredientes:</b> Agua, té, manzana, canela, cultivo vivo de kombucha(scoby).<br><p> Mantener en refrigeración.</p></p>",
    //     idProduct: 18,
    //     image: ["gfpimg/go-bucha-manzana-min.jpg"],
    //     idCategory: 2,
    //     idSubCategories:[0,2,4,5],
    //     price: `1600`,
    //     unit:'500 ml',
    //     quantity: 1
    // },
    // {
    //     name: "Go-Bucha Piña",
    //     description: "<p>Bebida fermentada abase de té, agua y frutas</p> <p> Envase de <b>500 ml</b></p><p><b>Ingredientes:</b>Agua, té, piña, jengibre fresco, cúrcuma fresca.cultivo vivo de kombucha (scoby).</p><br><p> Mantener en refrigeración.</p>",
    //     idProduct: 19,
    //     image: ["gfpimg/go-bumcha-pina-min.jpg"],
    //     idCategory: 2,
    //     idSubCategories:[0,2,4,5],
    //     price: 1600,
    //     unit:'500 ml',
    //     quantity: 1
    // },
    // {
    //     name: "Keto Pack",
    //     description: "<p>Mantequilla de almendras + Dos galletas de cacao y coco endulzadas con eritritol y monkfruit (endulzante keto, cero indice glicémico, cero calorías) <br><br><b>ENVÍO GRATIS</b></p>",
    //     idProduct: 20,
    //     image: ["gfpimg/ketopromo1.jpg"],
    //     idCategory: 3,
    //     idSubCategories:[1,1],
    //     price: 8500,
    //     unit:'',
    //     quantity: 1
    // },
    // {
    //     name: "Keto Pack 2",
    //     description: "<p> 2 Galletas de Coco y Chocolate endulzadas con eritritol y monkfruit (endulzante keto, cero indice glicémico, cero calorías) + Nutcracker KETO + Mantequilla de almendras con sabor a leche condensada o 100% natural.<br><br><b>ENVÍO GRATIS</b></p>",
    //     idProduct: 21,
    //     image: ["gfpimg/ketopromo2.jpg"],
    //     idCategory: 3,
    //     idSubCategories:[1,1],
    //     price: 13500,
    //     unit:'',
    //     quantity: 1
    // },
    // {
    //     name: "Queque de Camote y Cacao",
    //     description: "6 unidades de galletas Gluten free.",
    //     idProduct: 13,
    //     image: "gfpimg/quequecamote-min.jpg",
    //     idCategory: 8,
    //     price: 2000,
    //     quantity: 1
    // },
    // {
    //     name: "Queque de Limón",
    //     description: "6 unidades de galletas Gluten free.",
    //     idProduct: 14,
    //     image: "gfpimg/quequecamote-min.jpg",
    //     idCategory: 8,
    //     price: 2000,
    //     quantity: 1
    // },
];
let categories = [
    // {
    //     name: 'Galletas',
    //     htmlId: 'galletas',
    //     description: 'prueba',
    //     id: 0
    // },
    {
        name: 'Mantequillas',
        htmlId: 'mantequillas',
        description: 'prueba',
        id: 0
    },
    {
        name: 'Snacks',
        htmlId: 'snacks',
        description: 'prueba',
        id: 1
    },
   
  
    // {
    //     name: 'Kombuchas',
    //     htmlId: 'kombuchas',
    //     description: 'prueba',
    //     id: 2
    // },
    // {
    //     name: 'Promos',
    //     htmlId: 'promos',
    //     description: 'prueba',
    //     id: 3
    // },
    // {
    //     name: 'Cocadas',
    //     htmlId: 'cocadas',
    //     description: 'prueba',
    //     id: 3
    // },
    // {
    //     name: 'Nutcracker Bread',
    //     htmlId: 'nutcracker-bread',
    //     description: 'prueba',
    //     id: 4
    // },
    // {
    //     name: 'Proballs',
    //     htmlId: 'proballs',
    //     description: 'prueba',
    //     id: 5
    // },
    // {
    //     name: 'Crunch Bars',
    //     htmlId: 'crunch',
    //     description: 'prueba',
    //     id: 6
    // },
    // {
    //     name: 'Donas',
    //     htmlId: 'donas',
    //     description: 'prueba',
    //     id: 7
    // },
    // {
    //     name: 'Queques',
    //     htmlId: 'queques',
    //     description: 'prueba',
    //     id: 8
    // },
];
