const mode1Control = document.getElementById("mode1Control")
const mode1Entry = document.getElementById("mode1Entry");
mode1Entry.onkeyup = mode1Entered

function mode1Entered(event) {
    const countryName = mode1Entry.value.toLowerCase()

    if(countryToCodeMap.has(countryName)) {
      const code = countryToCodeMap.get(countryName);
      if(countriesRemainingArr.includes(code)) {
        console.log(countryMap.get(code).name + " found")
        colorCountry(code);
        newCountryFound(code)
        mode1Entry.value = ""
      }
    }

}

function mode1Init() {
    mode1Entry.disabled = false
    //controlPanel.insertBefore(mode1Control, progressContainer)
    mode1Control.style.display = "flex"

    mode1Entry.value = ""
    grayAllCountries();

    console.log("\nMode 1 Started")
}