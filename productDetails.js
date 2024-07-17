// Extract the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to fetch product data by ID
function fetchProductById(id) {
    return fetch('products.json')
        .then(response => response.json())
        .then(products => products.find(product => product.Id == id));
}

// Display product data on the page
function displayProduct(product) {
    if (product) {
        document.getElementById('featured-image').src = `images/${product.ImagePath1}`;
        document.querySelector('.product-info h3').textContent = product.Name;
        document.querySelector('.product-info h5').innerHTML = `${product.Price} ج.م`;
        document.querySelector('.product-info p').textContent = product.Description;
        document.innerHTML = `
    <div class="quantity">
        <input type="number" value="1" min="1">
        <button onclick="addToCart(${product.Id})>اضف الي العربة</button>
    </div>
`;
       
        // Additional properties to be displayed can be added here
    } else {
        document.querySelector('.product-container').textContent = 'Product not found';
    }
}

// Fetch and display the product
fetchProductById(productId)
    .then(displayProduct)
    .catch(error => console.error('Error fetching product:', error));     


// Function to add product to cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}
    