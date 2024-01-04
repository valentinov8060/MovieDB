const searchButton = document.querySelector('#search-button');

/* event */
/* - search event */
searchButton.addEventListener('click', async function() {
     try {
          const inputKeyword = document.querySelector('#input-keyword').value;
          const movies = await getMovies(inputKeyword);
     
          showMovies(movies)
     } catch (error) {
          alert(error)
     }
})

/* - movie detail event */
document.addEventListener('click', async function(event) {
     if (event.target.classList.contains('modal-detail-button')) {
          try {
               const imdbid = event.target.dataset.imdbid;
               const movieDetail = await getMovieDetail(imdbid);
     
               showMovieDetailModal(movieDetail)
          } catch {
               alert(error)
          }
     }
})

/* function */
function getMovies(inputKeyword) {
     return fetch('http://www.omdbapi.com/?apikey=ba037334&s=' + inputKeyword)
     .then(respon => {
                    // mengecek status HTTP
                    if(!respon.ok){
                         throw new Error('Network response was not ok: ' + response.statusText)
                    }
                    return respon.json()
               })
               .then(respon => {
                    if(respon.Response === "False"){
                         throw new Error(respon.Error)
                    }
                    return respon.Search;
               })
}

function showMovies(movies) {
     let cards = ''
     movies.forEach(movie => {
          const movieContainer = document.querySelector('#search-movie-container');
          cards += movieCard(movie)
          movieContainer.innerHTML = cards;
     });
}

function movieCard(movie) {
     return `
          <div class="col">
               <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title} image" height="600px">
                    <div class="card-body">
                         <h5 class="card-title">${movie.Title}</h5>
                         <p class="card-text">${movie.Year}</p>
                         
                         <!-- Button trigger modal -->
                         <a href="#" class="modal-detail-button btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid=${movie.imdbID}>Show Details</a>
                    </div>
               </div>
          </div>
     `
}

function getMovieDetail(imdbid) {
     return fetch('http://www.omdbapi.com/?apikey=ba037334&i=' + imdbid) 
               .then(respon => respon.json())
}

function showMovieDetailModal(movieDetail) {
     const modalBody = document.querySelector('.modal-body');
     modalBody.innerHTML = movieDetailModal(movieDetail);
}

function movieDetailModal(movieDetail) {
     return `
          <div class="container-fluid">
               <div class="row">

                    <div class="col-md">
                         <ul class="list-group">
                              <li class="list-group-item"> 
                                   <h4>${movieDetail.Title} (${movieDetail.Type})</h4>
                                   ${movieDetail.Released}
                              </li>
                              <li class="list-group-item"> <strong>Genre : </strong>${movieDetail.Genre}</li>
                              <li class="list-group-item"> <strong>Runtime : </strong>${movieDetail.Runtime}</li>
                              <li class="list-group-item"> <strong>Director : </strong>${movieDetail.Director}</li>
                              <li class="list-group-item"> <strong>Writer : </strong>${movieDetail.Writer}</li>
                              <li class="list-group-item"> <strong>Actors : </strong>${movieDetail.Actors}</li>
                              <li class="list-group-item"> <strong>Plot : </strong>${movieDetail.Plot}</li>
                              <li class="list-group-item"> <strong>IMD Rating : </strong>${movieDetail.imdbRating}</li>
                              
                         </ul>
                    </div>
               </div>
          </div>
     `
}