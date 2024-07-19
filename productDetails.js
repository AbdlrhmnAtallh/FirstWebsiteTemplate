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
         // Image in large size 
         document.getElementById('featured-image').src = `images/${product.ImagePath1}`;
        
         // Images in small size
         const smallImagesContainer = document.querySelector('.small-Card');
         
         // Clear any existing small images
         smallImagesContainer.innerHTML = '';
         
         // Array of small image paths
         const smallImagePaths = [
             product.ImagePath1,
             product.ImagePath2,
             product.ImagePath3,
             product.ImagePath4
         ];
         
         // Iterate over small image paths and add non-null images
         smallImagePaths.forEach(imagePath => {
             if (imagePath) { // Check if imagePath is not null or undefined
                 const imgElement = document.createElement('img');
                 imgElement.src = `images/${imagePath}`;
                 imgElement.alt = 'image not found';
                 imgElement.className = 'small-Img';
                 smallImagesContainer.appendChild(imgElement);
             }
         });
 
         // Get references to the small images
         let smallImgs = document.getElementsByClassName('small-Img');
         
         // Function to handle click events on small images
         function handleSmallImgClick(event) {
             // Update the featured image source
             document.getElementById('featured-image').src = event.target.src;
 
             // Remove the 'sm-card' class from all small images
             for (let img of smallImgs) {
                 img.classList.remove('sm-card');
             }
 
             // Add the 'sm-card' class to the clicked small image
             event.target.classList.add('sm-card');
         }
 
         // Add click event listeners to all small images
         for (let img of smallImgs) {
             img.addEventListener('click', handleSmallImgClick);
         }

        // product name and price 
        document.querySelector('.product-info h3').textContent = product.Name;
        document.querySelector('.product-info h5').innerHTML = `${product.Price} ج.م`;
        // First and second description 
        document.querySelector('.product-info p.description-main').textContent = product.Description;
        displayDescriptions(product.dd);

        
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
   
// Function to display descriptions
function displayDescriptions(descriptions) {
    const container = document.getElementById('description-container');
    if (container) {
        descriptions.forEach(description => {
            const p = document.createElement('p');
            const span = document.createElement('span');
            const dotDiv = document.createElement('div');
            dotDiv.className = 'dot';
            const textNode = document.createTextNode(description);
            span.appendChild(dotDiv);
            span.appendChild(textNode);
            p.appendChild(span);
            container.appendChild(p);
        });
    }
}


// productService.js
export async function getRelatedProducts(productid) {
    try {
      // Fetch the products from the JSON file
      const response = await fetch('products.json');
      const products = await response.json();
  
      // Find the product with the given ID
      const product = products.find(p => p.id === productid);
  
      if (!product) {
        throw new Error('Product not found');
      }
  
      // Filter the products to get the related ones
      const relatedProducts = products.filter(p => product.relatedProducts.includes(p.id));
  
      return relatedProducts;
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
}
  
import {displayProducts} from './site'

displayProducts(getRelatedProducts(productId));