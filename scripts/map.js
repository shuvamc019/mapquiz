function removeTitles() {
    const titles = svg.contentDocument.getElementsByTagName("title");
    for(const title of titles) {
        title.innerHTML = "";
    }
} 

function grayAllCountries() {
    for(const code of colorMap.keys()) {
      const elements = svg.contentDocument.getElementsByClassName(code);
      const color = grayMap.get(code)
  
      for(const element of elements) {
        element.style.fill = color;

        if(element.classList.contains("oceania-ellipse")) {
          element.style.fill = "none";
          element.style.stroke = color;
        }
      }
    }

}

function colorAllCountries() {
    for(const code of colorMap.keys()) {
      colorCountry(code)
    }

}

function colorCountry(countryName) {
  const elements = svg.contentDocument.getElementsByClassName(countryName);
  const color = colorMap.get(countryName)

  for(const element of elements) {
    element.style.fill = color;

    if(element.classList.contains("oceania-ellipse")) {
      element.style.fill = "none";
      element.style.stroke = color;
    }
  }
}

function initSpecialCases() {
  //setting dashed lines for oceania island ellipses
  for(const island of svg.contentDocument.getElementsByClassName("oceania-ellipse")) {
    island.setAttribute("stroke-dasharray", "6 2")
  }

  for(const circleOpaque of svg.contentDocument.getElementsByClassName("circle-opaque")) {
    circleOpaque.style.opacity = "0";
  }
}

function initMap() {
  colorAllCountries();  
  removeTitles();
  initSpecialCases();
}