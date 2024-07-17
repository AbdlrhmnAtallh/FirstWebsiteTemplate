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
        // Additional properties to be displayed can be added here
    } else {
        document.querySelector('.product-container').textContent = 'Product not found';
    }
}

// Fetch and display the product
fetchProductById(productId)
    .then(displayProduct)
    .catch(error => console.error('Error fetching product:', error));     