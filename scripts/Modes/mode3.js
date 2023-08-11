const mode3Control = document.getElementById("mode3Control")
const mode3Entry = document.getElementById("mode3Entry");
mode3Entry.addEventListener("keyup", mode3Entered);

function mode3Entered(event) {
    const countryName = mode3Entry.value.toLowerCase()

    if(countryToCodeMap.has(countryName)) {
      const code = countryToCodeMap.get(countryName);
      if(code == randomCountryCode) {
        newCountryFound(code)
        mode3Entry.value = ""
        console.log(countryMap.get(randomCountryCode).name + " found")


        deselectCountry(code)
        randomCountryCode = getRandomCountryCode()
        selectCountry(randomCountryCode)
      }
    }
}

function mode3Init() {
    mode3Entry.disabled = false
    controlPanel.insertBefore(mode3Control, progressContainer)

    mode3Entry.value = ""
    colorAllCountries()
    desaturateMap("0.4")

    randomCountryCode = getRandomCountryCode()
    selectCountry(randomCountryCode)
}

function selectCountry(code) {
    console.log(countryMap.get(code).name + " selected")
    const countryViewbox = countryMap.get(code).viewBox
    animateSetViewBox(countryViewbox)

    saturateCountry(code, "1.5")
}

function deselectCountry(code) {
    desaturateCountry(code, "0.4")
}