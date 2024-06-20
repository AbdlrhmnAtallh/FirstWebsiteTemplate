document.addEventListener('DOMContentLoaded', function() {
    const cartContainer = document.getElementById('cart-container');
    const orderNowButton = document.getElementById('order-now');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function displayCart() {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            orderNowButton.style.display = 'none';
            return;
        }

        let cartContent = '<ul>';
        cart.forEach((item, index) => {
            cartContent += `
                <li>
                    Product ID: ${item.id}, Quantity: 
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
                    <button class="remove-button" data-index="${index}">Remove</button>
                </li>
            `;
        });
        cartContent += '</ul>';

        cartContainer.innerHTML = cartContent;

        // Add event listeners for quantity change and remove buttons
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', updateQuantity);
        });

        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', removeProduct);
        });
    }

    function updateQuantity(event) {
        const index = event.target.getAttribute('data-index');
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        displayCart();
    }

    function removeProduct(event) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }

    function sendOrderWhatsApp() {
        let phoneNumber = "+201064845771"; 
        let message = "Here is my order:\n\n";

        cart.forEach(item => {
            message += `Product ID: ${item.id}, Quantity: ${item.quantity}\n`;
        });

        message += "\nThank you!";

        let whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappLink;
    }

    orderNowButton.addEventListener('click', function() {
        sendOrderWhatsApp();
    });

    displayCart();
});

