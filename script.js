const cardDeck = document.getElementById("card-deck");
// card checker function
function cardCheck(one, two) {
  // one, twp are the card element
  let cardOne = one.childNodes[3]; // back div 1st card
  let cardTwo = two.childNodes[3]; // back div 2nd card

  // same card function
  if (one.id == two.id) {
    alert("pick another card");
  }
  // correct card function
  if (cardOne.innerText == cardTwo.innerText && one.id != two.id) {
    // adding green color to the back div
    cardOne.classList.add("correct");
    cardTwo.classList.add("correct");
    // changing the card id
    one.id = "Correct";
    two.id = "Correct";
  }
  // wrong card function
  else {
    // adding red color to the back div
    cardOne.classList.add("wrong");
    cardTwo.classList.add("wrong");
    setTimeout(() => {
      // unflip the card
      one.classList.remove("showBack");
      two.classList.remove("showBack");
    }, 1000);
    setTimeout(() => {
      //remove red color from the back div
      cardOne.classList.remove("wrong");
      cardTwo.classList.remove("wrong");
    }, 1500);
  }
}
// card flip function
let cardId;
let tempCard;
let cardCount = 0;
function flip(card) {
  //class = showBack , showFront
  //back contains value, front hides value
  card.classList.add("showBack");
  cardId = card;
  cardCount++;
  if (cardCount == 2) {
    cardCount = 0;
    cardCheck(tempCard, cardId);
  } else {
    tempCard = cardId;
  }
  winCondition();
  win = 0;
}
// random number generator
function randomNumber(number) {
  return Math.floor(Math.random() * number + 1);
}
// card value generator
let char = "ABCDEFGH";
generatorValue(char);
function generatorValue(char) {
  let border = 2;
  for (let i = 0; i < char.length; i++) {
    //border is to forbid the character from being picked more than twice
    while (border > 0) {
      let randomCard = randomNumber(16); // random card selection from 1-16 id
      let card = document.getElementById(`${randomCard}`);
      if (card.innerText == "") {
        card.innerText = char[i];
        border--;
      } else {
        do {
          // pick a random card  until the empty card is selected
          randomCard = randomNumber(16);
          card = document.getElementById(`${randomCard}`);
        } while (card.innerText != "");
        //if we found the card insert the value
        card.innerText = char[i];
        border--;
      }
    }
    //reset the border for char[i+1];
    border = 2;
  }
}
let win = 0;
const restart = document.getElementById('restart');
function winCondition() {
  let max = cardDeck.childElementCount;
  console.log(max);
  for (let i = 0; i < max; i++) {
    let card = cardDeck.children[i];
    console.log("checking winner");
    console.log(card.id);
    if (card.id == "Correct") {
      win++;
    }
  }
  console.log(win);
  if (win == cardDeck.childElementCount) {
    setTimeout(() => {
      alert("Congratulations, you win!");
    }, 1500);
    win = 0;
    restart.style.display = 'block';
  }
}
function restartButton(){
  let totalCard = cardDeck.childElementCount;
  for(let i = 0; i < totalCard; i++) {
    let card = cardDeck.children[i];
    let backCard = card.children[1];
    console.log(card);
    card.id = `card-${i+1}`;
    backCard.classList.remove('correct');
    card.classList.remove('showBack');  
    console.log(backCard.innerText);
    backCard.innerText = '';
  }
  generatorValue(char);
  restart.style.display = 'none';
}