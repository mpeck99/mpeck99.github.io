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
        navList = document.querySelector('.main-nav'),
        body = document.querySelector('body');

  menu.addEventListener('click', function(){
      if(navList.classList.contains('js-open')){ ;
        menu.classList.add('js-close');
        navList.classList.add('js-close');
        setTimeout(() => {
          navList.classList.remove('js-open'); 
          menu.classList.remove('js-open')
          menu.classList.remove('js-close');
          navList.classList.remove('js-close');
          body.classList.remove('js-open');
           
        }, 500);
      } else {
        navList.classList.add('js-open');
        body.classList.add('js-open');
        menu.classList.add('js-open');
      }
  });
}

const movieArray = [];
const movieWrapper = document.querySelector('.movie-wrapper');
function personalMovies() {
    const googleUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1nXRZYrOnedMOvioQJxbIQKTpc9_XCGI23-KMk8jwZQU/values/Movies!A:D?key=AIzaSyDrWhgTrY_NIQ7pa19SpdYtF0Wcom3stDA';
    fetch(googleUrl).then(response=>{
        response.json().then(json =>{
            const movies = json;
            for(var i = 0; i < movies.values.length; i++){
                 const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e444034c3d7ef62e63059e6e8ac5b828&query='+movies.values[i][0]+'&year='+movies.values[i][1]+'&language=en-US&include_adult=false';
                fetch(apiUrl).then(response => {
                    response.json().then(movie => {
                       for(var i = 0; i <movie.results.length; i++){
                           let overview = '',
                                 title = movie.results[i].title,
                                 year = movie.results[i].release_date.split('-')[0];


                           if(movie.results[i].overview.length >= 400){
                               overview = movie.results[i].overview.substring(0,380)+'...';
                           }
                           else {
                               overview = movie.results[i].overview;
                           }

                            movieWrapper.innerHTML+= '<div class="card"><img src="https://image.tmdb.org/t/p/w500/'+ movie.results[i].poster_path + '" alt="'+title+' movie poster"/><div class="details"><h2>'+ title+'</h2><p class="date">'+year+'</p><p class="overview">'+overview+'</p><a href="https://www.themoviedb.org/movie/'+movie.results[i].id+'-'+title+'" target="_blank" class="read-more" aria-label="Read more about'+title+'">Read more</a></div></div>'
                           break;
                       } 
                       
                    });
                });
            } 
        });
    });   
}

if(movieWrapper){
   personalMovies(); 

   const movieCard = document.querySelectorAll('.card') ;
   
}


// console.log(movieArray);