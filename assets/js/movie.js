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
                               overview = movie.results[i].overview.substring(0,400)+'...';
                           }
                           else {
                               overview = movie.results[i].overview;
                           }
                           
                            movieWrapper.innerHTML+= '<div class="card"><img src="https://image.tmdb.org/t/p/w500/'+ movie.results[i].poster_path + '" alt="'+title+' movie poster"/><div class="details"><h2>'+ title+'</h2><p class="date">'+year+'</p><p class="overview">'+overview+'</p><a href="https://www.themoviedb.org/movie/'+movie.results[i].id+'-'+title+'" target="_blank" class="read-more">Read more about '+title+'</a></div></div>'
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
}


// console.log(movieArray);