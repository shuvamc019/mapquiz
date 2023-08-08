const mode1Control = document.getElementById("mode1Control")
const mode1Entry = document.getElementById("mode1Entry");
mode1Entry.addEventListener("keyup", mode1Entered);

function mode1Entered(event) {
    const countryName = mode1Entry.value.toLowerCase()

    if(countryToCodeMap.has(countryName)) {
      const code = countryToCodeMap.get(countryName);
      if(countriesRemainingArr.includes(code)) {
        colorCountry(code);
        newCountryFound(code)
        mode1Entry.value = ""
      }
    }
}

function mode1Init() {
    controlPanel.insertBefore(mode1Control, progressContainer)

    mode1Entry.value = ""
    grayAllCountries();
}