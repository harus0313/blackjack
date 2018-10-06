
'use strict';

let $ = require('jquery');
var dealcards = [];
var playercards = [];
var dealcardsidx = 0;
var playercardsidx = 0;

var clubscards = [];
var clubscardsidx = 0;

var diamondscards = [];
var diamondscardsidx = 0;

var heartscards = [];
var heartscardsidx = 0;

var spadescards = [];
var spadescardsidx = 0;

var dealerScore = 0;
var playerScore = 0;

var timeLimit = 60;
var score = 100;

$(".deal").click(function(){
    deal("player");

    if(dealerScore < 17){
        deal("dealer");
    }


})

$(".reset").click(function(){

    dealcards = [];
    playercards = [];
    dealcardsidx = 0;
    playercardsidx = 0;

    clubscards = [];
    clubscardsidx = 0;

    diamondscards = [];
    diamondscardsidx = 0;

    heartscards = [];
    heartscardsidx = 0;

    spadescards = [];
    spadescardsidx = 0;

    dealerScore = 0;
    playerScore = 0;

    $(".dealer").children(".container").html("");
    $(".player").children(".container").html("");
    $(".message").text("");
    $(".stand").css("display", "inline");
    $(".deal").css("display", "inline");
    $(".reset").css("display", "none");

    deal("dealer");
    deal("player");

    deal("dealer");
    deal("player");

})

$(".stand").click(function(){

    while (dealerScore <= 17) {
        deal("dealer");
    }

    $(".trumpFront").css("display", "block");
    $(".trumpBack").css("display", "none");
    $(".DealerScore").text("Dealer's Score " + dealerScore);

    if ( isBust() == true){
        $(".stand").css("display", "none");
        $(".deal").css("display", "none");
        $(".reset").css("display", "inline");
    }else{
        if (dealerScore < playerScore){
            $(".message").text("You win !");
            scoreing("player");
        }else{
            if(dealerScore > playerScore){
                $(".message").text("You lose...");
                scoreing("dealer");
            }else{
                $(".message").text("Draw");
            }
        }
    }


    $(".stand").css("display", "none");
    $(".deal").css("display", "none");
    $(".reset").css("display", "inline");

})

function isBust(){

    console.log("isBust()");

    let bustStatus = false;

    if (dealerScore > 21 && playerScore > 21){
        $(".message").text("draw");
        bustStatus = true;
    }else{
        if(dealerScore > 21 && playerScore <= 21){
            $(".message").text("you win! dealer bust");
            bustStatus = true;
            scoreing("player");
        }else{
            if(dealerScore <= 21 && playerScore > 21){
                $(".message").text("you lose. you bust");
                bustStatus = true;
                scoreing("dealer");
            }
        }
    }

    if (bustStatus == true){
        $(".trumpFront").css("display", "block");
        $(".trumpBack").css("display", "none");
        $(".DealerScore").text("Dealer's Score " + dealerScore);
    }

    return bustStatus;

}

$(document).ready(function(){
    let htmlstr = "";
    let cardimgsrc = "";
    let i = 0;
    let hsize = 0;

    countDown();

    deal("dealer");
    deal("player");

    deal("dealer");
    deal("player");

    $(".score").text("Score: " + score);
    hsize = $(window).height();
    $(".board").css("height", hsize + "px");


    /*
    for (let i = 0; i < 26; i++) {
        deal("dealer");
        deal("player");
    }

    deal("dealer");
    deal("player");
*/




/*
    dealcards[dealcardsidx] = dealcard();
    cardimgsrc = get_cardimgsrc(dealcards[dealcardsidx]);

    htmlstr = ""
    htmlstr = htmlstr + "<div class='row'>";
    htmlstr = htmlstr + "    <img class='trumpCard' src='" + cardimgsrc + "'>";
    htmlstr = htmlstr + "    <br>";
    htmlstr = htmlstr + "    <p class='dealedCardStr'>" + dealcards[0].symbol + " " + dealcards[0].cardnumber + "</p>";
    htmlstr = htmlstr + "</div>";
    $(".dealer").children(".container").append(htmlstr);

    console.log("dealcards[" + dealcardsidx + "].symbol : " + dealcards[dealcardsidx].symbol);
    console.log("dealcards[" + dealcardsidx + "].cardnumber : " + dealcards[dealcardsidx].cardnumber);
    

    playercards[playercardsidx] = dealcard();
    cardimgsrc = get_cardimgsrc(playercards[playercardsidx]);
    htmlstr = ""
    htmlstr = htmlstr + "<div class='row'>";
    htmlstr = htmlstr + "    <img class='trumpCard' src='" + cardimgsrc + "'>";
    htmlstr = htmlstr + "    <br>";
    htmlstr = htmlstr + "    <p class='dealedCardStr'>" + playercards[0].symbol + " " + playercards[0].cardnumber + "</p>";
    htmlstr = htmlstr + "</div>";


    $(".player").children(".container").append(htmlstr);
    console.log("playercards[" + playercardsidx + "].symbol : " + playercards[playercardsidx].symbol);
    console.log("playercards[" + playercardsidx + "].cardnumber : " + playercards[playercardsidx].cardnumber);
*/

});

function scoreing(side){
    console.log("score = " + score);
    if(side=="dealer"){
        score = Math.floor(score / 2);
    }else{
        score = score * 2;
    }

    $(".score").text("Score: " + score);
    console.log("score = " + score);
}

function deal(side){

    let htmlstr = "";
    let cardimgsrc = "";
    let dealedCard;
    let idx = 0;

    dealedCard = dealcard();
    cardimgsrc = get_cardimgsrc(dealedCard);

    if (side == "dealer"){
        dealcards[dealcardsidx] = dealedCard;
        dealcardsidx = dealcardsidx + 1;
        idx = dealcardsidx;
//        cardimgsrc = get_cardimgsrc(dealcards[dealcardsidx]);
    }else{
        playercards[playercardsidx] = dealedCard;
        playercardsidx = playercardsidx + 1;
        idx = playercardsidx;
//        cardimgsrc = get_cardimgsrc(playercards[playercardsidx]);
    }

    addScore(side, dealedCard);




    htmlstr = ""
    htmlstr = htmlstr + "<div class='row'>";

    if (side == "dealer"){
        htmlstr = htmlstr + "    <img class='" + side + " trumpCard didx" + idx + " trumpFront' src='" + cardimgsrc + "' style='display: none;' >";
        htmlstr = htmlstr + "    <img class='" + side + " trumpCard didx" + idx + " trumpBack' src='/img/card_back.png'>";
    }else{
        htmlstr = htmlstr + "    <img class='" + side + " trumpCard didx" + idx + " ' src='" + cardimgsrc + "' >";
    }
    htmlstr = htmlstr + "    <br>";

    
    htmlstr = htmlstr + "</div>";

    if(side == "dealer"){
        $(".dealer").children(".container").append(htmlstr);
    }else{
        $(".player").children(".container").append(htmlstr);
    }

    if(idx > 1){
        $(".didx" + idx).animate({
            marginLeft: "-20px"
        }, 200, function(){
    
        });
    }

    if (isBust() == true){
        $(".stand").css("display", "none");
        $(".deal").css("display", "none");
        $(".reset").css("display", "inline");

    };


};

function addScore(side, card){
    let score = 0;
    switch (card.cardnumber) {
        case 'A':
            score = 11;            
            break;
        case 'J':
            score = 10;            
            break;
        case 'Q':
            score = 10;            
            break;
        case 'K':
            score = 10;            
            break;
    
        default:
            score = card.cardnumber;            
            break;
    }

    if(side == "dealer"){
        dealerScore = dealerScore + score;
//        $(".DealerScore").text("Dealer's Score " + dealerScore);
        $(".DealerScore").text("Dealer's Score XX");
    }else{
        playerScore = playerScore + score;
        $(".PlayerScore").text("Player's Score " + playerScore);
    }

}

function dealcard(){
    var card = new Object();

    let symbolnum = 0;
    let symbol = '';
    let numbernum = 0;
    let cardnumber = '';

    symbolnum = Math.floor(Math.random()*4)+1;
    symbol = getSymbol(symbolnum);
    numbernum = Math.floor(Math.random()*13)+1;
    cardnumber = getNumber(numbernum);

    while (isNotDealed(symbol, cardnumber) == false) {
        symbolnum = Math.floor(Math.random()*4)+1;
        symbol = getSymbol(symbolnum);
        numbernum = Math.floor(Math.random()*13)+1;
        cardnumber = getNumber(numbernum);
    }


    switch(symbol){
        case 'clubs':
            clubscards[clubscardsidx] = cardnumber;
            clubscardsidx = clubscardsidx + 1;
            break;
        case 'diamonds':
            diamondscards[diamondscardsidx] = cardnumber;
            diamondscardsidx = diamondscardsidx + 1;
            break;
        case 'hearts':
            heartscards[heartscardsidx] = cardnumber;
            heartscardsidx = heartscardsidx + 1;
            break;
        case 'spades':
            spadescards[spadescardsidx] = cardnumber;
            spadescardsidx = spadescardsidx + 1;
            break;

    }

    card.symbol = symbol;
    card.cardnumber = cardnumber;

    return card;

}

function isNotDealed(symbol, number){
    let i = 0;

    switch (symbol) {
        case "clubs":
            for (let i = 0; i < clubscards.length; i++) {
                if(clubscards[i]==number){
                    return false;
                }
            }            
            break;

        case "diamonds":
            for (let i = 0; i < diamondscards.length; i++) {
                if(diamondscards[i]==number){
                    return false;
                }
            }            
            break;

        case "hearts":
            for (let i = 0; i < heartscards.length; i++) {
                if(heartscards[i]==number){
                    return false;
                }
            }            
            break;

        case "spades":
            for (let i = 0; i < spadescards.length; i++) {
                if(spadescards[i]==number){
                    return false;
                }
            }            
            break;
    }

    return true;

}


function getSymbol(symbolnum){
    switch (symbolnum) {
        case 1:
            return 'clubs';
            break;
        case 2:
            return 'diamonds';
            break;
        case 3:
            return 'hearts';
            break;
        default:
            return 'spades';
            break;
    }
}

function getNumber(numbernum){
    switch (numbernum) {
        case 1:
            return 'A';
            break;
        case 11:
            return 'J';
            break;
        case 12:
            return 'Q';
            break;
        case 13:
            return 'K';
            break;
        default:
            return numbernum;
            break;
    }
}


function get_cardimgsrc(card){
    let numstr = "";
    let symstr = "";
    let cardimgsrc = "";

    switch (card.cardnumber){
        case "A":
            numstr = "ace";
            break;
        case "J":
            numstr = "jack";
            break;
        case "Q":
            numstr = "queen";
            break;
        case "K":
            numstr = "king";
            break;
        default:
            numstr = card.cardnumber;
            break;
    }

    cardimgsrc = "/img/SVG-cards/";
    cardimgsrc = cardimgsrc + numstr + "_of_" + card.symbol + ".svg";
    return cardimgsrc;

}

function countDown(){
    var leftTIme = timeLimit;

    var id = setInterval(function(){
        leftTIme = leftTIme - 1;
        $(".leftTime").text("Remaining Time: " + leftTIme);

        if(leftTIme <= 0){
            clearInterval(id);
        }
    
    }, 1000);


}

