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

var movieArray = [];
const movieWrapper = document.querySelector('.movie-wrapper');
if(movieWrapper){
  const googleUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1nXRZYrOnedMOvioQJxbIQKTpc9_XCGI23-KMk8jwZQU/values/Movies!A:D?key=AIzaSyDrWhgTrY_NIQ7pa19SpdYtF0Wcom3stDA';
  fetch(googleUrl).then(response=>{
      response.json().then(json =>{
          const movies = json;
          for(var i = 0; i < movies.values.length; i++){
               const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e444034c3d7ef62e63059e6e8ac5b828&query='+movies.values[i][0]+'&year='+movies.values[i][1]+'&language=en-US&include_adult=false';
              fetch(apiUrl).then(response => {
                  response.json().then(movie => {
                     for(var i = 0; i <movie.results.length; i++){
                         let  title = movie.results[i].title,
                              year = movie.results[i].release_date.split('-')[0];
                            movieArray.push({title:title,year:year,id: movie.results[i].id,poster:'https://image.tmdb.org/t/p/original/'+movie.results[i].poster_path});
                            break;
                     }                      
                  }).catch(error => {
                    console.error('we came across an error', error);
                  })
              });
          } 
      })
  }).catch(err=>{
    console.error('There was an issue with the resquest', err);
  });
}

setTimeout(function(){
  
  for(var x=0; x<movieArray.length; x++){
    const getUrl = 'https://api.themoviedb.org/3/movie/'+movieArray[x].id+'?api_key=e444034c3d7ef62e63059e6e8ac5b828&language=en-US'
    
    fetch(getUrl).then(response => {
      response.json().then(movie => {
        let overview ='';
        if(movie.overview.length >= 325){
          overview = movie.overview.substring(0,325)+'<a href="https://www.themoviedb.org/movie/'+movie.id+'-'+movie.title+'" target="_blank" class="read-more" aria-label="Read more about'+movie.title+'">...read more</a>';
        }
        else {
            overview = movie.overview;
        }
        const vote = (movie.vote_average*10);
        movieWrapper.innerHTML += '<div class="card" onclick="this.focus()" style="background-image: url(\'https://image.tmdb.org/t/p/original/'+movie.poster_path+'\');"><div class="details"><h2 id='+movie.title.replace(/\s+/g, '-')+'>'+movie.title+'</h2><span class="score">'+vote+'%</span><p class="tagline">'+movie.tagline+'</p><p class="date">'+movie.release_date.split('-')[0]+'</p><p class="genre">'+movie.genres[0].name+', '+movie.genres[1].name+'</p><p class="overview">'+overview+'</p></div></div>'
      // break;                     
      }).catch(error => {
        console.error('we came across an error', error);
      })
  });
  }
  
},500);




