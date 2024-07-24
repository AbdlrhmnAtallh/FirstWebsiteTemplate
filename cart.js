// document.addEventListener('DOMContentLoaded', function() {
//     const cartContainer = document.querySelector('.cart-page table');
//     const orderNowButton = document.querySelector('.order-btn');
//     const totalPriceElement = document.querySelector('.total-price td:last-child');
//     let cart = JSON.parse(localStorage.getItem('cart')) || [];

//     function displayCart() {
//         if (cart.length === 0) {
//             cartContainer.innerHTML = `
//                 <tr>
//                     <td colspan="3" style="text-align:center;">عربة التسوق فارغة.</td>
//                 </tr>
//             `;
//             orderNowButton.style.display = 'none';
//             totalPriceElement.textContent = '0 ج.م';
//             return;
//         }

//         let cartContent = `
//             <tr>
//                 <th>العنصر</th>
//                 <th>الكمية</th>
//                 <th>السعر الكلي</th>
//             </tr>
//         `;
//         let totalPrice = 0;

//         cart.forEach((item, index) => {
//             const itemTotalPrice = item.price * item.quantity;
//             totalPrice += itemTotalPrice;

//             cartContent += `
//                 <tr>
//                     <td>
//                         <div class="cart-info">
//                             <img src="${item.ImagePath1}" alt="${item.Name}">
//                             <div>
//                                 <p>${item.Name}</p>
//                                 <small>السعر : ${item.Price}</small>
//                                 <br>
//                                 <a href="#" class="remove-button" data-index="${index}">حذف</a>
//                             </div>
//                         </div>
//                     </td>
//                     <td><input type="number" min="1" value="${item.Price}" data-index="${index}" class="quantity-input"></td>
//                     <td>${itemTotalPrice} ج.م</td>
//                 </tr>
//             `;
//         });

//         cartContainer.innerHTML = cartContent;
//         totalPriceElement.textContent = `${totalPrice} ج.م`;

//         // Add event listeners for quantity change and remove buttons
//         document.querySelectorAll('.quantity-input').forEach(input => {
//             input.addEventListener('change', updateQuantity);
//         });

//         document.querySelectorAll('.remove-button').forEach(button => {
//             button.addEventListener('click', removeProduct);
//         });
//     }

//     function updateQuantity(event) {
//         const index = event.target.getAttribute('data-index');
//         const newQuantity = parseInt(event.target.value);
//         if (newQuantity > 0) {
//             cart[index].quantity = newQuantity;
//             localStorage.setItem('cart', JSON.stringify(cart));
//         }
//         displayCart();
//     }

//     function removeProduct(event) {
//         const index = event.target.getAttribute('data-index');
//         cart.splice(index, 1);
//         localStorage.setItem('cart', JSON.stringify(cart));
//         displayCart();
//     }

//     function sendOrderWhatsApp() {
//         let phoneNumber = "+201064845771";
//         let message = "Here is my order:\n\n";

//         cart.forEach(item => {
//             message += `Product ID: ${item.id}, Quantity: ${item.quantity}\n`;
//         });

//         message += "\nThank you!";

//         let whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
//         window.location.href = whatsappLink;
//     }

//     orderNowButton.addEventListener('click', function() {
//         sendOrderWhatsApp();
//     });

//     displayCart();
// });


function ll() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  console.log(cart.length);
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].Id);
    console.log(cart[i].Name);
    console.log(cart[i].Price);
    //console.log(cart[i].quantity);
  }
}

// function loadCart() {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const cartTable = document.getElementById('cart-table');
//   let totalPrice = 0;

//   cart.forEach(product => {
//     const totalProductPrice = product.Price * product.quantity;
//     totalPrice += totalProductPrice;

//     const row = document.createElement('tr');

//     row.innerHTML = `
//         <td>
//           <div class="cart-info">
//             <img src="images/${product.ImagePath1}" alt="Product Image">
//             <div>
//               <p>${product.Name}</p>
//               <small>Price: $${product.Price}</small>
//               <br>
//               <a href="#" onclick="removeFromCart('${product.Id}')">Remove</a>
//             </div>
//           </div>
//         </td>
//         <td><input type="number" value="${product.quantity}" min="1" onchange=""></td>
//         <td>$${totalProductPrice}</td>
//       `;

//     cartTable.appendChild(row);
//   });

//   document.getElementById('total-price').innerText = `$${totalPrice}`;
// }


// function loadCart() {
//   const cart = JSON.parse(localStorage.getItem('cart')) || [];
//   const cartTable = document.getElementById('cart-table');
//   let totalPrice = 0;

//   cart.forEach(product => {
//     const totalProductPrice = product.Price * product.quantity;
//     totalPrice += totalProductPrice;

//     const row = document.createElement('tr');

//     row.innerHTML = `
//       <td>
//         <div class="cart-info">
//           <img src="images/${product.ImagePath1}" alt="Product Image">
//           <div>
//             <p>${product.Name}</p>
//             <small>Price: $${product.Price}</small>
//             <br>
//             <a href="#" onclick="removeFromCart('${product.Id}')">Remove</a>
//           </div>
//         </div>
//       </td>
//       <td><input type="number" value="${product.quantity}" min="1" onchange="updateQuantity('${product.Id}', this.value)"></td>
//       <td id="product-total-${product.Id}">$${totalProductPrice}</td>
//     `;

//     cartTable.appendChild(row);
//   });

//   document.getElementById('total-price').innerText = `$${totalPrice}`;
// }


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
    emptyCartMessage.style.display = 'block'; // Show empty cart message
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
  const phoneNumber = "+101064845771";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // Open WhatsApp with the message
  window.open(whatsappUrl, '_blank');
}
