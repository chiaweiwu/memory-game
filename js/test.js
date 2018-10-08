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

let card = document.getElementsByClassName('card');
let cards = [...card];
cards = shuffle(cards);
console.log(cards);


cards.forEach(card => card.addEventListener('click', flips));

let moveCounter = 0;
let flippedCardsList = [];

function flips() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  flippedCardsList.push(this);
  moveCounter++;
  document.querySelector('.moves').innerHTML = moveCounter;
  console.log(moveCounter);

  if (flippedCardsList.length === 2 ) {
    let firstCard = flippedCardsList[0].childNodes[1];
    let secondCard = flippedCardsList[1].childNodes[1];

    if (firstCard.classList.value ==
        secondCard.classList.value &&
        firstCard != secondCard) {
        console.log('theyre the same!'); // make sure code reach here
        matched();
    } else {
        console.log('theyre not the same!');
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
  setTimeout(notmatchedAnimation, 1000);
}
