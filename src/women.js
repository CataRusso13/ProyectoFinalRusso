

let itemRow = document.querySelector("#row");
class products {
    constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
    }

}

const prods = [];


const card1 = new products ( 1, "Colorblock Drop-Sleeve", 3550,"../Assets/Multimedia/fotos_women/Colorblock Drop-Sleeve Shirt 1.webp");
const card2 = new products ( 2, "Hot Wheels Graphic Cami", 2000,"../Assets/Multimedia/fotos_women/Hot Wheels Graphic Cami 1.jpg");
const card3 = new products ( 3, "Pointelle Knit Tank Top", 1500,"../Assets/Multimedia/fotos_women/Pointelle Knit Tank Top 1.webp");
const card4 = new products ( 4, "Patchwork Bandana Crop Top", 2000,"../Assets/Multimedia/fotos_women/Patchwork Bandana Crop Top 1.jpg" );
prods.push(card1, card2, card3, card4);

for (const item of prods) {
let items = document.createElement("div");
    items.className = " women-card col-12 col-sm-12 col-md-6 col-lg-3"
    items.innerHTML = ` <img src="${item.img}"alt="foto Drop-Sleeve"> </img>
                        <h2>${item.name}</h2>
                        <p>$${item.price}</p>
                        <a id=${item.id} class=" btn  addToBag ">Add to bag</a>`
    itemRow.appendChild(items)
    
}
////let cart1 = [];
//const DOMitems = document.querySelector('.items');
//const DOMcarrito = document.querySelector('.cart1');
//const DOMtotal = document.querySelector('.total');
//const DOMbotonVaciar = document.querySelector('.button-remove');

//const miButton = document.querySelector('#miButton');
//miButton.innerHTM= `<button class="btn btn-primary miButton">+</button> `
        //miButton.setAttribute('marcador', info.id);
        //miButton.addEventListener('click', addToCart);

//function addToCart (event) {
    //cart1.push(event.target.getAttribute('marcador', ));
   // renderizarCart1();

//}