function randomNumber() {
    const number = Math.floor(Math.random() * 6) + 1;
    return number;
}

function randomNumbers(howManyDice, edgeRoll) {
    let numbers = [];
    for (let index = 0; index < howManyDice; index++) {
        let number = randomNumber();
        numbers.push(number);
        if (edgeRoll && number == 6) {
            index--;
        }
    }
    return numbers.sort().reverse();
}

function summary(results) {
    let one = 0;
    let hit = 0;
    let hitWord = " hit";
    const glitch = results.length * 0.5;
    for (let index = 0; index < results.length; index++) {
        const result = results[index];
        switch (true) {
            case (result == 1):
                one++;
                break;
            case (result >= 5):
                hit++;
                break;
        }
    }
    if (hit == 0 || hit > 1) {
        hitWord += "s";
    }
    let summary = hit + hitWord;
    switch (true) {
        case (one > glitch && hit == 0):
            summary += ", CRITICAL GLITCH!";
            break;
        case (one > glitch):
            summary += ", GLITCH!";
            break;
        default:
            summary += "!";
            break;
    }
    return summary;
}

function roller() {
    const howManyDice = document.getElementById("dice").value;
    const edgeRoll = document.getElementById("edge").checked;
    const roll = randomNumbers(howManyDice, edgeRoll);
    const outcome = summary(roll);
    document.getElementById("results").innerHTML = roll.join(", ");
    document.getElementById("outcome").innerHTML = outcome;
    if (!edgeRoll) {
        document.getElementById("reroll").hidden = false;
    } else {
        document.getElementById("reroll").hidden = true;
    }
}

function reroller() {
    const results = (document.getElementById("results").innerHTML).split(", ");
    const howManyDice = (results.filter(result => result < 4)).length;
    const roll = randomNumbers(howManyDice, false);
    const reroll = results.concat(roll).sort().reverse();
    const outcome = summary(reroll);
    document.getElementById("results").innerHTML = reroll.join(", ");
    document.getElementById("outcome").innerHTML = outcome;
    document.getElementById("reroll").hidden = true;
}
