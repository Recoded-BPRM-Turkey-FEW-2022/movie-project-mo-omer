'use strict';
const API_KEY = 'api_key=5719839582dcc37299e0c1f45ae45110';
// const POPULARITY = TMDB_BASE_URL + '/discover/movie?sort_by=popularity.desc' + API_KEY;
// const sth = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc/api_key=5719839582dcc37299e0c1f45ae45110'

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w780";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const SEARCH_URL = TMDB_BASE_URL + "/search/movie?" + API_KEY;
const form = document.getElementById("form");
const submit = document.getElementById("submit");

const genres =  [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]



//give any path and it will return the full URL:
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob("NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=")}`;
};

//-----------------------------------------------------------------------------------------------------------------
// This function fetches movies and renders them (using 2 functions below)
const autorun = async () => {
  const movies = await fetchMovies();
  // console.log(movies)
  renderMovies(movies.results);
  console.log(movies.results);
};


// Home button, takes you to moviesRender page
const homeBtn = document.getElementById("home");
const backToHome = () => {
  CONTAINER.innerHTML = '';
  autorun();
};
homeBtn.addEventListener("click", backToHome);

// Logo button, takes you to moviesRender page
const logo = document.getElementById("logo");
const logoToHome = () => {
  CONTAINER.innerHTML = '';
  autorun();
};
logo.addEventListener("click", logoToHome);

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};


// This function shows all movies.
const renderMovies = (movies) => {

  CONTAINER.innerHTML = "";

  const mainMovieDiv = document.createElement("div");
  mainMovieDiv.classList.add("row");
  movies.map((movie) => {
    movie.genre_ids.slice(0, 1).map((genre) => {
      const genreName = genres.find(g => g.id === genre);
      movie.genre = genreName.name;
    })
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("col-md-4", "col-sm-6");
    movieDiv.innerHTML =
      `
    if (movie.poster_path !== null) {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("col-md-4", "col-sm-6");
      movieDiv.innerHTML =
        `
      <div class="card m-3" style="width: 20rem;">
        <h5 class="card-title genre">${movie.genre}</h5>
        <img src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${movie.title} poster">
          <div class="card-body">
            <div class="d-flex justify-content-between">
             <h5 class="card-title">${movie.title}</h5>
             <h5 class="card-title">${movie.vote_average}</h5>
            </div>
            <p class="card-text">${movie.overview}</p>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
      </div>
      `;


      // console.log(movie);
      movieDiv.addEventListener("click", () => {
        runMovieDetails(movie);
      });
      CONTAINER.appendChild(mainMovieDiv);
      mainMovieDiv.appendChild(movieDiv);
    }
  });
};


const runMovieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  // console.log(movieRes);
  renderMovie(movieRes);
  console.log(movieRes);

  const castRes = await fetchMovieActors(movie.id);
  // console.log(castRes);
  renderMovieActors(castRes.cast);

  // Results of fetch3(videos):
  const videoRes = await fetch3(movie.id)
  // console.log(videoRes.results);
  renderVideos(videoRes.results);

  // Results of fetchProductionCo:
  const productionRes = await fetchProductionCo(movie.id);
  // console.log(productionRes.production_companies);
  renderProdctionCp(productionRes.production_companies);

  // Results of fetchSimilarMovies:
  const similarRes = await fetchSimilarMovies(movie.id);
  // console.log(similarRes.results);
  renderSimilarMovies(similarRes.results);


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

// fethces videos/trailer of a movie:
const fetch3 = async (movieId) => {
  const url = constructUrl(`/movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
}


// fetches similar movies:
const fetchSimilarMovies = async (movieId) => {
  const url = constructUrl(`/movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
}


// fetches production companies of a movie
const fetchProductionCo = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};


// from fetch3 (called it render3): renders trailer of a movie.
const renderVideos = (movie) => {
  CONTAINER.innerHTML += `<br><h3>Trailer: <br></h3>`;
  let i = 0;
  movie.map(element => {
    if (element.type === "Trailer" & i < 1) {
      i++;
      CONTAINER.innerHTML += `
        <div>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${element.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
  `;
    }
  })
}



// renders actors starring in a movie
const renderMovieActors = (actor) => {
  const SUBCONTAINER = document.createElement("div");
  SUBCONTAINER.classList.add("d-flex", "flex-wrap");
  actor.slice(0, 5).map(element => {
    if (element.profile_path !== null) {
    SUBCONTAINER.innerHTML += `
      <div class="pe-3 col-md-4">
             <img style="width: 10rem; height: auto;" src=${PROFILE_BASE_URL + element.profile_path}>
             <h4>${element.name}</h4>
      </div>
    `;
    }
  })
  CONTAINER.appendChild(SUBCONTAINER);
}

//render similar movies:
const renderSimilarMovies = (movie) => {
  CONTAINER.innerHTML += `<br><h3>Similar Movies: <br></h3>`;

  movie.slice(0, 5).map(element => {
    if (element.poster_path !== null) {
      CONTAINER.innerHTML += `
    <div class="pt-5 row ">
        <div class="col-md-4">
             <img style="max-width: 60%; height: auto;" src=${PROFILE_BASE_URL + element.poster_path}>
             <h4><span>${element.title}</span></h4>
        </div>
    </div>
    `;
    }
  })
}


// renders production companies of a movie:
const renderProdctionCp = (movie) => {
  CONTAINER.innerHTML += `<br><h3>Production Companies: <br></h3>`;

  movie.slice(0, 5).map(element => {
    CONTAINER.innerHTML += `
    <div class="pt-5 row ">
        <div class="col-md-4">
             <h4><span>${element.name}</span></h4>
        </div>
    </div>
    `;
  })
}



const renderMovie = (movie) => {
  const arrOfGenres = [];
  movie.genres.map(element => {
    arrOfGenres.push(element.name);
  })
  CONTAINER.innerHTML = `
    <div class=" row pt-5">
        <div class="col-md-4">
             <img id="movie-backdrop" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
        </div>
        <div class="col-md-8 ">
            <h2 id="movie-title">${movie.title}</h2>
            <h4>${arrOfGenres.join(', ')}</h4>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p> 
            <p id="movie-runtime"><b>Language:</b> ${movie.spoken_languages[0].english_name}</p>
            <p id="movie-runtime"><b>Vote Average:</b> ${movie.vote_average}/10</p>
            <p id="movie-runtime"><b>Vote Count:</b> ${movie.vote_count}</p>

            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            
    </div>`;
};
// ------------------------------------------------- GENRE FUNCTIONS --------------------------------------------------------------//
const runGenres = async () => {
  const moviesByGenre = await fetchMoviesByGenre();
  renderByGenre(moviesByGenre.results);
};

const fetchMoviesByGenre = async () => {
  const url = `${TMDB_BASE_URL}/discover/movie?sort_by=popularity.desc&with_genres=${encodeURI(selectedGenre.join(','))}&api_key=542003918769df50083a13c415bbc602`
  const res = await fetch(url);
  const json = await res.json();
  return json;
};

const tagsEl = document.getElementById("tags");
let selectedGenre = []; // WILL STORE ALL THE CLICKED GENRES. SEE EVENT LISTENER BELOW
const setGenre = () => {
  genres.forEach(genre => { // LOOP OVER THE ARRAY
    const t = document.createElement("div"); // CREATE DIV FOR EACH ARRAY ELEMENT
    t.classList.add("tag");
    t.id = genre.id; //GET THE id VALUES FROM ARRAY AND GIVE TO DOM ELEMENTS
    t.innerText = genre.name; //GET THE name VALUES FROM ARRAY AND GIVE TO DOM ELEMENTS
    t.addEventListener("click", async () => {
      if (selectedGenre.length == 0) { // IF IT IS EMPTY...
        selectedGenre.push(genre.id); // ...PUSH THE GENRE ID
      } else { //IF IT IS NOT EMPTY
        if (selectedGenre.includes(genre.id)) { //IF THE GENRE IS ALREADY SELECTED...
          selectedGenre.forEach((id, idx) => { //THEN LOOK AT THE SELECTED GENRES IN THE ARRAY AND...
            if (id == genre.id) { //IF YOU FIND THE CLICKED GENRE ALREADY IN THE ARRAY...
              selectedGenre.splice(idx, 1); // REMOVE THE GENRE FROM THE ARRAY
            }
          })
        } else { // IF THE GENRE IS NOT SELECTED (NOT SAVED IN THE ARRAY)...
          selectedGenre.push(genre.id); // THEN SELECT IT (SAVE IT IN THE ARRAY)
        }
      }
      // console.log(selectedGenre);
      const moviesByGenre = await fetchMoviesByGenre();
      renderByGenre(moviesByGenre);
      // console.log(moviesByGenre());
    })
    tagsEl.append(t);
  });
}
setGenre();



const renderByGenre = (moviesByGenre) => {
  const genreListDiv = document.createElement("div");
  genreListDiv.classList.add("row");
  // console.log(moviesByGenre);
  moviesByGenre.results.map((movieByGenre) => {
    const genreDiv = document.createElement("div");
    genreDiv.classList.add("col-md-4", "col-sm-6");
    genreDiv.innerHTML =
      `
      <div class="card m-3" style="width: 20rem;">
        <img src="${BACKDROP_BASE_URL + movieByGenre.backdrop_path}" alt="${movieByGenre.title} poster">
          <div class="card-body">
            <h5 class="card-title">${movieByGenre.title}</h5>
            <p class="card-text">${movieByGenre.overview}</p>
            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
      </div>
      `;

    genreDiv.addEventListener("click", () => {
      movieDetails(movieByGenre);
    });
    CONTAINER.innerHTML = "";
    CONTAINER.appendChild(genreListDiv);
    genreListDiv.appendChild(genreDiv);
  });
};




// -------------------------------------------------- creating functions that fetch and display actors --------------------------------------------
// runs main page for actors: 
const runActors = async () => {
  const actors = await fetchActors();
  // console.log("actors", actors);
  renderActors(actors.results);

  // delete this
  //this is to render fetch2:
  // const movieCast = await fetch2();
  // renderActor2(movieCast);

};


// fetch main page actors:
const fetchActors = async () => {
  const url = constructUrl(`person/popular`);
  const res = await fetch(url);

  return res.json();
};



// render main page of actors:
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
        // console.log("actor clicked");
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
  return res.json();
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
    </div>`
  if (actor.gender === 2) {
    document.getElementById("gender").innerText = "Male";
  } else { document.getElementById("gender").innerText = "Female"; };

}


// renders movies an actor played in :
const renderActor2 = (movie) => {
  CONTAINER.innerHTML += `<br><h3>Related Movies: <br></h3>`;

  movie.slice(0, 8).map(element => {
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

// ------------------------------------------------------------------ Event Listeners ------------------------------------------------------------

let actorsNavBar = document.getElementById("theActors")

actorsNavBar.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  runActors();
});



// event listener for popular movies:
document.getElementById("popularity").addEventListener("click", async () => {

  const fetcher = async () => {
    const res = await fetch(constructUrl(`movie/popular`));
    return res.json();
  };
  const movies = await fetcher();
  renderMovies(movies.results);
  // console.log("popular");
})

// event listener for top rated:
document.getElementById("top_rated").addEventListener("click", async () => {
  const fetcher = async () => {
    const res = await fetch(constructUrl(`movie/top_rated`));
    return res.json();
  };
  const movies = await fetcher();
  renderMovies(movies.results);
  // console.log("top rated");
})


// event listener for now_playing :
document.getElementById("now_playing").addEventListener("click", async () => {
  const fetcher = async () => {
    const res = await fetch(constructUrl(`movie/now_playing`));
    return res.json();
  };
  const movies = await fetcher();
  renderMovies(movies.results);
  // console.log("nowplaying");
})


// event listener for upcoming :
document.getElementById("up_coming").addEventListener("click", async () => {
  const fetcher = async () => {
    const res = await fetch(constructUrl(`movie/upcoming`));
    return res.json();
  };
  const movies = await fetcher();
  renderMovies(movies.results);
  // console.log("upcoming");
})


// event listener for release date :
document.getElementById("release_date").addEventListener("click", async () => {
  const fetcher = async () => {

    const res = await fetch(`${constructUrl('discover/movie')}&sort_by=release_date.desc`);
    // console.log(res.json());
    return res.json();
  };
  const movies = await fetcher();
  renderMovies(movies.results);
  // console.log(movies.results);
})

document.addEventListener("DOMContentLoaded", autorun);


// ------------------------------------------------------About us page ---------------------------------------------------------------------

const aboutUsBtn = document.getElementById("about-us");

const renderAboutUs = () => {
  CONTAINER.innerHTML = `
  <div class="pt-5 row ">
      <div class="col-md-4">
           <img id="movie-backdrop" src="./aboutUs.jpg">
      </div>
      <div class="col-lg-8 col-md-12 col-sm-12">
        <h2 id="actor-name"><span>About Us</span></h2>
        <p>Find everything about your favorite movies, discover new titles through advanced filtering, and more. Powered by The Movie Database, Momerflix is here to help you quickly find your next watch.</p>
      </div>
  </div>`
}

aboutUsBtn.addEventListener("click", () => {
  CONTAINER.innerHTML = "";
  renderAboutUs();
});



form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchTerm = submit.value;

  if (searchTerm) {

    const fetcher = async () => {
      const res = await fetch(SEARCH_URL + '&query=' + searchTerm);
      return res.json();
    }

    const movies = await fetcher();
    renderMovies(movies.results);
    console.log("searched", movies);
  }
});