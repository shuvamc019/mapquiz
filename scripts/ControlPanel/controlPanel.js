const controlPanel = document.getElementsByClassName("controlPanel")[0]

const progressContainer = document.getElementsByClassName("progressContainer")[0]
const progressLabel = document.getElementById("progressLabel")
const giveUpButton = document.getElementById("giveUpButton")
const restartButton = document.getElementById("restartButton")
const modeDropdown = document.getElementById("modeDropdown")
const regionDropdown = document.getElementById("regionDropdown")
const titleDiv = document.getElementsByClassName("titleContainer")[0]
const zoomIcon = document.getElementById("zoomIcon")

const countriesRemainingArr = []
let countriesFound = 0;
let totalCountries;
let randomCountryCode = ""

let controlPanelMousePoint
let x, y

function initControlPanel() {
    dialog.close()

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

    restartButton.onclick = restart
    giveUpButton.onclick = gameEnd

    modeDropdown.onchange = restart
    regionDropdown.onchange = restart

    zoomIcon.onclick = zoomToDefaultViewbox

    initCountryList();
    restart();
}

function restart() {
    giveUpButton.disabled = false
    mode3SkipButton.disabled = false
    mode2SkipButton.disabled = false
    desaturateMap("1")

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
                const continentViewbox = continent.viewBox
                setDefaultViewbox(continentViewbox.minX, continentViewbox.minY, continentViewbox.width, continentViewbox.height)
                animateSetViewBox(continentViewbox.minX, continentViewbox.minY, continentViewbox.width, continentViewbox.height)
            }
       }
    }

}

function initModeSelection() {
    if(controlPanel.contains(mode2Control)) controlPanel.removeChild(mode2Control)
    if(controlPanel.contains(mode3Control)) controlPanel.removeChild(mode3Control)
    if(controlPanel.contains(mode1Control)) controlPanel.removeChild(mode1Control)
    desaturateMap("1")
    removeHoverListeners()

    switch(modeDropdown.value) {
        case "Name All Countries": //Name All Countries
            mode1Init()
            break;
        case "Find The Country": //Find The Country
            mode2Init()
            break;
        case "Name The Country": //Name The Country
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
        gameEnd(GAME_WON)
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

function timerTextToTimeString(timerText) {
    timerText = timerText.split(":")
    const minutes = parseInt(timerText[0])
    const seconds = parseInt(timerText[1])

    if(minutes != 0) {
        return minutes.toString() + " minutes and " + seconds.toString() + " seconds"
    } else {
        return seconds.toString() + " seconds"
    }
}