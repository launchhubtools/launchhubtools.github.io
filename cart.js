// Cart management functions

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        alert('This tool is already in your cart!');
        return;
    }
    
    cart.push({ id, name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart!`);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.length;
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = count;
    });
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalDiv = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="index.html">Browse our tools</a></p>';
        cartTotalDiv.innerHTML = '';
        const btn = document.getElementById('checkoutBtn');
        if (btn) btn.style.display = 'none';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toLocaleString()}</p>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        total += item.price;
    });
    
    cartItemsDiv.innerHTML = html;
    cartTotalDiv.innerHTML = `
        <div class="cart-total-summary">
            <h2>Total: $${total.toLocaleString()}</h2>
        </div>
    `;
    const btn = document.getElementById('checkoutBtn');
    if (btn) btn.style.display = 'block';
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCount();
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
}

// Update cart count on page load
updateCartCount();
