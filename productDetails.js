// Extract the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const relatedProductsContainer = document.getElementById("related-products-container");

// Fetch the products data and return it
let allProducts = [];
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        allProducts = products;
        return fetchProductById(productId);
    })
    .then(product => {
        displayProduct(product);
    });

// Function to fetch product data by ID
function fetchProductById(id) {
    return allProducts.find(product => product.Id == id);
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

        // Display related products
        if (product.relatedproducts && product.relatedproducts.length > 0) {
            product.relatedproducts.forEach(relatedId => {
                const relatedProduct = allProducts.find(p => p.Id === relatedId);
                if (relatedProduct) {
                    const relatedProductDiv = document.createElement('div');
                    relatedProductDiv.classList.add('related-product-item');
                    relatedProductDiv.innerHTML = `
                    <div class="card">
                    <div class="child-card">
                        <a href="productDetails.html?id=${relatedProduct.Id}" class="img-link">
                            <img src="images/${relatedProduct.ImagePath1}" alt="${relatedProduct.Name}">
                        </a>
                        <a href="">
                            <h3>${relatedProduct.Name}</h3>
                        </a>
                        <p class="price">${relatedProduct.Price} ج.م</p>
                        <p class="end-card">
                            <button onclick="addToCart(${relatedProduct.Id})">
                                <svg class="cart-left" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
                                </svg>
                                <span>أضف الي السلة</span>
                            </button>
                            <!--Heart-->
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="heart">
                                <path
                                    d="M12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM8.96173 18.9109L8.49742 19.4999L8.96173 18.9109ZM15.0383 18.9109L14.574 18.3219L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.4013 4.32942 12 6.6799C14.5987 4.32942 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371C21.25 10.4582 20.4046 11.5531 19.2094 11.8125C18.9387 11.8822 18.6817 11.9841 18.4375 12.1162L18.0287 12.375C17.7015 12.5526 17.2933 12.5633 16.9896 12.3708L16.7932 12.24C16.662 12.1682 16.5357 12.1174 16.4179 12.0988L16.2411 12.0711C15.7616 12.0057 15.4733 11.4997 15.6704 11.0838C15.7155 11.0056 15.7545 10.9247 15.7857 10.8419C15.9348 10.4939 15.8805 10.1053 15.7076 9.86234L15.2655 9.40115L15.5104 9.18814C15.8541 8.84956 15.8218 8.39364 15.4704 8.03034L13.4698 8.03034ZM13.4677 8.05308L14.0212 8.57086L14.021 8.57069L13.4677 8.05308ZM14.1615 8.74774L13.4698 8.03034L14.021 8.57086L14.1615 8.74774ZM16.9896 12.3708L17.4821 12.8235L17.482 12.8234L16.9896 12.3708ZM13.7428 16.3396L13.5154 16.9085L13.2424 16.6441L13.4698 16.7397L13.7428 16.3396ZM15.0383 18.9109C15.0586 18.9391 15.0806 18.968 15.104 18.9937L15.0383 18.9109ZM13.4698 16.7397L13.2424 16.6441L13.5154 16.9085L13.4698 16.7397ZM16.1416 12.1162C15.5359 11.5077 14.5161 11.4296 14.0258 11.9188L14.0212 11.9236C13.5671 12.3772 13.3167 12.9232 13.4235 13.5002L13.4698 13.4998L13.4698 13.5002L13.4796 13.4378L13.4698 13.5002L13.4235 13.5002C13.5477 13.6865 13.7532 13.843 14.0148 13.9682L14.566 14.1936L14.5358 14.1641C14.9303 13.9035 15.4384 13.8804 15.9306 14.3756L16.1416 14.0498L16.1416 12.1162ZM12 6.50062L12.5304 6.96948L12 6.50062ZM9.12132 13.5264L8.71697 13.1111C8.52491 12.9024 8.27404 12.7399 8.00532 12.7399L7.25 13.4999L6.99027 13.0734L6.69382 12.7376L6.5124 12.7895L6.69382 13.1441L7.25 13.4999L8.00532 12.7399C8.27404 12.7399 8.52491 12.9024 8.71697 13.1111L9.12132 13.5264ZM9.12132 13.5264L8.71697 13.1111L8.00532 12.7399L7.25 13.4999L6.69382 13.1441L6.5124 12.7895L6.69382 12.7376L7.25 13.4999C7.73916 13.0662 8.27404 12.7362 8.71697 12.7376L9.12132 13.5264ZM6.4826 13.5018L6.69382 12.7376L6.4826 13.5018ZM7.46677 12.1851L8.0471 12.6917C8.3915 12.921 8.76059 12.7371 8.66667 12.3362C8.53927 12.0045 8.62288 11.664 8.8666 11.4763L9.12132 11.3097L9.3298 11.4781C9.23617 11.2474 9.18659 10.9935 9.17968 10.7396L8.38098 10.2576L8.04741 10.5069C7.78417 10.6187 7.56323 10.792 7.40788 11.0098C7.25577 11.2237 7.34156 11.4686 7.54528 11.7104L7.9853 12.1671L7.98635 12.1675L8.06689 12.0616L8.0283 12.0173L8.00034 11.9865L8.04741 12.6917L8.8666 11.4763C8.85456 11.4704 8.8487 11.4585 8.8355 11.4566C8.83447 11.4571 8.83557 11.4586 8.8295 11.4593L7.96603 11.2423C7.78257 11.1295 7.53593 11.2172 7.27473 11.3128L6.81382 11.7205C6.37353 12.0296 6.433 12.7614 6.81147 13.0743L7.52986 13.5018L7.46677 12.1851ZM7.46677 12.1851C6.62719 11.5503 6.21871 11.0812 6.4826 10.5467L6.81382 11.7205L6.98058 12.1184C7.2351 12.0958 7.5283 12.0392 7.73572 12.0227L7.74145 12.0236L7.73572 12.0227L7.46677 12.1851Z"/>
                            </svg>
                        </p>
                    </div>
                    </div>
                    `;
                    relatedProductsContainer.appendChild(relatedProductDiv);
                }
            });
        } else {
            relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
        }
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




//GET RELATED PRODUCTS 
// export async function getRelatedProducts(productid) {
//     try {
//       // Fetch the products from the JSON file
//       const response = await fetch('products.json');
//       const products = await response.json();
  
//       // Find the product with the given ID
//       const product = products.find(p => p.id === productid);
  
//       if (!product) {
//         throw new Error('Product not found');
//       }
  
//       // Filter the products to get the related ones
//       const relatedProducts = products.filter(p => product.relatedProducts.includes(p.id));
  
//       return relatedProducts;
//     } catch (error) {
//       console.error('Error fetching related products:', error);
//       return [];
//     }
// }

// import {createProductCard} from './site'

// //displayProducts(getRelatedProducts(productId));

// function displayProducts(products) {
//     const productsArea = document.querySelector('.products-area-from-details-page');
//     productsArea.innerHTML = products.map(product => createProductCard(product)).join('');
// }