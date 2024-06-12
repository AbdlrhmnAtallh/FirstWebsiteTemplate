// caeousel section 
const carouselContainer = document.querySelector('.carouselContainer');
const carouselItems = document.querySelectorAll('.carouselItem');
let currentIndex = 0;

function showNextImage() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(showNextImage, 3000); // Change image every 3 seconds



  
  