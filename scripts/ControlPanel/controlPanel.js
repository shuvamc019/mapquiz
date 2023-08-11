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
let totalCountries;
let randomCountryCode = ""

function initControlPanel() {
    document.addEventListener("visibilitychange", function() {
        if(document.visibilityState === "visible" && !timerRunning) {
            timerStart()
        } else if(document.visibilityState !== "visible" && timerRunning) {
            timerPause()
        }
    })
    document.addEventListener("focus", function() {
        if(!timerRunning) {
            timerStart() 
        }
    })
    document.addEventListener("blur", function() {
        if(timerRunning) {
            timerPause()
        }
    })

    restartButton.addEventListener("click", restart);
    giveUpButton.addEventListener("click", giveUp);
    dialogRestartButton.addEventListener("click", function() {
        dialog.close()
        restart();
    });
    dialogCloseButton.addEventListener("click", function() { dialog.close() });

    modeDropdown.addEventListener("change", restart)
    regionDropdown.addEventListener("change", restart)

    initCountryList();
    restart();
}

function restart() {
    initContinentSelection();
    initModeSelection();

    timerReset();
    timerStart();
}

function initContinentSelection() {
    resetCountriesFound(regionDropdown.value)
    resetCountryList(regionDropdown.value)

    if(regionDropdown.value == "Whole World") {
        zoomToFullScreen();
    } else {
       for(const continent of continents) {
            if(continent.name === regionDropdown.value) {
                animateSetViewBox(continent.viewBox)
            }
       }
    }

}

function initModeSelection() {
    if(controlPanel.contains(mode2Control)) controlPanel.removeChild(mode2Control)
    if(controlPanel.contains(mode3Control)) controlPanel.removeChild(mode3Control)
    if(controlPanel.contains(mode1Control)) controlPanel.removeChild(mode1Control)
    saturateMap("1")
    removeHoverListeners()

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

function resetCountriesFound(continentName) {
    countriesFound = 0
  
    //clear the array and repopulate
    countriesRemainingArr.length = 0 

    for(const code of countryMap.keys()) {
        if(continentName === "Whole World") {
            countriesRemainingArr.push(code)
        } else {
            const country = countryMap.get(code)
            if(country.continent === continentName) {
                countriesRemainingArr.push(code)
            }
        }   
    }
    
    totalCountries = countriesRemainingArr.length
    progressLabel.innerHTML = "0 / " + totalCountries + " Countries Found"
  }

function giveUp() {
    timerPause();
    removeHoverListeners()
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