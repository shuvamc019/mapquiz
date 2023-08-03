const giveUpButton = document.getElementById("giveUpButton")
const restartButton = document.getElementById("restartButton")

giveUpButton.addEventListener("click", giveUp)
restartButton.addEventListener("click", restart)

function giveUp() {
    const secondsPassed = getSecondsPassed()
    const minutes = Math.floor(secondsPassed / 60)
    const seconds = secondsPassed % 60

    alert("You found " + countriesFound + " out of 198 countries in " + minutes + " minutes and " + seconds + " seconds")
    restart()
}

function restart() {
    grayAllCountries();

    timerReset();
    timerStart();

    resetCountriesFound();

    hideCountryLabels();
}