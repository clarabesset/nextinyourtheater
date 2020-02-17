var url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe'
var urlOneMovie = 'https://image.tmdb.org/t/p/w500'
var turn=0;

function insertContent(turn) {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
      console.log(turn)
      slideMax = data.results.length;
      let thisMoviePicture= data.results[turn].backdrop_path;
      let thisMoviePoster= data.results[turn].poster_path;
      let thisMovieTitle= data.results[turn].title;
      let thisMovieInfo= data.results[turn].overview;
      // select nodes to insert content
      var movieSlide = document.querySelector(".slide");
      var moviePoster = document.querySelector(".movie_poster");
      var movieTitle = document.querySelector(".movie_main--title");
      var movieInfo = document.querySelector(".movie_info") 
      // fill up nodes with content
      if (thisMoviePicture == null){ 
        movieSlide.style.background='url("./images/movie-theater-background.jpg")'
        movieSlide.style.backgroundSize="cover"}
      else {
        movieSlide.style.background="linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url("+urlOneMovie+"/"+thisMoviePicture+") no-repeat"
        movieSlide.style.backgroundSize="cover"
      } 
      if (thisMoviePoster== null) {
        moviePoster.style.background='url("./images/movie-theater-background.jpg")'
      }
      else {
        moviePoster.style.background="url("+urlOneMovie+"/"+thisMoviePoster+") no-repeat center"
        moviePoster.style.backgroundSize="contain"
      }
      if (thisMovieTitle == null) {
      }
      else {
        movieTitle.textContent=thisMovieTitle
      }
      if (thisMovieInfo == null) {
      }
      else {
        movieInfo.textContent=thisMovieInfo
      }
  })}
).catch(err => console.log(err))
}

function ratingStars() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    document.querySelector(".movie_main--rating").innerHTML="";
    let thisRating = Math.round(data.results[turn].vote_average);
    for (let turn=0; turn<=thisRating; turn++) {
      var starNode = document.createElement("i");
      starNode.classList.add("fas", "fa-star");
      document.querySelector(".movie_main--rating").appendChild(starNode);
    }
})}
).catch(err => console.log(err))}


function pageDots() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    document.querySelector(".page-dot").innerHTML =""
    let dotsNumber = data.results.length-1;
    for (let i=0; i<=dotsNumber; i++) {
      var dotNode = document.createElement("li");
      document.querySelector(".page-dot").appendChild(dotNode);
    }
    document.querySelectorAll("li")[turn].classList.add("current-dot");
})}
).catch(err => console.log(err))}


function addSlides() {
    insertContent(0);
    ratingStars();
    pageDots();
}

addSlides();

function checkBounds() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    turnMax = data.results.length-2;
      if (turn <= -1) {
        turn = turnMax 
      } else if (turn >= turnMax){
        turn = 0
    }
})}
)
.catch(err => console.log(err))}

function goPrevious(){
  document.querySelector(".slide").classList.add("slide-right")
  turn--;
  checkBounds("previous");
  insertContent(turn);
  ratingStars();
  pageDots();
}

prevNode = document.querySelector('.previous'),
nextNode = document.querySelector('.next');

var goPrev, goNext;

function clickNext() {
  goNext = setTimeout(next, 500);
}

function clickPrevious() {
  goNext = setTimeout(previous, 500);
}

function previous(){
  turn--;
  checkBounds();
  insertContent(turn);
  ratingStars();
  pageDots();
}

function next() {
  turn++;
  checkBounds();
  insertContent(turn);
  ratingStars();
  pageDots();
}


document.querySelector('.next').addEventListener("click", function(event) {
    console.log("heeeere")
    document.querySelector('.slide').classList.add('slide-to-black');  
    setTimeout(function(){
    document.querySelector('.slide').classList.remove('slide-to-black');  
    },1000)
  event.preventDefault();
});

// document.querySelector(".slide").classList.add("slide-to-black")

prevNode.onclick = clickPrevious;
nextNode.onclick = clickNext;