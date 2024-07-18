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
        // image in large size 
        document.getElementById('featured-image').src = `images/${product.ImagePath1}`;
        // images in small size
        const smallImages = document.querySelectorAll('.small-Img');
        smallImages[0].src = `images/${product.ImagePath2}`;
        smallImages[1].src = `images/${product.ImagePath3}`;
        smallImages[2].src = `images/${product.ImagePath4}`;
        smallImages[3].src = `images/${product.ImagePath5}`;
        // product name and price 
        document.querySelector('.product-info h3').textContent = product.Name;
        document.querySelector('.product-info h5').innerHTML = `${product.Price} ج.م`;
        // first and second description 
        document.querySelector('.product-info p').textContent = product.Description;
        //document.querySelector('.product-info p').textContent = `<div class = "dot">${product.Description2}</div>`;
        
        // Create the quantity div and its contents
        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'quantity';
        
        const inputElement = document.createElement('input');
        inputElement.type = 'number';
        inputElement.value = 1;
        inputElement.min = 1;
        
        const buttonElement = document.createElement('button');
        buttonElement.textContent = 'اضف الي العربة';
        buttonElement.setAttribute('onclick', `addToCart(${product.Id})`);
        
        quantityDiv.appendChild(inputElement);
        quantityDiv.appendChild(buttonElement);
        
        // Append the quantity div to wherever you want it in the document
        // For example, assuming there's a container with class 'product-info'
        document.querySelector('.product-info').appendChild(quantityDiv);
           
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
    