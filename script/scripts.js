// Preloader
window.addEventListener("pageshow", (event) => {
  const preloader = document.getElementById("preloader");
  const body = document.getElementById("body");

  if (document.referrer && document.referrer.includes(window.location.origin)) {
    preloader.style.display = "none";
    body.style.display = "block";
  } else {
    setTimeout(() => {
      preloader.style.display = "none";
      body.style.display = "block";
    }, 2000);
  }
});

  

    


// Card slider
new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 5,

  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

 const imagens = document.querySelectorAll('.galeria img');
    const modal = document.getElementById('modal');
    const imagemModal = document.getElementById('imagemModal');
    const fecharBtn = document.getElementById('fechar');

    imagens.forEach(imagem => {
      imagem.addEventListener('click', () => {
        imagemModal.src = imagem.src;
        modal.style.display = 'flex';
      });
    });

    // Fecha o modal ao clicar no botão "x"
    fecharBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Também fecha se clicar fora da imagem
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
