var data;
getData().then(item=>{data=item});

async function getData(){
    const temp=await fetch('../home/data');
    let data= await temp.json();
    return data;
}
const katalog =document.getElementById("Katalog");

const category=document.getElementById("trenutnaKategorija").innerHTML;
const selectedCategory=document.getElementById("trenutnaKategorija");
console.log(category);

const categoryDiv=document.getElementById("Katalog");

// --- SESSION-BASED CART LOGIC ---

// Helper: fetch cart from session
async function fetchCart() {
    const res = await fetch('/cart/getAll');
    if (!res.ok) return [];
    const result = await res.json();
    return result.cart || [];
}

// Helper: add product to cart by id
async function addToCart(product) {
    await fetch(`/cart/add/${product.id}`,{method: "POST"});
    await updateCart();
    await updateProductCounters();
}

// Create product element with session cart quantity
function createProductElement(product, cartItems = []) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("proizvod");
    const existingItem = cartItems.find(item => item.name === product.name);
    const quantity = existingItem ? existingItem.quantity : 0;
    productDiv.innerHTML = `
        <img class="proizvodImage" src="${product.image}" alt="${product.name}">
        <div class="addToCart-container">
            <button class="addToCart">
                Add to cart
                <div class="product-counter" style="display: ${quantity ? 'flex' : 'none'}">${quantity}</div>
            </button>
        </div>
        <p class="name">${product.name}</p>
        <h4 class="price"><s>(200€)</s> <strong>${product.price}€</strong></h4>
    `;
    // Add event listener for addToCart
    productDiv.querySelector('.addToCart').addEventListener('click', () => addToCart(product));
    return productDiv;
}

// Update product display with session cart
async function updateProductDisplay() {
    const category = document.getElementById("trenutnaKategorija").innerHTML;
    const categoryDiv = document.getElementById("Katalog");
    const proizvodi = data.categories.find(categor => categor.name === category);
    const cartItems = await fetchCart();
    categoryDiv.innerHTML = "";
    proizvodi.products.forEach(product => {
        const productDiv = createProductElement(product, cartItems);
        categoryDiv.appendChild(productDiv);
    });
}

// Update product counters with session cart
async function updateProductCounters() {
    const cartItems = await fetchCart();
    const products = document.querySelectorAll('.proizvod');
    products.forEach(product => {
        const productName = product.querySelector('.name').textContent;
        const counter = product.querySelector('.product-counter');
        const cartItem = cartItems.find(item => item.name === productName);
        if (counter) {
            if (cartItem) {
                counter.textContent = cartItem.quantity;
                counter.style.display = 'flex';
            } else {
                counter.textContent = '';
                counter.style.display = 'none';
            }
        }
    });
}

// Update cart icon/count
async function updateCart() {
    const cartItems = await fetchCart();
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (totalItems > 0) {
        document.documentElement.style.setProperty("--show-cart", 1);
        document.documentElement.style.setProperty("--cart-count", `"${totalItems}"`);
    } else {
        document.documentElement.style.setProperty("--show-cart", 0);
        document.documentElement.style.setProperty("--cart-count", `"0"`);
    }
}

// On load, update everything
window.addEventListener('load', async () => {
    data = await getData();
    await updateProductDisplay();
    await updateCart();
    await updateProductCounters();
});

document.addEventListener('visibilitychange', async () => {
    if (!document.hidden) {
        await updateCart();
        await updateProductCounters();
    }
});

// Category switching
const odabir = document.getElementById("odabir");
const elementiKat = document.querySelectorAll(".item");
elementiKat.forEach(item => {
    item.addEventListener("click", async function() {
        selectedCategory.innerHTML = item.innerHTML;
        elementiKat.forEach(stil => { stil.style.color = "#0d1b2a" });
        item.style.color = "red";
        const proizvodi = data.categories.find(categor => categor.name === selectedCategory.innerHTML);
        odabir.innerHTML = item.innerHTML;
        categoryDiv.innerHTML = "";
        const cartItems = await fetchCart();
        proizvodi.products.forEach(product => {
            const productDiv = createProductElement(product, cartItems);
            categoryDiv.appendChild(productDiv);
        });
        await updateProductCounters();
    });
});






































































































































































































