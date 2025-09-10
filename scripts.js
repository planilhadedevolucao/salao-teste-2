// Preloader
window.addEventListener('load', function() { 
    const preload = document.getElementById('preload'); 
    const body = document.getElementById('body'); 
     

    // Hide preloader and show content 
    this.setTimeout(() => {
        
    preload.style.display = 'none'; // Hide preloader
    body.style.display = 'block';  // Show content
    }, 2000);
}); 


// Card slider
new Swiper('.card-wrapper', {
    loop: true,
    spaceBetween: 5,

    // Pagination bullets
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 3
        }
    }
});

