// --- SESSION-BASED CART LOGIC ---
// This script now only handles cart actions and reloads the page after changes.

async function removeItem(id) {
    await fetch(`/cart/removeAll/${id}`);
    location.reload();
}

async function emptyCart() {
    await fetch('/cart/empty');
    location.reload();
}

async function updateQuantity(id, change) {
    if (change > 0) {
        await fetch(`/cart/add/${id}`,{method: "POST"});
    } else {
        await fetch(`/cart/remove/${id}`,{method: "DELETE"});
    }
    location.reload();
}

function refresh(){
    // For debugging
}
// No DOM rendering here; EJS handles all cart item display.