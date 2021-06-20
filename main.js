'use strict';

const contentCards = ["😀","🤪","🥰","🥴","🤣", "🤠", "🥸", "🤬", "🤡", "👻"];
const $cards = document.querySelector('#cards');
const $endLayer = document.querySelector('#endGame');
const $restart = document.querySelector('#restart');
const $score = document.querySelector('.score__count');
const $scoreOk = document.querySelector('.score__rights');
const $scoreWrong = document.querySelector('.score__wrongs');

let firstCard, 
    secondCard, 
    checkCards = false, 
    lockCards = false,
    countMatchs = 0,
    wrongs = 0,
    rights = 0;

$restart.addEventListener('click', e => {
  e.preventDefault();
  startGame();
});    

function endGame(){
  setTimeout(() => {
    $endLayer.classList.add('active');  
  }, 700);
}

function checkMatch(){
  if(firstCard.dataset.id === secondCard.dataset.id){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    [checkCards, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
    ++rights;
    ++countMatchs;
    $scoreOk.textContent = countMatchs;
    if(countMatchs === contentCards.length){
      endGame();
    }
  }
  else{
    ++wrongs;
    $scoreWrong.textContent = wrongs;
    setTimeout(() =>{
      firstCard.classList.toggle('flip');
      secondCard.classList.toggle('flip');
      [checkCards, lockCards] = [false, false];
      [firstCard, secondCard] = [null, null];
    }, 1000);
  }
  $score.textContent = rights + wrongs;
}

function flipCard(){
  if(lockCards) return;
  if(firstCard === this) return;
  if(!checkCards){
    firstCard = this;
    this.classList.toggle('flip');
    checkCards = true;
  }
  else{
    secondCard = this;
    this.classList.toggle('flip');
    lockCards = true;
    checkMatch();
  }
}

function shuffleCards(arr){
  for(let i = 0; i < arr.length; ++i){
    arr[i].style.order = Math.floor(Math.random() * arr.length);
  }
}

function fillCards(){
  let allCards = [];
  
  contentCards.forEach((item, index) => {
    const card = document.createElement('DIV');
    const cardBack = document.createElement('DIV');
    const cardFront = document.createElement('DIV');
    card.classList.add('card');
    card.setAttribute('data-id', index);
    cardBack.classList.add('card__back');
    cardFront.classList.add('card__front');
    cardFront.textContent = item; 
    card.appendChild(cardBack);
    card.appendChild(cardFront);
    let cloneCard = card.cloneNode(true);
    allCards.push(card);
    allCards.push(cloneCard);
  });

  allCards.forEach(card => $cards.appendChild(card));
  allCards.forEach(card => card.addEventListener('click', flipCard));
  shuffleCards(allCards);
}

function startGame(){
  $cards.innerHTML = '';
  $endLayer.classList.remove('active');
  $score.textContent = $scoreOk.textContent = $scoreWrong.textContent = 0;
  countMatchs = wrongs = rights = 0;
  fillCards();
}

startGame();