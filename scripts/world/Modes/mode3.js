const mode3Control = document.getElementById("mode3Control")
const mode3Entry = document.getElementById("mode3Entry");
mode3Entry.onkeyup = mode3Entered
const mode3SkipButton = document.getElementById("mode3SkipButton")

function mode3Entered(event) {
    const countryName = mode3Entry.value.toLowerCase()

    if(countryToCodeMap.has(countryName)) {
      const code = countryToCodeMap.get(countryName);
      if(code == randomCountryCode) {
        newCountryFound(code)
        mode3Entry.value = ""
        console.log(countryMap.get(randomCountryCode).name + " found")

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
    console.log(countryMap.get(code).name + " selected")
    const countryViewbox = countryMap.get(code).viewBox
    setDefaultViewbox(countryViewbox.minX, countryViewbox.minY, countryViewbox.width, countryViewbox.height)
    animateSetViewBox(countryViewbox.minX, countryViewbox.minY, countryViewbox.width, countryViewbox.height)

    saturateCountry(code, countryMap.get(code).saturated.toString())
}

function deselectCountry(code) {
    desaturateCountry(code, "0.25")
}

function mode3NewCountry() {
  deselectCountry(randomCountryCode)
  randomCountryCode = getRandomCountryCode()
  selectCountry(randomCountryCode)
}