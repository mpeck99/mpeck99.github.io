// ------------------------------------------------
// Set active page in nav
// ------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body');

  if (!body.classList.contains('transition')) {
    body.classList.add('transition');
  } else {
    body.classList.remove('transition');
  }
});

if (document.querySelector('.main-nav')) {
  const path = location.pathname.split('/');
  const href = path[1];

  const navLink = document.querySelectorAll('.nav-link');
  for (var i = 0; i < navLink.length; i++) {
    if (navLink[i].getAttribute('href') === href) {
      navLink[i].classList.add('active');
    } else if (
      href === '' &&
      navLink[i].getAttribute('href') === 'index.html'
    ) {
      navLink[i].classList.add('active');
    }
  }
}

// ------------------------------------------------
// Image zoom
// ------------------------------------------------
if (document.querySelector('.gallery-wrapper')) {
  const img = document.querySelectorAll('.card-image');
  img.forEach((singleImg) => {
    singleImg.classList.remove('zoom');
    singleImg.addEventListener('click', (event) => {
      if (singleImg.classList.contains('zoom')) {
        singleImg.classList.remove('zoom');
      } else {
        for (var i = 0; i < img.length; i++) {
          if (img[i].classList.contains('zoom')) {
            img[i].classList.remove('zoom');
          }
        }
        singleImg.classList.add('zoom');
      }
    });
  });
}

// Menu open / close 
if(document.querySelector('.hamburger-menu')){
  const menu = document.querySelector('.hamburger-menu'),
        navList = document.querySelector('.main-nav');

  menu.addEventListener('click', function(){
      if(navList.classList.contains('js-toggle')){ 
        navList.classList.add('js-close');
        menu.classList.add('js-close');
        navList.classList.remove('js-toggle'); 
        menu.classList.remove('js-toggle');
      } else {
        navList.classList.add('js-toggle');
        menu.classList.add('js-toggle') 
      }

      if(navList.classList.contains('js-close')){
        setTimeout(() => {
          navList.classList.remove('js-close');
          menu.classList.remove('js-close');
        }, 1000);
      }
  });
}
