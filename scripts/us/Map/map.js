const defaultGray = "#555555"

function removeTitles() {
    const titles = svg.contentDocument.getElementsByTagName("title");
    for(const title of titles) {
        title.innerHTML = "";
    }
} 

function grayAllCountries() {
    for(const code of stateMap.keys()) {
      const elements = svg.contentDocument.getElementsByClassName(code);
      const color = stateMap.get(code).grayScale
  
      for(const element of elements) {
        element.style.fill = color;

        if(element.classList.contains("island-ellipse")) {
          element.style.opacity = 0.15;
          element.style.stroke = "none"
        }
      }
    }

}

function colorAllCountries() {
    for(const code of stateMap.keys()) {
      colorCountry(code)
    }

}

function colorCountry(code) {
  const elements = svg.contentDocument.getElementsByClassName(code);
  const color = stateMap.get(code).color

  for(const element of elements) {
    element.style.fill = color;

    if(element.classList.contains("island-ellipse")) {
      element.style.opacity = 0.2
      element.style.stroke = "none"
    }
  }
}

function desaturateMap(saturation) {
  for(const code of stateMap.keys()) {
    desaturateCountry(code, saturation)
  }
}

function desaturateCountry(code, saturation) {
  const elements = svg.contentDocument.getElementsByClassName(code)
    for(const element of elements) {
      element.setAttribute("filter", "saturate(" + saturation + ")")
      if(element.classList.contains("island-ellipse")) {
        element.style.opacity = 0.1
      }
    }
}

function saturateCountry(code, saturation) {
  const elements = svg.contentDocument.getElementsByClassName(code)
  for(const element of elements) {
    element.setAttribute("filter", "saturate(" + saturation + ")")
    if(element.classList.contains("island-ellipse")) {
      element.style.opacity = 0.5
   }
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
  removeTitles();
}