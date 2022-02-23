var chips = 0;

var slots = 0;
var poker = 0;
var bljk = 0;
var roul = 0;

var updates = 0;

var slotCost = 10;
var pokerCost = 25;
var bljkCost = 40;
var roulCost = 55;

var updateCost = 25000;

var slotsMul = 0;
var pokerMul = 0;
var bljkMul = 0;
var roulMul = 0;

var slotC = 0;
var pokerC = 0;
var bljkC = 0;
var roulC = 0;

var randomMoney = 150;

var randomGood1;
var randomGood2;
var randomBad1;
var randomBad2;

var can = document.getElementById("theCanvas");
var context = can.getContext("2d");

var img = document.getElementById("pokerCarpet")
context.drawImage(img, 10, 10);

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

setInterval(theCounter, 1000);
setInterval(theUpdate, 100);

function theCounter() {

    //earn money each second
    if (slots > 0) {
        chips++
        chips = chips + slotsMul;
    }
    if (poker > 0) {
        chips++
        chips = chips + pokerMul;
    }
    if (bljk > 0) {
        chips++
        chips = chips + bljkMul;
    }
    if (roul > 0) {
        chips++
        chips = chips + roulMul;
    } //this probably has issue
}

function theUpdate() {

    var chipsFormatted = formatter.format(chips);

    //update the Money and cost of each item
    document.getElementById("Money").innerHTML = chipsFormatted;

    document.getElementById("btn").innerHTML = "Slots!" + formatter.format(slotCost);
    document.getElementById("btn2").innerHTML = "Poker!" + formatter.format(pokerCost);
    document.getElementById("btn3").innerHTML = "BlackJack!" + formatter.format(bljkCost);
    document.getElementById("btn4").innerHTML = "Roulette!" + formatter.format(roulCost);

    document.getElementById("btn5").innerHTML = "Update!" + formatter.format(updateCost);

    document.getElementById("slotDisplay").innerHTML = "Slots: " + slots;
    document.getElementById("pokerDisplay").innerHTML = "Poker: " + poker;
    document.getElementById("bljkDisplay").innerHTML = "BlackJack: " + bljk;
    document.getElementById("roulDisplay").innerHTML = "Roulette: " + roul;

    //DoubleMoney event & HalfMoney event
    if (chips >= randomMoney) {
        randomGood1 = Math.floor(Math.random() * 11);
        randomGood2 = Math.floor(Math.random() * 11);

        randomBad1 = Math.floor(Math.random() * 11);
        randomBad2 = Math.floor(Math.random() * 11);
    }

    //Random chance for good to happen
    if (randomGood1 == 5 && randomGood2 == 7) {
        chips *= 2;

        randomGood1 = 0;
        randomGood2 = 0;
    }

    //Random chance for bad to happen
    if (randomBad1 == 3 && randomBad2 == 9) {
        chips = chips / 2;

        randomBad1 = 0;
        randomBad2 = 0;
    }

    console.log(chipsFormatted);
}

function tokenClicked() {
    //money click
    chips++
}

function slotsClicked() {

    //slots cost
    //cannot buy if money is less than cost
    if (chips >= slotCost) {
        slots++
        slotsMul = 1 * slots;
        console.log("Slots: " + slots);
        chips -= slotCost;

        slotC++;

        if (slotC >= 5) {
            slotC = 0;
        }
        if (slotC == 4) {
            slotCost = slotCost * 2;
        }

        document.getElementById('slots').style.display = 'block';
        document.getElementById("slotDisplay").style.display = 'block';
    }
    //log money and needed amount if money is not enough
    else {
        // console.log("Not Enough Muns: " + chips);
        // console.log("Needed: " + slotCost);

        munnyError(slotCost);
    }

}

function pokerClicked() {
    //poker cost
    //cannot buy if money is less than cost
    if (chips >= pokerCost) {
        poker++
        pokerMul = 3 * poker;
        console.log("Poker: " + poker);
        chips -= pokerCost;

        pokerC++;

        if (pokerC >= 5) {
            pokerC = 0;
        }
        if (poker == 4) {
            pokerCost = pokerCost * 2;
        }

        document.getElementById('poker').style.display = 'block';
        document.getElementById("pokerDisplay").style.display = 'block';
    }
    //log money and needed amount if money is not enough
    else {
        // console.log("Not Enough Muns: " + chips);
        // console.log("Needed: 25");

        munnyError(pokerCost);
    }
}

function bljkClicked() {
    //bljk cost
    //cannot buy if money is less than cost
    if (chips >= bljkCost) {
        bljk++
        bljkMul = 7 * bljk;
        console.log("BlackJack: " + bljk);
        chips -= bljkCost;

        bljkC++

        if (bljkC >= 5) {
            bljkC = 0;
        }
        if (bljk == 4) {
            bljkCost = bljkCost * 2;
        }

        document.getElementById('bljk').style.display = 'block';
        document.getElementById("bljkDisplay").style.display = 'block';
    }
    //log money and needed amount if money is not enough
    else {
        // console.log("Not Enough Muns: " + chips);
        // console.log("Needed: 40");

        munnyError(bljkCost);
    }
}

function roulClicked() {
    //roul cost
    //cannot buy if money is less than cost
    if (chips >= roulCost) {
        roul++
        roulMul = 12 * roul;
        console.log("Roulette: " + roul);
        chips -= roulCost;

        roulC++

        if (roulC >= 5) {
            roulC = 0;
        }
        if (roul == 4) {
            roulCost = roulCost * 2;
        }

        document.getElementById('roul').style.display = 'block';
        document.getElementById("roulDisplay").style.display = 'block';
    }
    //log money and needed amount if money is not enough
    else {
        // console.log("Not Enough Muns: " + chips);
        // console.log("Needed: 55");

        munnyError(roulCost);
    }
}

function updateClicked() {

    //cannot buy if money is less than cost and if first update
    if (updates == 0 && chips >= updateCost) {
        //make everything expensive
        slotCost * 5;
        pokerCost * 5;
        bljkCost * 5;
        roulCost * 5;

        chips -= updateCost;

        randomMoney = 1000;

        updateCost == 900000;
    }
    else {
        munnyError(updateCost);
    }
    //cannot buy if money is less than cost and if first update
    if (updates == 1 && chips >= updateCost) {
        //make everything expensive
        slotCost * 10;
        pokerCost * 10;
        bljkCost * 10;
        roulCost * 10;

        chips -= updateCost;

        randomMoney = 100000;

        updateCost == 2500000;
    }
    else {
        munnyError(updateCost);
    }
    //cannot buy if money is less than cost and if first update
    if (updates == 2 && chips >= updateCost) {
        //make everything expensive
        slotCost * 15;
        pokerCost * 15;
        bljkCost * 15;
        roulCost * 15;

        randomMoney = 100000000;

        chips -= updateCost;
    }
    else {
        munnyError(updateCost);
    }

}

function munnyError(cost) {
    //displays error message
    console.log("Not enough Muns: " + cost)
}