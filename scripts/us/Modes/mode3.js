const mode3Control = document.getElementById("mode3Control")
const mode3Entry = document.getElementById("mode3Entry");
mode3Entry.onkeyup = mode3Entered
const mode3SkipButton = document.getElementById("mode3SkipButton")

function mode3Entered(event) {
    const countryName = mode3Entry.value.trim().toLowerCase()

    for(const code of stateMap.keys()) {
      const state = stateMap.get(code)
      if(state.name.toLowerCase() === countryName) {
        newCountryFound(code)
        mode3Entry.value = ""
        console.log(stateMap.get(randomCountryCode).name + " found")

        if(countriesRemainingArr.length > 0) mode3NewCountry()
      }
    }
}

function mode3Init() {
    mode3Entry.disabled = false
    //controlPanel.insertBefore(mode3Control, progressContainer)
    mode3Control.style.display = "flex"

    mode3SkipButton.onclick = mode3NewCountry

    mode3Entry.value = ""
    colorAllCountries()
    desaturateMap("0.3")

    mode3NewCountry()
}

function selectCountry(code) {
    console.log(stateMap.get(code).name + " selected")
    saturateCountry(code, stateMap.get(code).saturated.toString())
}

function deselectCountry(code) {
    desaturateCountry(code, "0.25")
}

function mode3NewCountry() {
  deselectCountry(randomCountryCode)
  randomCountryCode = getRandomCountryCode()
  selectCountry(randomCountryCode)
}