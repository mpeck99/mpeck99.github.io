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

function loadMovies(){
  movieWrapper.innerHTML = '';
  setTimeout(function(){
    for(var x=0; x<movieArray.length; x++){
      const getUrl = 'https://api.themoviedb.org/3/movie/'+movieArray[x].id+'?api_key=e444034c3d7ef62e63059e6e8ac5b828&language=en-US';
      const releaseDates = 'https://api.themoviedb.org/3/movie/'+movieArray[x].id+'/release_dates?api_key=e444034c3d7ef62e63059e6e8ac5b828&language=en-US';
      
      fetch(getUrl).then(response => {
        response.json().then(movie => {
          fetch(releaseDates).then(res=> {
            res.json().then(dates => {
              var rating = dates.results.filter(i => i.iso_3166_1 === 'US');
              for(var x = 0; x < rating.length; x++){
              let overview ='';
              if(movie.overview.length >= 325){
                overview = movie.overview.substring(0,325)+'<a href="https://www.themoviedb.org/movie/'+movie.id+'-'+movie.title+'" target="_blank" class="read-more" aria-label="Read more about'+movie.title+'">...read more</a>';
              }
              else {
                  overview = movie.overview;
              }
              const vote = (movie.vote_average)*10;
              const hours = Math.floor(movie.runtime / 60);
              const mins = movie.runtime % 60;
              const cert = '';
              const runtime = hours+'h '+mins+'m';
           
              if(rating[x].release_dates[0].certification != ""  ){
                cert = rating[x].release_dates[0].certification;
              }
              else if(rating[x].release_dates[1].certification != ""){
                cert = rating[x].release_dates[1].certification;
              }
              else if(rating[x].release_dates[2].certification !=""){
                cert = rating[x].release_dates[2].certification;
              }
              else{
                cert = rating[x].release_dates[3].certification;
              }
              // else  {
              //   cert = rating[x].release_dates[0].certification;
              // }
              movieWrapper.innerHTML += '<div class="card" onclick="this.focus()" style="background-image: url(\'https://image.tmdb.org/t/p/original/'+movie.poster_path+'\');"'+movie.id+'><div class="details"><h2>'+movie.title+'</h2><span class="score"><p>'+vote+'%</p></span><p class="tagline">'+movie.tagline+'</p><ul><li>'+cert+'</li><li>'+movie.release_date.split('-')[0]+'</li><li>'+runtime+'</li><li>'+movie.genres[0].name+'</li></ul><p class="overview">'+overview+'</p></div></div>';
                  }
                })
              });

            // break;                     
        }).catch(err => {
          console.error('we came across an error', err);
        })
    });
    }
    
  },1000);
}

if(movieWrapper){
  const googleUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1nXRZYrOnedMOvioQJxbIQKTpc9_XCGI23-KMk8jwZQU/values/Movies!A:D?key=AIzaSyDrWhgTrY_NIQ7pa19SpdYtF0Wcom3stDA';
  fetch(googleUrl).then(response=>{
      response.json().then(json =>{
          const movies = json;
          for(var i = 0; i < movies.values.length; i++){
               const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e444034c3d7ef62e63059e6e8ac5b828&query='+movies.values[i][0].replace(/\s+/g,'-')+'&primary_release_year='+movies.values[i][1]+'&year='+movies.values[i][1]+'&language=en-US&include_adult=false';
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

  function personalSearch(){
    var searchvalue = document.querySelector('#search').value.toLowerCase();
    if(document.querySelector('.error').classList.contains('active')){
      document.querySelector('.error').classList.remove('active');
    }
    if(searchvalue.length == 0 || searchvalue == " "){
      loadMovies();
    } 
    else {
      let movie = movieArray.filter(x => x.title.toLowerCase().replace(/'/g, "") === searchvalue.replace(/'/g,""));
        if(movie.length > 0){
          let overview ='';
          setTimeout(() => {
              for(var i = 0; i <movie.length; i++){
                const searchApi = 'https://api.themoviedb.org/3/movie/'+movie[i].id+'?api_key=e444034c3d7ef62e63059e6e8ac5b828&primary_release_year='+movie[i].year+'&year='+movie[i].year+'&query='+movie[i].title.replace(/\s/g, '-')+'&language=en-US';

                movieWrapper.innerHTML = '';

                fetch(searchApi).then(response=>{
                 response.json().then(json=>{
                   const searchResult = json;

                   if(searchResult.overview.length >= 325){
                     overview = searchResult.overview.substring(0,325)+'<a href="https://www.themoviedb.org/movie/'+searchResult.id+'-'+searchResult.title+'" target="_blank" class="read-more" aria-label="Read more about'+searchResult.title+'">...read more</a>';
                   }
                   else {
                       overview = searchResult.overview;
                   }
         
                     const vote = (searchResult.vote_average)*10;
                     const hours = Math.floor(searchResult.runtime / 60);
                     const mins = searchResult.runtime % 60;
                     const runtime = hours+'h '+mins+'m';
                     
                     movieWrapper.innerHTML += '<div class="card" onclick="this.focus()" style="background-image: url(\'https://image.tmdb.org/t/p/original/'+searchResult.poster_path+'\');"id='+searchResult.title.replace(/\s/g, '-').toLowerCase()+'><div class="details"><h2>'+searchResult.title+'</h2><span class="score"><p>'+vote+'%</p></span><p class="tagline">'+searchResult.tagline+'</p><ul><li>'+searchResult.release_date.split('-')[0]+'</li><li>'+runtime+'</li><li>'+searchResult.genres[0].name+'</li></ul><p class="overview">'+overview+'</p></div></div>';
                 });
               }).catch(err => {
                console.error('we came across an error', err);
              })
               }
          }, 200);
        }
        else { 
          movieWrapper.innerHTML = '';
          if(!document.querySelector('.error').classList.contains('active')){
            movieWrapper.innerHTML = '';
            document.querySelector('.error').classList.add('active');
          }
        }  
    }
  }

  document.querySelector('#search').addEventListener('keyup', function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        personalSearch();
    }
  })

  document.querySelector('.search-submit').addEventListener('click', function(){
    personalSearch();
  });

  document.querySelector('.search-submit').addEventListener('touchevent', function(){
    personalSearch();
  });
  loadMovies();

  window.addEventListener('scroll', function(){
    const top = document.querySelector('.back-top');
    if(window.scrollY > 100){
     
      if(!top.classList.contains('active')){
         top.classList.add('active');
      }

    }
    if(window.scrollY === 0) {
      top.classList.remove('active');
    }
  });
  
  document.querySelector('.back-top').addEventListener('click', function(){
    if(document.querySelector('.back-top').classList.contains('active')){
      document.querySelector('.back-top').classList.remove('active');
    }
  })
  
}




