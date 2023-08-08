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

        deselectCountry(code)
        randomCountryCode = getRandomCountryCode()
        selectCountry(randomCountryCode)
      }
    }
}

function mode3Init() {
    controlPanel.insertBefore(mode3Control, progressContainer)

    mode3Entry.value = ""
    colorAllCountries()
    saturateMap("0.4")

    randomCountryCode = getRandomCountryCode()
    selectCountry(randomCountryCode)
}

function selectCountry(code) {
    const countryViewbox = viewboxMap.get(code)
    animateSetViewBox(countryViewbox)

    const elements = svgTag.getElementsByClassName(code)
    for(const element of elements) {
        element.setAttribute("filter", "saturate(1.5)")
    }
}

function deselectCountry(code) {
    const elements = svgTag.getElementsByClassName(code)
    for(const element of elements) {
        element.setAttribute("filter", "saturate(0.3)")
    }
}