const card = document.getElementsByClassName('card');
const cards = [...card];

console.log(cards);


cards.forEach(card => card.addEventListener('click', flips));

let flippedCardsList = [];

function flips() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  flippedCardsList.push(this);

  if (flippedCardsList.length === 2 ) {
    if (flippedCardsList[0].childNodes[1].classList.value ==
        flippedCardsList[1].childNodes[1].classList.value) {
      console.log('theyre the same!');
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
