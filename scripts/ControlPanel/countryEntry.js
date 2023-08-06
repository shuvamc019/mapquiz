const textEntry = document.getElementById("textEntry");
textEntry.addEventListener("keyup", countryEntered, false);
const progressLabel = document.getElementById("progressLabel")

let countriesFound = 0;
const totalCountries = 197;

function countryEntered(event) {
    const countryName = textEntry.value.toLowerCase()

    if(countryToCodeMap.has(countryName)) {
      const code = countryToCodeMap.get(countryName);
      if(!countryFoundMap.get(code)) {
        colorCountry(code);
        countryFoundMap.set(code, true);
        showLabel(code);
        textEntry.value = ""

        countriesFound++
        progressLabel.innerHTML = countriesFound.toString() + " / " + totalCountries + " Countries Found"

        if(countriesFound == 198) {
          gameWon()
        }
      }

    }
}

function resetCountriesFound() {
  countriesFound = 0
  progressLabel.innerHTML = "0 / " + totalCountries + " Countries Found"

  for(const key of countryFoundMap.keys()) {
    countryFoundMap.set(key, false);
  }
}