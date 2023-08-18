const svg = document.getElementById("map");
let svgTag = null

async function init() {
  svgTag = svg.contentDocument.getElementsByTagName("svg")[0]
  
  //read in group csv and build data structure
  await fetch("resources/groups.csv").then(r=>r.text()).then(readGroupFile);

  //read in country codes csv and build data structure
  await fetch("resources/codes.csv").then(r=>r.text()).then(readCodesFile);

  //read in country codes csv and build data structure
  await fetch("resources/regions.csv").then(r=>r.text()).then(readRegionFile);

  //read in continents csv and build data structure
  await fetch("resources/continents.csv").then(r=>r.text()).then(readContinentFile);

  //read in country csv and build data structure
  await fetch("resources/countries.csv").then(r=>r.text()).then(readCountryFile);

  getScoresFromCookies()

  initMap();
  initControlPanel();
  writeScores()

  //automateCountryLabels();
}

svg.addEventListener("load", init);