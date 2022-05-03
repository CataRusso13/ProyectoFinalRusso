let itemRow = document.querySelector("#row");

class products {
    constructor(id, name, price, img) {
        this.id = id,
            this.name = name,
            this.price = price,
            this.img = img,
            this.cant = 0,
            this.totalItem = 0;
    }
}

//!About prods and bag 
const prods = [];
const bag = JSON.parse(localStorage.getItem("carrito")) || [];
render();

const card1 = new products(1, "Colorblock Drop-Sleeve", 3550, "../Assets/Multimedia/fotos_women/ColorblockDropSleeveShirt1.webp");
const card2 = new products(2, "Hot Wheels Graphic Cami", 2000, "../Assets/Multimedia/fotos_women/HotWheelsGraphicCami1.jpg");
const card3 = new products(3, "Pointelle Knit Tank Top", 1500, "../Assets/Multimedia/fotos_women/PointelleKnitTankTop1.webp");
const card4 = new products(4, "Patchwork Bandana Crop Top", 2000, "../Assets/Multimedia/fotos_women/PatchworkBandanaCropTop1.jpg");
prods.push(card1, card2, card3, card4);

for (const item of prods) {
    let items = document.createElement("div");
    items.className = " women-card col-12 col-sm-12 col-md-6 col-lg-3";
    items.innerHTML = ` <img src="${item.img}"alt="foto Drop-Sleeve"></img>
    <h2>${item.name}</h2>
    <p>$${item.price}</p>
    <a id=${item.id} class=" btn  addToBag ">Add to bag</a>`
    itemRow.appendChild(items)
    const btnAddToBag = document.getElementById(`${item.id}`).addEventListener("click", () => bagButton(item));
}

function render() {
    const callModal = document.querySelector(".cartContainer");
    callModal.innerHTML = "";
    const total = document.createElement("div");
    const totalAll = bag.reduce((acc, el) => acc + el.totalItem, 0);
    total.innerHTML = `<h4>Total:${totalAll}</h4>`
    callModal.append(total);
    bag.forEach(item => {
        let bagItemContent = document.createElement("div");
        bagItemContent.className = "prod-container d-flex";
        bagItemContent.innerHTML = `
        <img class="mt-2" src="${item.img}" style="width:50px; height:70px"></img>
        <p> Name:${item.name} Price: $${item.price} Total:$ ${item.totalItem}</p>
        <p>cantidad:${item.cant}</p> 
        <button id="sumarP${item.id}">+</button>
        <button id="restarP${item.id}">-</button>`
        callModal.append(bagItemContent);
        const sumarP = document.getElementById(`sumarP${item.id}`);
        const restarP = document.getElementById(`restarP${item.id}`);
        sumarP.onclick = () => {
            const index = bag.findIndex(x => x.id === item.id)
            bag[index].cant += 1
            bag[index].totalItem = bag[index].price * bag[index].cant
            render();
        }
        restarP.onclick = () => {
            const index = bag.findIndex(x => x.id === item.id)
            bag[index].cant -= 1
            bag[index].totalItem = bag[index].price * bag[index].cant
            if (bag[index].cant == 0) {
                bag.splice(index, 1)
            }
            render();
        }
    })

}


function bagButton(item) {
    Swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Added successfully',
        showConfirmButton: false,
        timer: 900
    })
    if (bag.find(x => x.id === item.id)) {
        const index = bag.findIndex(x => x.id === item.id)
        bag[index].cant += 1
        bag[index].totalItem = bag[index].price * bag[index].cant
    } else {
        item.cant = 1;
        item.totalItem = item.cant * item.price
        bag.push(item);

    }
    console.log(bag);
    render();
    localStorage.setItem("carrito", JSON.stringify(bag));
}

//! About remove items

let buttonRemove = document.querySelector("#remove").addEventListener("click", removeItemsButton);

function removeItemsButton() {
    bag.splice(length);
    localStorage.removeItem("carrito");
    render();

}

//!About shop items
const shopItems = document.querySelector("#shop").addEventListener("click", shopItemsButton);

function shopItemsButton() {
    Swal.fire({
        title: 'Great Job! ',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}




//! About search form
const search = document.querySelector(".search").addEventListener("keyup", searchFunction);
const callForm = document.querySelector(".form");

function searchFunction(e) {
    const searchEl = e.target.value;
    callForm.onsubmit = (e) => {
        e.preventDefault();
        for (const item of prods) {
            item.name == searchEl && Swal.fire({
                title: item.name,
                text: "$" + item.price,
                imageUrl: item.img,
                imageWidth: 300,
                imageHeight: 400,
                imageAlt: 'Custom image',
                confirmButtonText: 'Shop',
            })
        }
    }
}

//! about promise

