var dealButton = $('#dealButton');
var hitButton = $('#hitButton');
var stayButton = $('#stayButton');

var deck;
var dealer;
var player = new Array();
var curPlayerHand;
var numPlayerHands;
var dealRoundCounter;
var aggScore = 0;

window.onload = startGame;


/////////// GENERIC GAME FUNCTIONS ///////////
function startGame() {

  deck = new Deck();
  newDeck();
  dealer = new Hand("dealer");
  player = new Hand("player");
  // for (i = 0; i < player.length; i++)
  //   player = new Hand("player" + i);
  document.getElementById("hitButton").disabled = true;
  document.getElementById("stayButton").disabled = true;
}

function startRound(){
  document.getElementById("hitButton").disabled = false;
  document.getElementById("stayButton").disabled = false;

  $('.hcard').remove();
  $("p").remove();


  dealer.reset();
  player.reset();

  // curPlayerHand = 0;
  // numPlayerHands = 1;

  dealRoundCounter = 1;
  dealRound();
}

function dealRound(){
  switch(dealRoundCounter){
    case 1:
      player.addCard(getNextCard());
      break;
    case 2:
      dealer.addCard(getNextCard());
      break;
    case 3:
      player.addCard(getNextCard());
      break;
    case 4:
      dealer.addCard(getNextCard());
      break;
    default:
      $('#userCard1').text(player.cards[0].rank + player.cards[0].suit);
      $('#userCard2').text(player.cards[1].rank + player.cards[1].suit);
      $('#dealerCard1').text(dealer.cards[0].rank + dealer.cards[0].suit);
      $('#dealerCard2').text(dealer.cards[1].rank + dealer.cards[1].suit);
      // $('#dealerCard2').text(" ");
      $('#dealerCard2').css("color", "white");
      $('#userScore').text("Your Score: " + player.getScore());
      $('#dealerScore').text("Dealer Shows: " + dealer.cards[0].rank);
      playRound();
      return;
      break;
  }
  // if(player.getScore() === 21){
  //   player.blackjack = true;
  //   alert("BlackJack!!!");
  // }
  dealRoundCounter += 1;
  // setInterval(dealRound, 1000); //should delay init dealing of cards
  dealRound();
}

function playRound(){
  if(player.getScore() === 21 && dealer.getScore() !== 21){
    player.blackjack = true;
    $('.scorecontainer').last().append('<p>Blackjack! You Win!!! 😎</p>');
    aggScore += 1;
    $('#aggScore').text("Cumulative Score: " + aggScore);
    endRound();
  }
  if(player.getScore() !== 21 && dealer.getScore() === 21){
    dealer.blackjack = true;
    $('.scorecontainer').last().append('<p>Dealer Has Blackjack!😲Tough Luck!</p>');
    $('#dealerCard2').css("color","black");
    aggScore -= 1;
    $('#aggScore').text("Cumulative Score: " + aggScore);
    endRound();
  }
  if(player.getScore() === 21 && dealer.getScore() === 21){
    player.blackjack = true;
    dealer.blackjack = true;
    $('.scorecontainer').last().append('<p>DOUBLE BJ! 😜</p>');
    $('#dealerCard2').css("color","black");
    endRound();
  }
  // if(player.blackjack || dealer.blackjack){
  //   endRound();
  //   return;
  // }
  // if(canSplit()){
  //   script for splits goes here!
  // }
}

//////// USER GAME FUNCTIONS /////////
/////Split fn to be implemented later
// function playerSplit(){
//   var x, y;
//   var card;
//
//   x = curPlayerHand;
//   y = numPlayerHands;
//   numPlayerHands +=1;
//
//   player.split = true;
//   player.split = true;
//
//   card = player.removeCard();
//   player.addCard(card);
//
//   //// add second card to both hands
//   setInterval(playerHit, 1000);  // add delay???
//   playerHit();
// }
// function playerDouble(){
//   scipt for double down goes here!
// }
function playerHit() {
  var x, y;
  var z = 1;
  z += 1;

  // x = curPlayerHand;
  player.addCard(getNextCard());
  $('.pcardcontainer').last().append('<div class="hcard" id="hitCard'+z+'"></div>');
  $('#hitCard'+z).text(player.cards[z].rank + player.cards[z].suit);

  y = player.getScore();

  if (y > 21) {
    $('#userScore').text('Your Score: ' + y);
    endRound();
    return;
  }
  else {
    $('#userScore').text('Your Score: ' + y);
  }
  if (y === 21 || player.doubledown){
    $('#userScore').text('Your Score: ' + y);
    endRound();
    return;
  }
  // if (player.split && player.cards.length === 2){
  //   if (player.split && player.cards[0].rank === "A"){
  //     $('#userScore').text('Your Score: ' + y);
  //     startNextHand();
  //     return;
  //   }
  //   if (canSplit()) {
  //     enable split & doubledown button
  //   }
  // }
}

function playerStay(){
  // if (dealer.getScore() >= 17 && player.getScore() > dealer.getScore()){
  //   alert("You Win!");
  // }
  startDealer();
  return;
}

// function for playing 2nd hand
// function startNextHand() {
//   // curPlayerHand += 1;
//   // if (curPlayerHand >= numPlayerHands) {
//     startDealer();
//     // return;
//   // }
// //   // else {
// //   //   functionality for splits
// //   // }
// }

function startDealer() {
  var i, bust;

  bust = true;
  if (player.getScore() <= 21){
      bust = false;
    }
  if (bust) {
    endRound();
    // return;
  }
  playDealer();
}

function playDealer() {
  var d;
  d = dealer.getScore();
  $('#dealerCard2').css("color","black");
  $('#dealerScore').text("Dealer Score: " + dealer.getScore());
  if (d < 17) {
    dealToDealer();
    return;
  }
  if (d > 21) {
    // alert("Dealer Busts! You Win!");
    // functionality to add score
    endRound();
  }
  endRound();
}

function dealToDealer() {
  var z = 2;
  dealer.addCard(getNextCard());
  $('.dcardcontainer').last().append('<div class="dcard" id="dealerHitCard"'+z+'></div>');
  $('#dealerHitCard').text(dealer.cards[z].rank + dealer.cards[z].suit);
  z+=1;
  playDealer();
}

function endRound() {
  document.getElementById("hitButton").disabled = true;
  document.getElementById("stayButton").disabled = true;
  $('#dealerCard2').css("color","black");
  var d, p;
  d = dealer.getScore();
  if(d < 21){
    $('#dealerScore').text('Score: ' + d);
  }

  p = player.getScore();

  if (p < 21 && d > 21) {
    $('.scorecontainer').last().append('<p>You Win! Dealer Busted!</p>');
    aggScore += 1;
    $('#aggScore').text("Cumulative Score: " + aggScore);
  }
  else if (p < 21 && p > d && d < 21) {
    $('.scorecontainer').last().append('<p>You Win!</p>');
    aggScore += 1;
    $('#aggScore').text("Cumulative Score: " + aggScore);
  }
  else if (p > 21){
    $('.scorecontainer').last().append('<p>Bust! You lose, loser!</p>');
    aggScore -= 1;
    $('#aggScore').text("Cumulative Score: " + aggScore);
  }
  else if (p < d && p < 21 && d < 21) {
    $('.scorecontainer').last().append('<p>You Lose... 😲</p>');
    aggScore -= 1;
    $('#aggScore').text("Cumulative Score: " + aggScore);
  }
  else if (player.getScore() === dealer.getScore()) {
    $('.scorecontainer').last().append('<p>Push!</p>');
  }
}



// Create a Card object constructor
function Card(rank,suit){
  this.rank = rank;
  this.suit = suit;

  // this.toString   = cardToString;
  // this.createNode = cardCreateNode;
}

// Create the Deck object
function Deck() {
  this.cards = new Array();
  this.makeDeck = deckMakeDeck;
  this.shuffle = deckShuffle;
  this.deal = deckDeal;
  this.draw = deckDraw;
  this.addCard = deckAddCard;
  this.combine = deckCombine;
  this.cardCount = deckCounter;
}

// Create the Hand object
function Hand(id) {
  this.cards = new Array();
  this.reset = handReset;
  this.addCard = handAddCard;
  // this.removeCard = handRemoveCard;
  this.getScore = handGetScore;
  // this.clearCards = handClearCards;

  this.reset();
}

////// DECK FUNCTIONS ///////////
//function to contruct deck, takes parameter 'n' to determine amount of decks.
function deckMakeDeck(n) {
  var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9","10", "J",
  "Q", "K");
  var suits = new Array("♣︎", "♦︎", "♥︎", "♠︎");
  var i;
  var j;
  var k;
  var m;

  m = ranks.length * suits.length;
  this.cards = new Array(n * m);

// Fill the array with 'n' packs of cards.

  for (i = 0; i < n; i++)
    for (j = 0; j < suits.length; j++)
      for (k = 0; k < ranks.length; k++)
        this.cards[i * m + j * ranks.length + k] =
          new Card(ranks[k], suits[j]);
}

//function to randomize order of cards
function deckShuffle(n) {
  var i, j, k;
  var temp;

  for (i = 0; i < n; i++)
    for (j = 0; j < this.cards.length; j++) {
      k = Math.floor(Math.random() * this.cards.length);
      temp = this.cards[j];
      this.cards[j] = this.cards[k];
      this.cards[k] = temp;
    }
}

//deal function
function deckDeal() {
  if (this.cards.length > 0){
    return this.cards.shift();
  } else {
    return null;
  }
}

function deckDraw(n) {
  var card;
  if (n >= 0 && n < this.cards.length) {
    card = this.cards[n];
    this.cards.splice(n, 1);
  } else {
    card = null;
  }
  return card;
}

function deckAddCard(card) {
  this.cards.push(card);
}

//function to combine multiple decks
function deckCombine(deck) {
  this.cards = this.cards.concat(deck.cards);
  deck.cards = new Array();
}

//function to compute amount of cards left in deck
function deckCounter() {
  return this.cards.length;
}

//function to create 3-deck stack shuffled 5 times that will be used
function newDeck() {
  deck.makeDeck(3);
  deck.shuffle(5);
}

//function to create new deck when cardCount = 0
function getNextCard() {
  if(deck.cardCount() === 0){
    alert("New Deck");
    newDeck();
  }
  return deck.deal();
}

///////// HAND FUNCTIONS //////////
// Function to remove any cards and initialize properties of hand
function handReset() {
  // this.clearCards();

  this.cards = new Array();
  this.blackjack = false;
  this.split = false;
  this.doubledown = false;
}


function handAddCard(card) {
  var n;

  n = this.cards.length;
  this.cards[n] = card;
}

// Remove the last card in the array and save it for a split
// function handRemoveCard() {
//
//   var card;
//
//   card = null;
//   if (this.cards.length > 0) {
//     card = this.cards.pop();
//   }
//   return card;
// }

// function handClearCards() {
//   if(this.cards.length > 3){
//     $((this).last().remove());
//   }

function handGetScore() {
  var i;
  var score = 0;

  // Initially count aces as 1
  for (i = 0; i < this.cards.length; i++)
    if (this.cards[i].rank === "A"){
      score += 1;
    }
    else if (this.cards[i].rank === "J" || this.cards[i].rank === "Q" ||
          this.cards[i].rank === "K"){
        score += 10;
      }
    else{
        score += parseInt(this.cards[i].rank, 10);
      }

  for (i = 0; i < this.cards.length; i++)
    if (this.cards[i].rank === "A" && score <= 11){
      score += 10;
    }
  return score;
}


dealButton.click(startRound);

hitButton.click(playerHit);

stayButton.click(playerStay);
