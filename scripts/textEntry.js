const textEntry = document.getElementById("textEntry");
textEntry.addEventListener("keyup", countryEntered, false);

function countryEntered(event) {
    const countryName = textEntry.value.toLowerCase()

    if(codeMap.has(countryName)) {
      const code = codeMap.get(countryName);
      colorCountry(code);

      textEntry.value = ""
    }
}