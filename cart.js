document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let cartContent = '<ul>';
    cart.forEach(item => {
        cartContent += `<li>Product ID: ${item.id}, Quantity: ${item.quantity}</li>`;
    });
    cartContent += '</ul>';

    cartContainer.innerHTML = cartContent;
});
