// caeousel section 
const carouselContainer = document.querySelector('.carouselContainer');
const carouselItems = document.querySelectorAll('.carouselItem');
let currentIndex = 0;

function showNextImage() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextImage, 3000); // Change image every 3 seconds


// Fetch data from products.json and generate product cards
fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const productsArea = document.getElementById('products-area');
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="images/${product.ImagePath1}" alt="picture not found" style="width:100%">
                <h1>${product.Name}</h1>
                <p class="price">$${product.Price}</p>
                <p>${product.Description}</p>
                <p><button onclick="addToCart(${product.Id})">Add to Cart</button></p>
            `;
            productsArea.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

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
