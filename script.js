'use strict';
// const API_KEY = 'api_key=5719839582dcc37299e0c1f45ae45110';
// const POPULARITY = TMDB_BASE_URL + '/discover/movie?sort_by=popularity.desc' + API_KEY;
// const sth = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc/api_key=5719839582dcc37299e0c1f45ae45110'

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const SUBCONTAINER = document.querySelector(".subcontainer");


// Don't touch this function please
//give any path and it will return the full URL:
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=")}`;
};

//-----------------------------------------------------------------------------------------------------------------
// Don't touch this function please
// This function fetches movies and renders them (using 2 functions below)
const autorun = async () => {
  const movies = await fetchMovies();
  // console.log(movies)
  renderMovies(movies.results);
  // console.log(movies.results);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};



// You'll need to play with this function in order to add features and enhance the style.
// This function shows all movies.
const renderMovies = (movies) => {
  const mainMovieDiv = document.createElement("div");
  mainMovieDiv.classList.add("row");
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("col-md-4", "col-sm-6");
    movieDiv.innerHTML =
      `
      <div class="card m-3" style="width: 20rem;">
        <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview}</p>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
      </div>
      `;


    movieDiv.addEventListener("click", () => {
      runMovieDetails(movie);
    });
    CONTAINER.appendChild(mainMovieDiv);
    mainMovieDiv.appendChild(movieDiv);
  });
};


// You may need to add to this function, definitely don't delete it.
const runMovieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  renderMovie(movieRes);

  const castRes = await fetchMovieActors(movie.id);
  // console.log(castRes.cast);
  renderMovieActors(castRes.cast);

  // Results of fetch3(videos):
  const videoRes = await fetch3(movie.id)
  console.log(videoRes.results);
  renderVideos(videoRes.results);
};


// This function is to fetch one movie. Don't touch this function please. 
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};


// fetch actors that played in the movie(credits):
const fetchMovieActors = async (movieId) => {
  const url = constructUrl(`movie/${movieId}/credits`);
  const res = await fetch(url);
  return res.json();
};

// fethces videos of a movie:
const fetch3 = async (movieId) => {
  const url = constructUrl(`/movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
}


// renders videos of a movie:
const renderVideos = (movie) => {

  movie.map(element => {
    if (element.type === "Trailer") {
      CONTAINER.innerHTML += `
        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${element.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div>hello</div>
  `;
    }
  })
}



// renders actors starring in a movie
const renderMovieActors = (actor) => {
  actor.map(element => {
    CONTAINER.innerHTML += `
    <div class="pt-5 row ">
        <div class="col-md-4">
             <img style="max-width: 60%; height: auto;" src=${PROFILE_BASE_URL + element.profile_path}>
             <h4><span>${element.name}</span></h4>
        </div>
    </div>
    `;
  })
}



// renders main movies page
const renderMovie = (movie) => {
  CONTAINER.innerHTML = `
    <div class="row pt-5">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path
    }>
        </div>
        <div class="col-md-8 ">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date
    }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled"></ul>
    </div>`;
};



// ----------------------------------- creating functions that fetch and display actors --------------------------------------------
// runs main page for actors: 
const runActors = async () => {
  const actors = await fetchActors();
  // console.log("actors", actors);
  renderActors(actors.results);

  //this is to render fetch2:
  const movieCast = await fetch2();
  renderActor2(movieCast);


};
runActors();

// fetch main page actors:
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);

  return res.json();
};



// render main page actors:
const renderActors = (actors) => {
  const mainActorDiv = document.createElement("div");
  mainActorDiv.classList.add("row");
  actors.map((actor) => {
    if (actor.profile_path !== null) {
      const actorDiv = document.createElement("div");
      actorDiv.classList.add("col-md-4", "col-sm-6");
      actorDiv.innerHTML =
        `
    <div class="card m-3" style="width: 15rem;">
      <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.name}">
        <div class="card-body">
          <h5 class="card-title">${actor.name}</h5>
          <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
        </div>
    </div>
    `;


      actorDiv.addEventListener("click", () => {
        runActorDetails(actor);
        console.log("actor clicked");
      });

      CONTAINER.appendChild(mainActorDiv);
      mainActorDiv.appendChild(actorDiv);
    }
  });
};


// runs single actor details:
const runActorDetails = async (obj) => {
  const actorRes = await fetchActor(obj.id);
  renderActor(actorRes);

  // Results of fetch2:
  const movieRes = await fetch2(obj.id);
  // console.log(movieRes.cast)
  renderActor2(movieRes.cast);

};

// fetch single actor details:
const fetchActor = async (actorId) => {
  const url = constructUrl(`person/${actorId}`);
  const res = await fetch(url);
  return res.json(); //return renderActor(res.json()); 
};

// fetches the movies an actor has been in:
const fetch2 = async (actorId) => {
  const url = constructUrl(`/person/${actorId}/movie_credits`);
  const res = await fetch(url);
  return res.json();
}



// renders single actor details:
const renderActor = (actor) => {
  CONTAINER.innerHTML = `
    <div class="pt-5 row ">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${PROFILE_BASE_URL + actor.profile_path}>
        </div>
        <div class="col-lg-8 col-md-12 col-sm-12">
          <h2 id="actor-name"><span>${actor.name}</span></h2>
          <h4>Gender:</h4>
          <p id="gender">**</p>
          <h4>Popularity:</h4>
          <p id="popularity">${actor.popularity}</p>
          <h4>Birthday: </h4>
          <p id="birthday">${actor.birthday}</p>
          <h4>Biography:</h4>
           <h5 id="biography" style="color:#BDBDBD; font-size: .8rem;">${actor.biography}</h5>
        </div>
        <div><br>
        <h4>Related Movies:</h4>
        </div>
    </div>`
  if (actor.gender === 2) {
    document.getElementById("gender").innerText = "Male";
  } else { document.getElementById("gender").innerText = "Female"; };

}

// renders movies an actor played in :
const renderActor2 = (movie) => {
  movie.map(element => {
    // console.log(element)
    CONTAINER.innerHTML += `
    <div class="pt-5 row ">
        <div class="col-md-4">
             <img style="max-width: 60%; height: auto;" src=${PROFILE_BASE_URL + element.poster_path}>
             <h4><span>${element.original_title}</span></h4>
        </div>
    </div>`
  })

};
// ---------------------------------------------------------------------------------------------------------------------------
let actorsNavBar = document.getElementById("theActors")

actorsNavBar.addEventListener("click", () => {
  console.log("clicked!");
  CONTAINER.innerHTML = "";
  runActors();
});

document.addEventListener("DOMContentLoaded", autorun);



// 1- decide what data you want to fetch, and create a function that fetches it.
// 2- decide how you want to display it, and create a function that renders it.
// 3- use the already built constructUrl function to fetch the data.
// 4- figure out how to style the pages using bootstrap.

// Extra :
// 1- add a rating color for each movie
