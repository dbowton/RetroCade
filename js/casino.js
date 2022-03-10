
/*
    Things to Fix:
        Incrimenting of cost for each item
        Think of More Updates
*/

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

var lottoCost = 15;
var slotsCost = 100;
var pokerCost = 200;
var bljkCost = 1250;
var roulCost = 5000;

var updateCost = 25000;

var lottoMul = 5;
var slotsMul = 15;
var pokerMul = 25;
var bljkMul = 50;
var roulMul = 100;

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
        chips += (15 * slotsOwned);
    }
    if (pokerOwned > 0) {
        chips++;
        chips += (100 * pokerOwned);
    }
    if (bljkOwned > 0) {
        chips++;
        chips += (10 * bljkOwned);
    }
    if (roulOwned > 0) {
        chips++;
        chips += (15 * roulOwned);
    }

}

function theUpdate() {
    var chipsFormatted = formatter.format(chips);

    //update the Money and cost of each item
    document.getElementById("Money").innerHTML = chipsFormatted;

    document.getElementById("btn").innerHTML = "Lotto! " + formatter.format(lottoCost) + "\nOwned: " + lottoOwned + " Makes: $" + (1 * (lottoOwned + 1)) + "/s";

    document.getElementById("btn1").innerHTML = "Slots! " + formatter.format(slotsCost) + "\nOwned: " + slotsOwned + " Makes: $" + (15 * (slotsOwned + 1)) + "/s";

    document.getElementById("btn2").innerHTML = "Poker! " + formatter.format(pokerCost) + "\nOwned: " + pokerOwned + " Makes: $" + (100 * (pokerOwned + 1)) + "/s";

    document.getElementById("btn3").innerHTML = "BlackJack! " + formatter.format(bljkCost) + "\nOwned: " + bljkOwned + " Makes: $" + (10 * (bljkOwned + 1)) + "/s";

    document.getElementById("btn4").innerHTML = "Roulette! " + formatter.format(roulCost) + "\nOwned: " + roulOwned + " Makes: $" + (15 * (roulOwned + 1)) + "/s";

    if (updatesOwned == 0) {
        document.getElementById("btn5").innerHTML = "Update! " + formatter.format(updateCost) + " New Idle Machines";
    }
    if (updatesOwned == 1) {
        document.getElementById("btn5").innerHTML = "Update! " + formatter.format(updateCost) + " New Carpet";
    }
    if (updatesOwned == 2) {
        document.getElementById("btn5").innerHTML = "Update! $" + updateCost + " New Location";
    }

    if (updatesOwned >= 3) {
        document.getElementById("btn5").style.backgroundColor = "#A21715";
        document.getElementById("btn5").style.borderColor = "#A21715";
    }

    //document.getElementById("btn5").innerHTML = "Update! $" + updateCost;

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

        if (lottoOwned <= 5) {
            lottoCost += lottoMul;
        }

        if (lottoOwned == 9) {
            lottoMul += 8;
        }

        if (lottoOwned <= 10 && lottoOwned > 5) {
            lottoCost += lottoMul;
        }

        if (lottoOwned == 14) {
            lottoMul += 10;
        }

        if (lottoOwned <= 15 && lottoOwned > 10) {
            lottoCost += lottoMul;
        }

        if (lottoOwned == 19) {
            lottoMul += 20;
        }

        if (lottoOwned <= 20 && lottoOwned > 15) {
            lottoCost += lottoMul;
        }

        if (lottoOwned == 21) {
            lottoMul = 3;
        }

        if (lottoOwned >= 21 && lottoOwned > 20) {
            lottoCost = (lottoCost * lottoMul) / 2;
        }


        document.getElementById('lotto').style.display = 'block';
    }
}

function slotsClicked() {
    if (chips >= slotsCost) {
        slotsOwned++;
        chips -= slotsCost;

        if (slotsOwned <= 5) {
            slotsCost += slotsMul;
        }

        if (slotsOwned == 4) {
            slotsMul += 35;
        }

        if (slotsOwned <= 10 && slotsOwned > 5) {
            slotsCost += slotsMul;
        }

        if (slotsOwned == 9) {
            slotsMul += 45;
        }

        if (slotsOwned <= 15 && slotsOwned > 10) {
            slotsCost += slotsMul;
        }

        if (slotsOwned == 14) {
            slotsMul += 100;
        }

        if (slotsOwned <= 20 && slotsOwned > 15) {
            slotsCost += slotsMul;
        }

        if (slotsOwned == 21) {
            slotsMul = 4;
        }

        if (slotsOwned >= 21 && slotsOwned > 20) {
            slotsCost = (slotsCost * slotsMul) / 3;
        }

        document.getElementById('slots').style.display = 'block';
    }
}

function pokerClicked() {
    if (chips >= pokerCost) {
        pokerOwned++;
        chips -= pokerCost;

        if (pokerOwned <= 5) {
            pokerCost += pokerMul;
        }

        if (lottoOwned == 9) {
            pokerMul += 50;
        }

        if (pokerOwned <= 10 && pokerOwned > 5) {
            pokerCost += pokerMul;
        }

        if (pokerOwned == 14) {
            pokerMul += 15;
        }

        if (pokerOwned <= 15 && pokerOwned > 10) {
            pokerCost += pokerMul;
        }

        if (pokerOwned == 19) {
            pokerMul += 25;
        }

        if (pokerOwned <= 20 && pokerOwned > 15) {
            pokerCost += pokerMul;
        }

        if (pokerOwned == 21) {
            pokerMul = 3;
        }

        if (pokerOwned >= 21 && pokerOwned > 20) {
            pokerCost = (pokerCost * pokerMul) / 2;
        }

        document.getElementById('poker').style.display = 'block';
    }
}

function bljkClicked() {
    if (chips >= bljkCost) {
        bljkOwned++;
        chips -= bljkCost;

        if (bljkOwned <= 5) {
            bljkCost += bljkMul;
        }

        if (bljkOwned == 4) {
            bljkMul += 50;
        }

        if (bljkOwned <= 10 && bljkOwned > 5) {
            bljkCost += bljkMul;
        }

        if (bljkOwned == 9) {
            bljkMul += 75;
        }

        if (bljkOwned <= 15 && bljkOwned > 10) {
            bljkCost += bljkMul;
        }

        if (bljkOwned == 14) {
            bljkMul += 100;
        }

        if (bljkOwned <= 20 && bljkOwned > 15) {
            bljkCost += bljkMul;
        }

        if (bljkOwned == 21) {
            bljkMul = 4;
        }

        if (bljkOwned >= 21 && bljkOwned > 20) {
            bljkCost = (bljkCost * bljkMul) / 3;
        }

        document.getElementById('bljk').style.display = 'block';
    }
}

function roulClicked() {
    if (chips >= roulCost) {
        roulOwned++;
        chips -= roulCost;

        if (roulOwned <= 5) {
            roulCost += roulMul;
        }

        if (roulOwned == 4) {
            roulMul += 75;
        }

        if (roulOwned <= 10 && roulOwned > 5) {
            roulCost += roulMul;
        }

        if (roulOwned == 9) {
            roulMul += 100;
        }

        if (roulOwned <= 15 && roulOwned > 10) {
            roulCost += roulMul;
        }

        if (roulOwned == 14) {
            roulMul += 150;
        }

        if (roulOwned <= 20 && roulOwned > 15) {
            roulCost += roulMul;
        }

        if (roulOwned == 21) {
            roulMul = 4;
        }

        if (roulOwned >= 21 && roulOwned > 20) {
            roulCost = (roulCost * roulMul) / 3;
        }

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