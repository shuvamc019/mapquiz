const svg = document.getElementById("map");
let svgTag = null

async function init() {
  svgTag = svg.contentDocument.getElementsByTagName("svg")[0]
  
  //read in group csv and build data structure
  await fetch("resources/world/groups.csv").then(r=>r.text()).then(readGroupFile);

  //read in country codes csv and build data structure
  await fetch("resources/world/codes.csv").then(r=>r.text()).then(readCodesFile);

  //read in country codes csv and build data structure
  await fetch("resources/world/regions.csv").then(r=>r.text()).then(readRegionFile);

  //read in continents csv and build data structure
  await fetch("resources/world/continents.csv").then(r=>r.text()).then(readContinentFile);

  //read in country csv and build data structure
  await fetch("resources/world/countries.csv").then(r=>r.text()).then(readCountryFile);

  initMap();

  if(!isMobile()) {
    initZoom();
    initControlPanel();
    getScoresFromCookies();
  } else {
    initMobile()
  }

}

svg.onload = init


