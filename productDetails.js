// Extract the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
let related = [];
let jsonProducts = []; 


function fetchProductById(id) {
    return fetch('products.json')
        .then(response => response.json())
        .then(products => {
            related = products; // Assign all products to the related array
            jsonProducts = products;
            return products.find(product => product.Id == id); // Return the product by ID
        });
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

           
        let matchedRelated = [];
        for (let i = 0; i < product.relatedproducts.length; i++) { // length = n
            for (let j = 0; j < related.length; j++) { // length = n+1
                if (product.relatedproducts[i] == related[j].Id) {
                    matchedRelated.push(related[j])
                  break;
                }
            }
        }

        diplayRelatedProducts(matchedRelated);

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
        
    } else {
        document.querySelector('.product-container').textContent = 'Product not found';
    }
}



// Fetch and display the product
fetchProductById(productId)
    .then(displayProduct)
    .catch(error => console.error('Error fetching product:', error));


// Function to add product to cart
function addToCart(id) {
    // Retrieve the cart from localStorage or initialize it as an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log(cart);
    // Find the product with the given id in the jsonProducts array
    let product = jsonProducts.find(item => item.Id == id);

    // Check if the product was found
    if (product) {
        // Extract product details
        let Id = product.Id;
        let ImagePath1 = product.ImagePath1;
        let Name = product.Name;
        let Price = product.Price;

        // Check if the product is already in the cart
        let cartProduct = cart.find(item => item.Id == Id);

        if (cartProduct) {
            // If the product is already in the cart, increment the quantity
            cartProduct.quantity++;
        } else {
            // If the product is not in the cart, add it with quantity 1
            let quantity = 1;
            const productViewModel = { Id, ImagePath1, Name, Price, quantity };
            cart.push(productViewModel);
        }

        // Save the updated cart array back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Log the cart array and its length for debugging
        console.log(cart);
        console.log(cart.length);
    } else {
        console.error(`Product with Id ${id} not found.`);
    }
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





// Exports method from site.js to display related products 

function createProductCard(product) {
    return `
        <div class="card">
            <div class="child-card">
                <a href="productDetails.html?id=${product.Id}" class="img-link">
                    <img src="images/${product.ImagePath1}" alt="${product.Name}">
                </a>
                <a href="">
                    <h3>${product.Name}</h3>
                </a>
                <p class="price">${product.Price} ج.م</p>
                <p class="end-card">
                    <button onclick="addToCart(${product.Id})">
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
                            d="M12 5.50063L11.4596 6.02073C11.463 6.02421 11.4664 6.02765 11.4698 6.03106L12 5.50063ZM8.96173 18.9109L8.49742 19.4999L8.96173 18.9109ZM15.0383 18.9109L14.574 18.3219L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM13.4698 8.03034C13.7627 8.32318 14.2376 8.32309 14.5304 8.03014C14.8233 7.7372 14.8232 7.26232 14.5302 6.96948L13.4698 8.03034ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55955 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917ZM11.4698 6.03106L13.4698 8.03034L14.5302 6.96948L12.5302 4.97021L11.4698 6.03106Z"
                            fill="#56b0f2" />
                    </svg>

                    <!--Quick View-->
                    <svg fill="#000000" viewBox="-3.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        class="show-svg">
                        <title>view</title>
                        <path
                            d="M12.406 13.844c1.188 0 2.156 0.969 2.156 2.156s-0.969 2.125-2.156 2.125-2.125-0.938-2.125-2.125 0.938-2.156 2.125-2.156zM12.406 8.531c7.063 0 12.156 6.625 12.156 6.625 0.344 0.438 0.344 1.219 0 1.656 0 0-5.094 6.625-12.156 6.625s-12.156-6.625-12.156-6.625c-0.344-0.438-0.344-1.219 0-1.656 0 0 5.094-6.625 12.156-6.625zM12.406 21.344c2.938 0 5.344-2.406 5.344-5.344s-2.406-5.344-5.344-5.344-5.344 2.406-5.344 5.344 2.406 5.344 5.344 5.344z">
                        </path>
                    </svg>
                </p>
            </div>
        </div>
    `;
}

function diplayRelatedProducts(products) { 
    const productsArea = document.querySelector('.products-area');
    productsArea.innerHTML = products.map(product => createProductCard(product)).join('');
}


