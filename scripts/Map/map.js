const defaultGray = "#555555"

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

function setBaselineColors() {
  //color all landmasses as defaultGray
  //anything that is a country will later be overwritten
  //non-countries will always stay defaultGray
  let elements = svg.contentDocument.getElementsByClassName("landxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }
  elements = svg.contentDocument.getElementsByClassName("coastxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }
  elements = svg.contentDocument.getElementsByClassName("antxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }
  elements = svg.contentDocument.getElementsByClassName("smallislandxx")
  for(const element of elements) {
    element.style.fill = defaultGray
  }

  //color Antarctica even though it's a non-country
  elements = svg.contentDocument.getElementsByClassName("an")
  for(const element of elements) {
    element.style.fill = "#D3D3D3"
  }
}

function initMap() {
  setBaselineColors()
  colorAllCountries();  
  removeTitles();
  initSpecialCases();
  initZoom();
}