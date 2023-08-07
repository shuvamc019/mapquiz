const giveUpButton = document.getElementById("giveUpButton")
const restartButton = document.getElementById("restartButton")
const startButton = document.getElementById("startButton")
const dialog = document.getElementById("dialog")
const dialogHeader = document.getElementById("dialogHeader")
const dialogText = document.getElementById("dialogText")
const dialogCloseButton = document.getElementById("dialogCloseButton")
const dialogRestartButton = document.getElementById("dialogRestartButton")

function initButtons() {
    restartButton.addEventListener("click", restart);
    giveUpButton.addEventListener("click", giveUp);
    dialogRestartButton.addEventListener("click", function() {
        dialog.close()
        restart();
    });
    dialogCloseButton.addEventListener("click", function() {
        dialog.close()
    });
    startButton.addEventListener("click", start)

}

function start() {
    document.getElementsByClassName("timerContainer")[0].removeChild(startButton)
    document.getElementsByClassName("timerContainer")[0].appendChild(timer)
    timerStart()
    textEntry.disabled = false
    textEntry.focus()
    giveUpButton.disabled = false
}


function giveUp() {
    timerPause();
    showNotFoundCountryLabels()
    textEntry.disabled = true;
    giveUpButton.disabled = true;

    const secondsPassed = getSecondsPassed();
    const minutes = Math.floor(secondsPassed / 60);
    const seconds = secondsPassed % 60;

    dialogHeader.innerHTML = "Better luck next time";
    dialogText.innerHTML = "You found " + countriesFound + " countries in " + minutes + " minutes and " + seconds + " seconds";  

    dialog.showModal();
}

function gameWon() {
    timerPause();
    textEntry.disabled = true;
    giveUpButton.disabled = true;

    const secondsPassed = getSecondsPassed();
    const minutes = Math.floor(secondsPassed / 60);
    const seconds = secondsPassed % 60;

    dialogHeader.innerHTML = "You won!";
    dialog.innerHTML = "You found all " + totalCountries + " countries in " + minutes + " minutes and " + seconds + " seconds";

    dialog.showModal();
}

function restart() {
    document.getElementsByClassName("timerContainer")[0].removeChild(timer)
    document.getElementsByClassName("timerContainer")[0].appendChild(startButton)


    resetCountriesFound();
    hideCountryLabels();
    zoomToFullScreen();
    grayAllCountries();
    timerReset();
}