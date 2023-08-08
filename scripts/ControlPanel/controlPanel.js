const controlPanel = document.getElementsByClassName("controlPanel")[0]

const progressContainer = document.getElementsByClassName("progressContainer")[0]
const progressLabel = document.getElementById("progressLabel")
const giveUpButton = document.getElementById("giveUpButton")
const restartButton = document.getElementById("restartButton")
const dialog = document.getElementById("dialog")
const dialogHeader = document.getElementById("dialogHeader")
const dialogText = document.getElementById("dialogText")
const dialogCloseButton = document.getElementById("dialogCloseButton")
const dialogRestartButton = document.getElementById("dialogRestartButton")
const modeDropdown = document.getElementById("modeDropdown")
const regionDropdown = document.getElementById("regionDropdown")

const countriesRemainingArr = []
let countriesFound = 0;
const totalCountries = 197;
let randomCountryCode = ""

function initControlPanel() {
    document.addEventListener("visibilitychange", () => {
        if(timerRunning) {
            if (document.visibilityState === "visible") {
                timerStart()
            } else {
                timerPause()
            }
        } 
    });

    restartButton.addEventListener("click", restart);
    giveUpButton.addEventListener("click", giveUp);
    dialogRestartButton.addEventListener("click", function() {
        dialog.close()
        restart();
    });
    dialogCloseButton.addEventListener("click", dialog.close());

    modeDropdown.addEventListener("change", restart)

    initCountryList();
    restart();
}

function restart() {
    resetCountriesFound();
    hideCountryLabels();
    zoomToFullScreen();

    timerReset();
    timerStart();

    switch(modeDropdown.value) {
        case "1": //Name All Countries
            mode1Init()
            break;
        case "2": //Find The Country
            mode2Init()
            break;
        case "3": //Name The Country
            mode3Init()
            break;
    }
}

function getRandomCountryCode() {
    return countriesRemainingArr[Math.floor(Math.random() * countriesRemainingArr.length)];
}

function newCountryFound(code) {
    showLabel(code);
    countriesRemainingArr.splice(countriesRemainingArr.indexOf(code), 1) //remove code from array

    countriesFound++
    progressLabel.innerHTML = countriesFound.toString() + " / " + totalCountries + " Countries Found"

    if(countriesFound == totalCountries) {
        gameWon()
    }
}

function resetCountriesFound() {
    countriesFound = 0
    progressLabel.innerHTML = "0 / " + totalCountries + " Countries Found"
  
    //clear the array and repopulate
    countriesRemainingArr.length = 0 
    for(const code of allCountries) {
      countriesRemainingArr.push(code)
    }
  }

  function giveUp() {
    timerPause();
    showNotFoundCountryLabels()
    //TODO: make things disabled

    const secondsPassed = getSecondsPassed();
    const minutes = Math.floor(secondsPassed / 60);
    const seconds = secondsPassed % 60;

    dialogHeader.innerHTML = "Better luck next time";
    dialogText.innerHTML = "You found " + countriesFound + " countries in " + minutes + " minutes and " + seconds + " seconds";  

    dialog.showModal();
}

function gameWon() {
    timerPause();

    const secondsPassed = getSecondsPassed();
    const minutes = Math.floor(secondsPassed / 60);
    const seconds = secondsPassed % 60;

    dialogHeader.innerHTML = "You won!";
    dialogText.innerHTML = "You found all " + totalCountries + " countries in " + minutes + " minutes and " + seconds + " seconds";

    dialog.showModal();
}