class products {
    constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
    }

}

const prod = [];

const card1 = new products ( 1, "Colorblock Drop-Sleeve", 3550,"../Assets/Multimedia/fotos_women/Colorblock Drop-Sleeve Shirt 1.webp");
const card2 = new products ( 2, "Hot Wheels Graphic Cami", 2000,"../Assets/Multimedia/fotos_women/Hot Wheels Graphic Cami 1.jpg");
const card3 = new products ( 3, "Pointelle Knit Tank Top", 1500,"../Assets/Multimedia/fotos_women/Pointelle Knit Tank Top 1.webp");
const card4 = new products ( 4, "Patchwork Bandana Crop Top", 2000,"../Assets/Multimedia/fotos_women/Patchwork Bandana Crop Top 1.jpg" )
prod.push(card1, card2, card3, card4);