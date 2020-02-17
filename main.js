var url = 'https://api.themoviedb.org/3/movie/upcoming?api_key=e082a5c50ed38ae74299db1d0eb822fe'
var urlOneMovie = 'https://image.tmdb.org/t/p/w500'
var turn=0;


// adds the content of the current movie to the slide
function insertContent(turn) {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
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

// calculates and adds the rating of the current movie
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


// adds bullets points at the bottom to indicate which slide we are currently viewing
function pageDots() {
  fetch(url)
  .then (
    function(response) {
    response.json().then(function(data) {
    document.querySelector(".page-dot").innerHTML =""
    let dotsNumber = data.results.length-2;
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

// initializes the slider
addSlides();

// makes the slider loops in case we reach the either end of the list
function checkBounds() {
  fetch(url)
  .then (
    function(response) {
    console.log("checking")
    response.json().then(function(data) {
    turnMax = data.results.length-2;
      if (turn <= -1) {
        turn = turnMax 
        console.log("here", turn)
      } else if (turn >= turnMax){
        turn = 0
    }
})}
)
.catch(err => console.log(err))}

var goPrev, goNext;

// when you click on previous, the transition happens first, and we decrement the variable turn
document.querySelector('.previous').addEventListener("click", function(event) {
  turn--;
  checkBounds();
  console.log("here")
  document.querySelector('.slide').classList.add('slide-to-black');  
  setTimeout(function(){
  document.querySelector('.slide').classList.remove('slide-to-black');  
  },1000)
event.preventDefault();
});

// when you click on next, the transition happens first, and we incrementat of the variable turn
document.querySelector('.next').addEventListener("click", function(event) {
  turn++;
  checkBounds();
    document.querySelector('.slide').classList.add('slide-to-black');  
    setTimeout(function(){
    document.querySelector('.slide').classList.remove('slide-to-black');  
    },1000)
  event.preventDefault();
});

// once turn has been assigned a new value, we can change the content inside of it which depends on it
function previous(){
  insertContent(turn);
  ratingStars();
  pageDots();
}

function next() {
  insertContent(turn);
  ratingStars();
  pageDots();
}

// calling the functions with a delay so the transition between movies is smoother
function clickNext() {
  goNext = setTimeout(next, 700);
}

function clickPrevious() {
  goNext = setTimeout(previous, 700);
}

prevNode = document.querySelector('.previous'),
nextNode = document.querySelector('.next');

prevNode.onclick = clickPrevious;
nextNode.onclick = clickNext;