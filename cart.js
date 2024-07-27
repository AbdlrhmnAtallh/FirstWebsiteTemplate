function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTable = document.getElementById('cart-table');
  const totalPriceElement = document.getElementById('total-price');
  const emptyCartMessage = document.getElementById('empty-cart-message');
  const totalpricediv = document.getElementById('totalprice-hide');
  const orderbtn = document.getElementById('orderbtn');
  let totalPrice = 0;

  // Clear any existing content
  cartTable.innerHTML = `
      <tr>
          <th>العنصر</th>
          <th>الكمية</th>
          <th>السعر الكلي</th>
      </tr>
  `;
  emptyCartMessage.style.display = 'none'; // Hide empty cart message
  if (cart.length === 0) {
    emptyCartMessage.style.display = 'flex'; // Show empty cart message
    cartTable.style.display = 'none';
    totalpricediv.style.display = 'none';
    orderbtn.style.display = 'none';

  } else {
    cart.forEach(product => {
      const totalProductPrice = product.Price * product.quantity;
      totalPrice += totalProductPrice;

      const row = document.createElement('tr');
      row.innerHTML = `
              <td>
                <div class="cart-info">
                  <img src="images/${product.ImagePath1}" alt="Product Image">
                  <div>
                    <p>${product.Name}</p>
                    <small>Price: $${product.Price}</small>
                    <br>
                    <a href="#" onclick="removeFromCart('${product.Id}')">Remove</a>
                  </div>
                </div>
              </td>
              <td><input type="number" value="${product.quantity}" min="1" onchange="updateQuantity('${product.Id}', this.value)"></td>
              <td id="product-total-${product.Id}">$${totalProductPrice}</td>
          `;

      cartTable.appendChild(row);
    });

    totalPriceElement.innerText = `$${totalPrice}`;
  }
}






function updateQuantity(productId, newQuantity) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update the quantity for the specified product
  const product = cart.find(item => item.Id == productId);
  if (product) {
    product.quantity = parseInt(newQuantity);
  }

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  // Recalculate the total product price and update the DOM
  const totalProductPrice = product.Price * product.quantity;
  document.getElementById(`product-total-${productId}`).innerText = `$${totalProductPrice}`;

  // Recalculate the total cart price
  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.Price * item.quantity;
  });
  document.getElementById('total-price').innerText = `$${totalPrice}`;
}



function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Filter out the product with the given productId
  cart = cart.filter(product => product.Id != productId);

  // Update localStorage with the new cart array
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}


window.onload = loadCart;

function sendOrderWhatsApp() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let message = "Order Summary:\n\n";

  cart.forEach(product => {
    message += `${product.Name} - Quantity: ${product.quantity}\n`;
  });
  message += `\nTotal Price: $${document.getElementById('total-price').innerText}`;


  // Replace spaces and line breaks with URL-encoded equivalents
  message = encodeURIComponent(message);

  // Replace with your WhatsApp number
  const phoneNumber = "+201064845771";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Open WhatsApp with the message
  window.open(whatsappUrl, '_blank');
  localStorage.removeItem('cart');
}
