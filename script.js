// Our deal function will return a random card
var dealButton = $('#dealButton');
var hitButton = $('#hitButton');


function deal() {
  card = Math.floor(Math.random()*52+1);
  return card;
};


// Deal out our first hand

var card1 = deal();
var card2 = deal();
var hitCard;


// This function takes a card as a parameter and returns the value
// of that card
function getValue(card) {
  // if its a face card, number should be set to 10
    if(card % 13 > 10 || card % 13 === 0) {
        return card = 10;
    }
  // What if it's an ace?
    if(card % 13 === 1){
        return card = 11;
      }
  // Otherwise, we just want its number value
    return card % 13;
}

function getValueH(card) {
    if(card % 13 > 10 || card % 13 === 0) {
        return card = 10;
    }
    if(card % 13 === 1){
        return card = 11;
      }
    return card % 13;
}

var userScore = getValue(card1) + getValue(card2);


// Score the hand
function checkScore(){
  $('#userScore').text("Score: " + userScore);
  if(userScore === 21){
    alert("Blackjack!");
  } if(userScore < 21){
    $('#userScore').text("Score: " + userScore);
  } if(userScore > 21) {
    alert("You Lose!")
  }
}
// function score() {
//   userScore = getValue(card1) + getValue(card2) + getValue(hitCard);
//   return userScore;
// }

hitButton.click(function(){
  while(userScore < 21){
    hitCard = Math.floor(Math.random()*52+1);
    $('.card').last().append('<div class="card" id="hitCard">' + hitCard%13 + '</div>');
    userScore += getValueH(hitCard);
    $('#userScore').text("Score: " + userScore);
    checkScore();
    return userScore;
  }
});

dealButton.click(function(){
  card1 = 0;
  card2 = 0;
  userScore = 0;
  $('#userScore').text("Score: 0");
  $('#hitCard').remove();
  $('#userCard1').remove();
  $('#userCard2').remove();
  card1 = deal();
  card2 = deal();
  $('#userCard1').text(card1%13);
  $('#userCard2').text(card2%13);
  $('#userScore').text("Score: " + userScore);
});


checkScore();
$('#userCard1').text(card1%13);
$('#userCard2').text(card2%13);
$('#hitCard').text(hitCard%13);
$('#userScore').text("Score: " + userScore);
