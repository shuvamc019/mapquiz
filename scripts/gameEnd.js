const giveUpButton = document.getElementById("giveUpButton")
const restartButton = document.getElementById("restartButton")
const dialog = document.getElementById("dialog")
const dialogHeader = document.getElementById("dialogHeader")
const dialogText = document.getElementById("dialogText")
const dialogCloseButton = document.getElementById("dialogCloseButton")
const dialogRestartButton = document.getElementById("dialogRestartButton")

restartButton.addEventListener("click", restart);
giveUpButton.addEventListener("click", giveUp);
dialogRestartButton.addEventListener("click", function() {
    dialog.close()
    restart();
});
dialogCloseButton.addEventListener("click", function() {
    dialog.close()
});

function giveUp() {
    timerPause();
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
    dialog.innerHTML = "You found all 197 countries in " + minutes + " minutes and " + seconds + " seconds";

    dialog.showModal();
}

function restart() {
    grayAllCountries();

    timerReset();
    timerStart();

    textEntry.disabled = false
    giveUpButton.disabled = false

    resetCountriesFound();

    hideCountryLabels();

    zoomToDefault();
}