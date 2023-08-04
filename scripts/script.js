const groupColors = []; //array to hold color for each group
const colorMap = new Map(); //map country code to color
const grayMap = new Map(); //map country code to grayscale color
const countryToCodeMap = new Map(); //map different country names to country code
const codeToCountryMap = new Map(); //map different country codes to main country name
const countryFoundMap = new Map(); //map country code to whether they were found yet

//2D array that holds the countries in each continent, first element in each array is continent name
const continentCountries = [["Africa"], ["Asia"], ["Europe"], ["North America"], ["Oceania"], ["South America"]]

const svg = document.getElementById("map");

async function init() {
  //read in group csv and build data structure
  await fetch("resources/groups.csv").then(r=>r.text()).then(readGroupFile);

  //read in country csv and build data structure
  await fetch("resources/countries.csv").then(r=>r.text()).then(readCountryFile);

  //read in country codes csv and build data structure
  await fetch("resources/codes.csv").then(r=>r.text()).then(readCodesFile);

  initMap();
  initCountryList();
  initZoom();
}

svg.addEventListener("load", init, false);