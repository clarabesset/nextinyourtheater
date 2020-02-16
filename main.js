var turn = 0;  
var currentMovies = 0;
var url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe'
var urlOneMovie = 'https://image.tmdb.org/t/p/w500'
var sliderElements = document.querySelectorAll(".movieSlider")
var nb=0
var thisMoviePoster;

// Décomposer fonctions 
// Responsive
// Rating
// Poster
// Dots

function loopMovies() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    console.log(data.results)
    turnMax = data.results.length;
      if (turn <= -1) {
        turn = turnMax 
      } else if (turn >= turnMax){
        turn = 0
    }
})}
)}

function appendNodes() {
  // create the slide for 1 movie
  let slide = document.createElement("div");
  slide.classList.add("slide");
  document.querySelector("#slides").appendChild(slide);
  // add the poster of the movie
  let poster = document.createElement("div");
  poster.classList.add("movie_poster");
  document.querySelector(".slide").appendChild(poster);
  // add section for all the text
  let text = document.createElement("div");
  text.classList.add("movie_text");
  document.querySelector(".slide").appendChild(text);
  // add section for title and rating
  let main = document.createElement("div");
  main.classList.add("movie_main");
  document.querySelector(".movie_text").appendChild(main);
  // add title and rating
  let title = document.createElement("div");
  title.classList.add("movie_main--title");
  document.querySelector(".movie_main").appendChild(title);
  let rating = document.createElement("div");
  rating.classList.add("movie_main--rating");
  document.querySelector(".movie_main").appendChild(rating);
  // add the description
  let info = document.createElement("div");
  info.classList.add("movie_info");
  document.querySelector(".movie_text").appendChild(info);
}

// turnMax = data.results.length;
//       if (turn <= -1) {
//         turn = turnMax 
//       } else if (turn >= turnMax){
//         turn = 0
//     }

function fillUpNodes() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    ///// nb = data.results.length - 1;
    // content fetched from API
    for (turn=0; turn<=nb; turn++) {
      let thisMoviePicture= data.results[turn].backdrop_path;
      let thisMoviePoster= data.results[turn].poster_path;
      let thisMovieTitle= data.results[turn].title;
      let thisMovieInfo= data.results[turn].overview;
      // select nodes to insert content
      var allDivs = document.querySelectorAll(".slide");
      var allPosters = document.querySelectorAll(".movie_poster");
      var allTitles = document.querySelectorAll(".movie_main--title");
      var allInfos = document.querySelectorAll(".movie_info") 
      // fill up nodes with content
      if (thisMoviePoster == null){ 
        allDivs[turn].style.background='url("./images/movie-theater-background.jpg")'
        allDivs[turn].style.backgroundSize="cover"}
      else {
        allDivs[turn].style.background="linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("+urlOneMovie+"/"+thisMoviePicture+") no-repeat"
        allDivs[turn].style.backgroundSize="cover"
      } 
      if (thisMoviePoster == null) {
        allPosters[turn].style.background='url("./images/movie-theater-background.jpg")'
      }
      else {
        allPosters[turn].style.background="url("+urlOneMovie+"/"+thisMoviePoster+") no-repeat center"
        allPosters[turn].style.backgroundSize="contain"
      }
      if (thisMovieTitle == null) {
      console.log("no title")
      }
      else {
        allTitles[turn].textContent=thisMovieTitle
      }
      if (thisMovieInfo == null) {
        console.log("no info")
      }
      else {
        allInfos[turn].textContent=thisMovieInfo
      }
  }
})}
)
}

function ratingStars() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    console.log(data.results)
    let thisRating = Math.round(data.results[0].vote_average);
    for (let turn=0; turn<=thisRating; turn++) {
      var starNode = document.createElement("i");
      starNode.classList.add("fas", "fa-star");
      console.log("rating", thisRating)
      console.log(turn)
      document.querySelector(".movie_main--rating").appendChild(starNode);
    }
})}
)
}

function pageDots() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    let dotsNumber = data.results.length-1;
    for (let turn=0; turn<=dotsNumber; turn++) {
      var dotNode = document.createElement("li");
      document.querySelector(".page-dot").appendChild(dotNode);
    }
    document.querySelectorAll("li")[nb].classList.add("current-dot");
})}
)
}

function addSlides() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    console.log(data.results)
    appendNodes();
    fillUpNodes()
    ratingStars();
    pageDots();
  })}
  )
}

addSlides();

function ratingStars() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    console.log(data.results)
    let thisRating = Math.round(data.results[0].vote_average);
    for (let turn=0; turn<=thisRating; turn++) {
      var starNode = document.createElement("i");
      starNode.classList.add("fas", "fa-star");
      console.log("rating", thisRating)
      console.log(turn)
      document.querySelector(".movie_main--rating").appendChild(starNode);
    }
})}
)
}

function pageDots() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    let dotsNumber = data.results.length-1;
    for (let turn=0; turn<=dotsNumber; turn++) {
      var dotNode = document.createElement("li");
      document.querySelector(".page-dot").appendChild(dotNode);
    }
    document.querySelectorAll("li")[nb].classList.add("current-dot");
})}
)

}
// function fetchApi() {
//   fetch(url)
//   .then (
//   function(response) {
//   if (response.status !== 200) {
//     console.log('Looks like there was a problem. Status Code: ' +
//       response.status);
//     return;
//   }
//   response.json().then(function(data) {
//     moviesLength = data.results.length;
//     thisMoviePoster= data.results[turn].backdrop_path;
//     addSlides();
//     // if (thisMoviePoster == null){ 
//     // sliderElement.style.backgroundImage='url("./images/movie-theater-background.jpg")'}
//     // else {
//     // sliderElement.style.backgroundImage="url("+urlOneMovie+"/"+thisMoviePoster+")"}
//    if (sessionStorage.getItem("is_reloaded")) alert('Reloaded!')
//     else {console.log("nope")}
  
//     });
// }
// )}

// fetchApi(); 


// document.querySelector(".previous").onclick = function (e) {
//   e.preventDefault()
//   turn--;
//   console.log(turn);
//   loopMovies()
//   fetchApi();
// }

// document.querySelector(".next").onclick = function (e) {
//   // e.preventDefault()
//   // turn++;
//   // console.log(turn)
//   // loopMovies()
//   // fetchApi();
// }

// }
// fetch(url)
// .then (
// function(response) {
//   if (response.status !== 200) {
//     console.log('Looks like there was a problem. Status Code: ' +
//       response.status);
//     return;
//   }
//   response.json().then(function(data) {
//     allMovies = data.results
//     allMovies.forEach (movie =>
//     console.log(movie.title)
//   )
//   });
// }
// )
// .catch(function(err) {
// console.log('Fetch Error', err);
// });

// document.querySelector(".previous").onclick = previousMovie;
// document.querySelector(".next").onclick = nextMovie;

// function previousMovie(){
//   turn--;
//   currentMovie = allMovies[turn]
//   console.log(currentMovie)
// }

// function nextMovie(){
// turn++;
// currentMovie = allMovies[turn];

// fetch(url)
// .then (
// function(response) {
//   if (response.status !== 200) {
//     console.log('Looks like there was a problem. Status Code: ' +
//       response.status);
//     return;
//   }
//   response.json().then(function(data) {
//     thisMovie = data.results[turn].backdrop_path
//     console.log(thisMovie.title);
//     sliderElement.style.backgroundImage="url("+urlOneMovie+"/"+thisMovie+")"
//   });
// }
// )  

// // sliderElement.style.backgroundImage="url("+urlOneMovie+")"
// // console.log("next")
// }


//HERE 

// var slider = document.getElementById('slider'),
//     sliderItems = document.getElementById('slides'),
//     prev = document.getElementById('prev'),
//     next = document.getElementById('next');

// console.log(sliderItems)

// function slide(wrapper, items, prev, next) {
//   var posX1 = 0,
//       posX2 = 0,
//       posInitial,
//       posFinal,
//       threshold = 100,
//       slides = document.getElementsByClassName('slide'),
//       slidesLength = slides.length,
//       slideSize = document.getElementsByClassName('slide')[0].offsetWidth,
//       firstSlide = slides[0],
//       lastSlide = slides[slidesLength - 1],
//       cloneFirst = firstSlide.cloneNode(true),
//       cloneLast = lastSlide.cloneNode(true),
//       index = 0,
//       allowShift = true;
  
//       console.log(slideSize)

//   // Clone first and last slide
  
//   // Mouse events
//   items.onmousedown = dragStart;
  
//   // Touch events
//   items.addEventListener('touchstart', dragStart);
//   items.addEventListener('touchend', dragEnd);
//   items.addEventListener('touchmove', dragAction);
  
//   // Click events
//   prev.addEventListener('click', function () { shiftSlide(-1) });
//   next.addEventListener('click', function () { shiftSlide(1) });
  
//   // Transition events
//   items.addEventListener('transitionend', checkIndex);
  
//   function dragStart (e) {
//     console.log("dragStart")
//     e = e || window.event;
//     e.preventDefault();
//     posInitial = items.offsetLeft;
    
//     if (e.type == 'touchstart') {
//       posX1 = e.touches[0].clientX;
//     } else {
//       posX1 = e.clientX;
//       document.onmouseup = dragEnd;
//       document.onmousemove = dragAction;
//     }
//   }

//   function dragAction (e) {
//     console.log("dragAction")
//     e = e || window.event;
    
//     if (e.type == 'touchmove') {
//       posX2 = posX1 - e.touches[0].clientX;
//       posX1 = e.touches[0].clientX;
//     } else {
//       posX2 = posX1 - e.clientX;
//       posX1 = e.clientX;
//     }
//     items.style.left = (items.offsetLeft - posX2) + "px";
//   }
  
//   function dragEnd (e) {
//     console.log("dragEnd")

//     posFinal = items.offsetLeft;
//     if (posFinal - posInitial < -threshold) {
//       shiftSlide(1, 'drag');
//     } else if (posFinal - posInitial > threshold) {
//       shiftSlide(-1, 'drag');
//     } else {
//       items.style.left = (posInitial) + "px";
//     }

//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
  
//   function shiftSlide(dir, action) {
//     console.log("shiftSlide")
//     console.log("yo", dir, action)

//     items.classList.add('shifting');
    
//     if (allowShift) {
//       if (!action) { posInitial = items.offsetLeft; }

//       if (dir == 1) {
//         items.style.left = (posInitial - slideSize) + "px";
//         index++;      
//       } else if (dir == -1) {
//         items.style.left = (posInitial + slideSize) + "px";
//         index--;      
//       }
//     };
    
//     allowShift = false;
//   }
    
//   function checkIndex (){
//     console.log("checkIndex")

//     items.classList.remove('shifting');

//     if (index == -1) {
//       items.style.left = -(slidesLength * slideSize) + "px";
//       index = slidesLength - 1;
//     }

//     if (index == slidesLength) {
//       items.style.left = -(1 * slideSize) + "px";
//       index = 0;
//     }
    
//     allowShift = true;
//   }
// }

// slide(slider, sliderItems, prev, next);