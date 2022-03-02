
//Add so many things to this to make gameplay wayyyy better

var chips = 0;

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

var lottoOwned = 0;
var slotsOwned = 0;
var pokerOwned = 0;
var bljkOwned = 0;
var roulOwned = 0;

var updatesOwned = 0;

var lottoCost = 5;
var slotsCost = 25;
var pokerCost = 625;
var bljkCost = 1250;
var roulCost = 5000;

var updateCost = 25000;

var lottoMul = 0;
var slotsMul = 0;
var pokerMul = 0;
var bljkMul = 0;
var roulMul = 0;

setInterval(theCounter, 1000);
setInterval(theUpdate, 100);

function theCounter() {
    if (lotto > 0) {
        chips++;
        chips += (1 * lottoOwned);
    }
    if (slots > 0) {
        chips++;
        chips += (3 * slotsOwned);
    }
    if (poker > 0) {
        chips++;
        chips += (5 * pokerOwned);
    }
    if (bljk > 0) {
        chips++;
        chips += (7 * bljkOwned);
    }
    if (roul > 0) {
        chips++;
        chips += (9 * roulOwned);
    }
}

function theUpdate() {
    var chipsFormatted = formatter.format(chips);

    document.getElementById("btn").innerHTML = "Lotto! " + formatter.format(lottoCost);
    document.getElementById("btn1").innerHTML = "Slots! " + formatter.format(slotCost);
    document.getElementById("btn2").innerHTML = "Poker! " + formatter.format(pokerCost);
    document.getElementById("btn3").innerHTML = "BlackJack! " + formatter.format(bljkCost);
    document.getElementById("btn4").innerHTML = "Roulette! " + formatter.format(roulCost);
}

function chipClicked() {
    chips++;
}

function lottoClicked() {
    if (chips >= lottoCost) {
        lottoOwned++;
        chips -= lottoCost;

        lottoCost *= lottoMul;
    }
    else {
        munnyError(lottoCost);
    }
}

function slotsClicked() {
    if (lottoOwned >= 1 && chips >= slotsCost) {
        slotsOwned++;
        chips -= slotsCost;

        slotsCost *= slotsMul;
    }
    else {
        munnyError(slotsCost);
    }
}

function pokerClicked() {
    if (slotsOwned >= 1 && chips >= pokerCost) {
        pokerOwned++;
        chips -= pokerCost;

        pokerCost *= pokerMul;
    }
    else {
        munnyError(slotsCost);
    }
}

function bljkClicked() {
    if (pokerOwned >= 1 && chips >= bljkCost) {
        bljkOwned++;
        chips -= bljkCost;

        bljkCost *= bljkMul;
    }
    else {
        munnyError(bljkCost);
    }
}

function roulClicked() {
    if (bljkOwned >= 1 && chips >= roulCost) {
        roulOwned++;
        chips -= roulCost;

        roulCost *= roulMul;
    }
    else {
        munnyError(roulCost);
    }
}

function munnyError(cost) {
    //display error
}