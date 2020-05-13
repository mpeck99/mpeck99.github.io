var apiArray = [],
    myMovies =[];
function personalMovies() {
    const googleUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1nXRZYrOnedMOvioQJxbIQKTpc9_XCGI23-KMk8jwZQU/values/Movies!A:D?key=AIzaSyDrWhgTrY_NIQ7pa19SpdYtF0Wcom3stDA';
    fetch(googleUrl).then(response=>{
        response.json().then(json =>{
            const movies = json;
            for(var i = 0; i < movies.values.length; i++){
                myMovies.push({'title':movies.values[i][0],'year':movies.values[i][1]});

                 const apiUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e444034c3d7ef62e63059e6e8ac5b828&query='+movies.values[i][0]+'&year='+movies.values[i][1]+'&language=en-US&include_adult=false';
                fetch(apiUrl).then(response=>{
                    response.json().then(movie => {
                       for(var i = 0; i <movie.results.length; i++){
                           var year = movie.results[i].release_date.split('-')[0];
                           apiArray.push({'title':movie.results[0].title,'year':year});
                           break;
                       }                    
                    });
                });
                
            }
        });
    });     
}
personalMovies(); 

console.log(apiArray)

// console.log(result);
// for(var i = 0; i < myMovies.length; i++){
//     for(var x = 0; x <apiArray.length; x++){
//         if(myMovies[i].title 
//             != apiArray[i].title){
//             console.log(apiArray[i].title);
//             // break;
//         }
//     }
// }
// function arraysSame(array1, array2){
//     var res = array2
//    if(array1!=array2){
//        console.log('all good');
//    }
//    else {
//        console.log('not good')
//    }
// }

// arraysSame(myMovies,apiArray);