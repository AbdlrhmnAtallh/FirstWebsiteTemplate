     // Get product ID from URL
     const urlParams = new URLSearchParams(window.location.search);
     const productId = urlParams.get('id');
     const product = data.find(p => p.Id == productId);
    
    // Fetch product data and display it on the page
    fetch('products.json')
      .then(response => response.json())
      .then(data => displayProductDetails(product)) // Assuming you are displaying the first product for now
      .catch(error => console.error('Error fetching product:', error));

    function displayProductDetails(product) {
      document.getElementById('featured-image').src = `images/${product.ImagePath1}`;
      document.getElementById('product-name').textContent = product.Name;
      document.getElementById('product-price').innerHTML = `${product.Price} بدلا من <del>200</del>`;
      document.getElementById('product-description').textContent = product.Description;

      const specs = `
        <span>
          <span class="dot"></span><strong>اللون</strong> : ${product.Color} <br>
          <span class="dot"></span><strong>الذاكرة</strong> : ${product.Memory} <br>
          <span class="dot"></span><strong>الكاميرا</strong> : ${product.Camera} <br>
          <span class="dot"></span><strong>البطارية</strong> : ${product.Battery} <br>
          <span class="dot"></span><strong>المعالج</strong> : ${product.Processor} <br>
        </span>
      `;
      document.getElementById('product-specs').innerHTML = specs;

      const smallImagesContainer = document.getElementById('small-images');
      smallImagesContainer.innerHTML = product.Images.map(image => `<img src="images/${image}" alt="" class="small-Img">`).join('');

      const smallImgs = document.querySelectorAll('.small-Img');
      smallImgs.forEach((img, index) => {
        img.addEventListener('click', () => {
          document.getElementById('featured-image').src = img.src;
          smallImgs.forEach(img => img.classList.remove('sm-card'));
          img.classList.add('sm-card');
        });
      });

      document.getElementById('add-to-cart-button').addEventListener('click', () => addToCart(product.Id));
    }

    function addToCart(productId) {
      // Add the product to the cart (localStorage in this case)
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Product added to cart!');
    }
  

    // DROPDOWN LIST
    const toggleBtn = document.querySelector('.toggle_btn');
    const toggleBtnIcon = document.querySelector('.toggle_btn i');
    const dropDownMenu = document.querySelector('.dropdown_menu');

    toggleBtn.onclick = function () {
      dropDownMenu.classList.toggle('open');
      const isOpen = dropDownMenu.classList.contains('open');

      toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars';
    };