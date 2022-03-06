
var chips = 0;

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

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

var lottoMul = 2;
var slotsMul = 2;
var pokerMul = 2;
var bljkMul = 3;
var roulMul = 3;

setInterval(theCounter, 1000);
setInterval(theUpdate, 100);

function theCounter() {

    //earn money each second
    if (lottoOwned > 0) {
        chips++;
        chips = chips + (1 * lottoOwned);
    }
    if (slotsOwned > 0) {
        chips++;
        chips += (3 * slotsOwned);
    }
    if (pokerOwned > 0) {
        chips++;
        chips += (5 * pokerOwned);
    }
    if (bljkOwned > 0) {
        chips++;
        chips += (7 * bljkOwned);
    }
    if (roulOwned > 0) {
        chips++;
        chips += (9 * roulOwned);
    }

}

function theUpdate() {
    var chipsFormatted = formatter.format(chips);

    //update the Money and cost of each item
    document.getElementById("Money").innerHTML = chipsFormatted;

    document.getElementById("btn").innerHTML = "Lotto! $" + lottoCost + "\nOwned: " + lottoOwned;

    document.getElementById("btn1").innerHTML = "Slots! $" + slotsCost + "\nOwned: " + slotsOwned;

    document.getElementById("btn2").innerHTML = "Poker! $" + pokerCost + "\nOwned: " + pokerOwned;

    document.getElementById("btn3").innerHTML = "BlackJack! $" + bljkCost + "\nOwned: " + bljkOwned;

    document.getElementById("btn4").innerHTML = "Roulette! $" + roulCost + "\nOwned: " + roulOwned;

    document.getElementById("btn5").innerHTML = "Update! $" + updateCost;

    if (chips < lottoCost) {
        document.getElementById("btn").setAttribute("disabled", "disabled");
    }
    else {
        document.getElementById("btn").removeAttribute("disabled");
    }

    if (chips < slotsCost) {
        document.getElementById("btn1").setAttribute("disabled", "disabled");
    }
    else {
        document.getElementById("btn1").removeAttribute("disabled");
    }

    if (chips < pokerCost) {
        document.getElementById("btn2").setAttribute("disabled", "disabled");
    }
    else {
        document.getElementById("btn2").removeAttribute("disabled");
    }

    if (chips < bljkCost) {
        document.getElementById("btn3").setAttribute("disabled", "disabled");
    }
    else {
        document.getElementById("btn3").removeAttribute("disabled");
    }

    if (chips < roulCost) {
        document.getElementById("btn4").setAttribute("disabled", "disabled");
    }
    else {
        document.getElementById("btn4").removeAttribute("disabled");
    }

    if (chips < updateCost) {
        document.getElementById("btn5").setAttribute("disabled", "disabled");
    }
    else {
        document.getElementById("btn5").removeAttribute("disabled");
    }

    if (updatesOwned == 0) {
        document.getElementById("btn3").style.backgroundColor = "#0062B8";
        document.getElementById("btn3").style.borderColor = "#0062B8";

        document.getElementById("btn4").style.backgroundColor = "#0062B8";
        document.getElementById("btn4").style.borderColor = "#0062B8";
    }

    if (updatesOwned == 3) {
        document.getElementById("btn5").setAttribute("disabled", "disabled");
    }

}

function chipClicked() {
    //money click
    chips++
}

function lottoClicked() {
    if (chips >= lottoCost) {
        lottoOwned++;
        chips -= lottoCost;

        lottoCost *= lottoMul;

        lottoMul++;

        document.getElementById('lotto').style.display = 'block';
    }
}

function slotsClicked() {
    if (chips >= slotsCost) {
        slotsOwned++;
        chips -= slotsCost;

        slotsCost *= slotsMul;

        slotsMul++;

        document.getElementById('slots').style.display = 'block';
    }
}

function pokerClicked() {
    if (chips >= pokerCost) {
        pokerOwned++;
        chips -= pokerCost;

        pokerCost *= pokerMul;

        pokerMul++;

        document.getElementById('poker').style.display = 'block';
    }
}

function bljkClicked() {
    if (chips >= bljkCost) {
        bljkOwned++;
        chips -= bljkCost;

        bljkCost *= bljkMul;

        bljkMul++;

        document.getElementById('bljk').style.display = 'block';
    }
}

function roulClicked() {
    if (chips >= roulCost) {
        roulOwned++;
        chips -= roulCost;

        roulCost *= roulMul;

        roulMul++;

        document.getElementById('roul').style.display = 'block';
    }
}

function updateClicked() {
    if (chips >= updateCost) {
        if (updatesOwned == 0) {
            chips -= updateCost;

            document.getElementById("btn3").removeAttribute("disabled");
            document.getElementById("btn4").removeAttribute("disabled");

            document.getElementById("btn3").style.backgroundColor = "";
            document.getElementById("btn3").style.border = "";

            document.getElementById("btn4").style.backgroundColor = "";
            document.getElementById("btn3").style.border = "";

            updateCost = 100000;
            updatesOwned += 1;

            console.log("Updates: " + updatesOwned);

            return;
        }
        if (updatesOwned == 1) {
            chips -= updateCost;

            updateCost = 2500000;
            updatesOwned += 1;

            document.getElementById("Background").style.backgroundImage = "url(/images/Casino/casinoCarpet.jpg)";
            console.log("Updates: " + updatesOwned);

            return;
        }
        if (updatesOwned == 2) {
            chips -= updateCost;

            document.getElementById("Body").style.backgroundImage = "url(/images/Casino/NeonLights.gif)";

            updatesOwned += 1;

            return;
        }
    }
}

function munnyError(cost) {
    console.log("Not enough muns, Needed: " + cost);

    document.getElementById("messageBoard").innerHTML = "Not enough Chips, Need: " + cost;
}