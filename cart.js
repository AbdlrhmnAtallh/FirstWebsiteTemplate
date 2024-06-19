document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    const orderNowButton = document.getElementById('order-now');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        orderNowButton.style.display = 'none';
        return;
    }

    let cartContent = '<ul>';
    cart.forEach(item => {
        cartContent += `<li>Product ID: ${item.id}, Quantity: ${item.quantity}</li>`;
    });
    cartContent += '</ul>';

    cartContainer.innerHTML = cartContent;

    orderNowButton.addEventListener('click', function() {
        sendOrderWhatsApp(cart);
    });
});

function sendOrderWhatsApp(cart) {
    let phoneNumber = "+201064845771";  // Replace with your WhatsApp number
    let message = "Here is my order:\n\n";

    cart.forEach(item => {
        message += `Product ID: ${item.id}, Quantity: ${item.quantity}\n`;
    });

    message += "\nThank you!";

    let whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappLink;
}
