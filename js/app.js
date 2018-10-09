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


/*
 * Create a list that holds all of your cards
 */
 const game = document.querySelector('.game');
 const card = document.getElementsByClassName('card');
 const cards = [...card];

 /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */


cards.forEach(card => card.addEventListener('click', flips));


// need to create a deck & counter
let deck = document.querySelector('.deck');
let moveCounter = 0;

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
let endGame = document.querySelector('.end-game');
function gameEnds(){
  game.classList.add('display-none');
  endGame.classList.remove('display-none');
  document.querySelector('.end-game-moves').innerHTML = moveCounter;
  endTimeConvert();
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
  startTime = new Date();
  matchedPair = 0;
}

function replay(){
  matchedPair = 0;
  game.classList.remove('display-none');
  endGame.classList.add('display-none');
  clear();
}

// flip cards

let matchedPair = 0;
let flippedCardsList = [];

function flips() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  flippedCardsList.push(this);

  moveCounter++;
  document.querySelector('.moves').innerHTML = moveCounter;

  if (flippedCardsList.length === 2 ) {
    let firstCard = flippedCardsList[0].childNodes[1];
    let secondCard = flippedCardsList[1].childNodes[1];

    if (firstCard.classList.value ==
        secondCard.classList.value &&
        firstCard != secondCard) {
        matched();
        matchedPair++;

        if (matchedPair == 8) {
          gameEnds();
        }
    } else if (firstCard == secondCard) {
        sameCard();
    }else {
        notmatched();
    }
  }


}

// Animations and mathing go here after adding animate.css

function matchedAnimation(){
  flippedCardsList[0].classList.add('animated','rubberBand','match');
  flippedCardsList[1].classList.add('animated','rubberBand','match');
}

function matched(){
  matchedAnimation();
  flippedCardsList[0].classList.remove('open','show');
  flippedCardsList[1].classList.remove('open','show');
  flippedCardsList = [];
}


function notmatchedAnimation(){
  flippedCardsList[0].classList.remove('open','show','animated','swing','wrong');
  flippedCardsList[1].classList.remove('open','show','animated','swing','wrong');
  flippedCardsList = [];
}

function notmatched(){
  flippedCardsList[0].classList.add('animated','wrong','swing');
  flippedCardsList[1].classList.add('animated','wrong','swing');
  setTimeout(notmatchedAnimation, 800);
}

function sameCard() {
  flippedCardsList[0].classList.remove('open','show');
  flippedCardsList[1].classList.remove('open','show');
  flippedCardsList = [];
}
