// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}

const game = document.querySelector('.game');
const card = document.getElementsByClassName('card');
const cards = [...card];
cards.forEach(card => card.addEventListener('click', flips));


// need to create a deck
let deck = document.querySelector('.deck');

// start a game
let startTime = new Date();
function start(){
  let shuffleCards = shuffle(cards);
  for(let i = 0; i < shuffleCards.length; i++){
    deck.appendChild(shuffleCards[i]);
  }
}

window.onload = start();

// end game
let endGameModal = document.querySelector('.modal');
function gameEnds(){
  game.classList.add('display-none');
  endGameModal.classList.remove('display-none');
  document.querySelector('.end-game-moves').innerHTML = moveCounter;
  document.querySelector('.end-game-ratings').appendChild(finalRating);
  endTimeConvert();
  endModal();
}

function endModal() {
  endGameModal.addEventListener('click', closeModal);
}

function closeModal(){
 endGameModal.remove();
 game.classList.remove('display-none');
 location.reload();
}

function endTimeConvert(){
  let endTime = new Date();
  let finalTime = (endTime - startTime);
  (finalTime /= 1000);
  let sec = Math.round(finalTime);
  if (sec > 60) {
    let min = sec / 60;
    min = Math.round(min);
    let newSec = sec % 60;
    document.querySelector('.end-game-time').innerHTML = min + ' minutes ' + newSec + ' seconds';
  } else {
    document.querySelector('.end-game-time').innerHTML = sec + ' seconds';
  }
}


// restart a game
let restart = document.querySelector('.restart');
restart.addEventListener('click', clear);

function clear(){
  document.getElementsByClassName('card');
  const oldCards = [...card];
  oldCards.forEach(card => card.classList.value = 'card');
  moveCounter = 0;
  document.querySelector('.moves').innerHTML = moveCounter;
  start();
  console.log('reshuffle success!');
  startTime = new Date();
  matchedPair = 0;
}

// function replay(){
//   matchedPair = 0;
//   game.classList.remove('display-none');
//   endGame.classList.add('display-none');
//   console.log(rating);
//   clear();
// }

// we can just reload page, so star ratings wouldn't be an issue

// counter and flip cards, each flip would det. star numbers

let matchedPair = 0; //if certain number of pairs reached then game ends, won't have to deal with complicated classlist stuff yay
let moveCounter = 0;
let flippedCardsList = [];
let rating = document.querySelector('.stars');
let finalRating;
/* star rating goes here */


function flips() {
  // this let's user not be able to flip card when logic is happening
  if (flippedCardsList.length === 2) {
    return;
  }

  this.classList.toggle("open");
  this.classList.toggle("show");
  flippedCardsList.push(this);

  moveCounter++;
  document.querySelector('.moves').innerHTML = moveCounter;

  //this solves the bug of clicking on same pair and win.

  if (flippedCardsList[0].classList.contains('match')) {
    flippedCardsList = [];
  }

  if (flippedCardsList.length === 2 ) {
    let firstCard = flippedCardsList[0].childNodes[1];
    let secondCard = flippedCardsList[1].childNodes[1];

    if (firstCard == secondCard) {
      sameCard();
    }

    if (firstCard.classList.value ==
        secondCard.classList.value &&
        firstCard != secondCard) {
        matched();
        matchedPair++;
        console.log(matchedPair);
        if (matchedPair == 2) {
          setTimeout(gameEnds, 500);
        }
    } else {
      notmatched();
    }

}

  if (moveCounter > 5 && moveCounter < 10) {
    rating.children[2].firstElementChild.classList.replace('fa-star','fa-star-o');
    finalRating = rating;
  } else if (moveCounter > 10) {
    rating.children[1].firstElementChild.classList.replace('fa-star','fa-star-o');
    finalRating = rating;
  } else if (moveCounter < 5) {
    finalRating = rating;
  }

}



// Animations and mathing go here after adding animate.css

function matchedAnimation(){
  flippedCardsList[0].classList.add('animated','rubberBand','match');
  flippedCardsList[1].classList.add('animated','rubberBand','match');
}

function unflipCard(){
  flippedCardsList[0].classList.remove('open','show');
  flippedCardsList[1].classList.remove('open','show');
}

function matched(){
  unflipCard();
  matchedAnimation();
  flippedCardsList = [];
}

function notmatchedAnimation(){
  unflipCard();
  flippedCardsList[0].classList.remove('animated','swing','wrong');
  flippedCardsList[1].classList.remove('animated','swing','wrong');
  flippedCardsList = [];
}

function notmatched(){
  flippedCardsList[0].classList.add('animated','wrong','swing');
  flippedCardsList[1].classList.add('animated','wrong','swing');
  setTimeout(notmatchedAnimation, 500);
}

function sameCard() {
  unflipCard();
  flippedCardsList = [];
}
