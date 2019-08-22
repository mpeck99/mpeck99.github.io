// ------------------------------------------------
// Set active page in nav
// ------------------------------------------------
document.addEventListener('DOMContentLoaded', function(){
  const body = document.querySelector('body');

  if(!body.classList.contains('transition')){
    body.classList.add('transition');
  }
  else {
    body.classList.remove('transition');
  }
});

if (document.querySelector('.main-nav')) {
  const path = location.pathname.split('/');
  const href = path[1];

  const navLink = document.querySelectorAll('.nav-link');
  for(var i=0; i<navLink.length; i++){
    if(navLink[i].getAttribute('href') === href){
       navLink[i].classList.add('active');
    }
    else if (href === '' && navLink[i].getAttribute('href') === 'index.html') {
      navLink[i].classList.add('active');
    }
  }
  
}