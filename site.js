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
                <img src="${product.ImagePath1}" alt="picture not found" style="width:100%">
                <h1>${product.Name}</h1>
                <p class="price">$${product.Price}</p>
                <p>${product.Description}</p>
                <p><button>Add to Cart</button></p>
            `;
            
            productsArea.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

  
  