let itemRow = document.querySelector('#row');

const bag = JSON.parse(localStorage.getItem('carrito')) || [];
render();

let items;
let prods = [];
window.addEventListener("load", async () => {
    const resp = await fetch("https://6271743425fed8fcb5e67033.mockapi.io/prods");
    prods = await resp.json();

    prods.forEach(item => {
        items = document.createElement("div");
        items.className = " women-card col-12 col-sm-12 col-md-6 col-lg-3";
        items.innerHTML = ` <img src="${item.img}"alt="foto Drop-Sleeve"></img>
        <h2>${item.name}</h2>
        <p>$${item.price}</p>
        <a id=${item.id} class=" btn  addToBag ">Add to bag</a>`
        itemRow.appendChild(items);
        const btnAddToBag = document.getElementById(`${item.id}`).addEventListener("click", () => bagButton(item));
    })
})

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
        <img class="mt-2 mx-2" src="${item.img}" style="width:50px; height:70px"></img>
        <p> Name:${item.name} Price: $${item.price} Total:$ ${item.totalItem}</p>
        <p>cantidad:${item.cant}</p> 
        <button type:"button" class="btn btn-primary"id="sumarP${item.id}">+</button>
        <button  type:"button" class="btn btn-primary" id="restarP${item.id}">-</button>`
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
    const deliver = async () =>{
        return new Promise(resp=>{
            setTimeout(() =>{
                localStorage.setItem('todeliver', JSON.stringify(bag));
                localStorage.removeItem('carrito')
                bag.splice(length)
                render();
            },800)
        })
    }
    deliver()
}

//! About search form
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const form = document.querySelector(".form")

search.onchange = (e)=> {
    const searchVal = e.target.value.toLowerCase();
    form.onsubmit = (e)=> {
        e.preventDefault();
        prods.forEach(item=> {
            searchVal === item.name.toLowerCase()
            &&  Swal.fire({
                title: item.name,
                text: "$" + item.price,
                imageUrl: item.img,
                imageWidth: 300,
                imageHeight: 400,
                imageAlt: 'Custom image',
                confirmButtonText: 'Shop',
            })
        })
    }
}
