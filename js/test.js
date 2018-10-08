const card = document.getElementsByClassName('card');
const cards = [...card];

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
      setTimeout(notmatched, 500);
    }
  }

}

function matched(){
  flippedCardsList[0].classList.add('match');
  flippedCardsList[1].classList.add('match');
  flippedCardsList[0].classList.remove('open','show');
  flippedCardsList[1].classList.remove('open','show');
  flippedCardsList = [];
}

function notmatched(){
  flippedCardsList[0].classList.remove('open','show');
  flippedCardsList[1].classList.remove('open','show');
  flippedCardsList = [];
}
