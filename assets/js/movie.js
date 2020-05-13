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
                            movieWrapper.innerHTML+= '<div class="card"><img src="https://image.tmdb.org/t/p/w500/'+ movie.results[i].poster_path + '"/><div class="details"><h2>'+ movie.results[i].title+'</h2><p>'+movie.results[i].release_date.split('-')[0]+'</p><p>'+movie.results[i].overview+'</p></div></div>'
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