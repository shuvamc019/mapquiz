const groupColors = []; //array to hold color for each group
const regionViewboxes = new Map(); //map each region to its viewbox

const countryToCodeMap = new Map(); //map all different country names to country code
const countryMap = new Map(); //map code to country object

const continents = []

const scores = []

window.onbeforeunload = writeScores

function Country(name, continent, group, color, grayScale, viewBox, saturated) {
  this.name = name;
  this.continent = continent;
  this.group = group;
  this.color = color;
  this.grayScale = grayScale;
  this.viewBox = viewBox;
  this.saturated = saturated
}

function Continent(name, countries, viewBox) {
  this.name = name;
  this.countries = countries;
  this.viewBox = viewBox;
}

function Score(mode, region, found, total, time) {
  this.mode = mode
  this.region = region
  this.found = parseInt(found)
  this.total = parseInt(total)
  this.time = parseInt(time)
}

//based on codes.csv, build map from country name to code
function readCodesFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    countryToCodeMap.set(line[0].toLowerCase(), line[1]);
  }
}
  
//based on groups.csv, build array of group colors
function readGroupFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    const colorHex = line[2];
    const grayScaleHex = line[3];
    const saturated = line[4];
    groupColors[3 * i - 3] = colorHex;
    groupColors[3 * i - 2] = grayScaleHex;
    groupColors[3 * i - 1] = saturated;
  }
}

function readRegionFile(fileText) {
    //split text by newline
    const lines = fileText.split("\n");

    //start from i=1 since first line of csv is header
    for(let i = 1; i < lines.length; i++) {
      const line = lines[i].split(",");
      const region = line[0]

      const viewBox = {
        minX: parseInt(line[1]),
        minY: parseInt(line[2]),
        width: parseInt(line[3]),
        height: parseInt(line[4]),
      }

      regionViewboxes.set(region, viewBox)
    }
}

function readContinentFile(fileText) {
  const lines = fileText.split("\n");

  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");
    const name = line[0]
    const viewBox = {
      minX: parseInt(line[1]),
      minY: parseInt(line[2]),
      width: parseInt(line[3]),
      height: parseInt(line[4]),
    }

    const continent = {
      name: name,
      countries: [],
      viewBox: viewBox
    }

    continents.push(continent)
  }
}

//based on countries.csv, build map from country code to color
function readCountryFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");

    const countryName = line[0]
    const countryCode = line[1]
    const continent = line[2]
    const region = line[3];
    const groupNum = parseInt(line[4]);

    const color = groupColors[3 * groupNum - 3];
    const grayScale = groupColors[3 * groupNum - 2];
    const saturated = groupColors[3 * groupNum - 1];

    const viewBox = regionViewboxes.get(region)

    const country = new Country(countryName, continent, groupNum, color, grayScale, viewBox, saturated)
    countryMap.set(countryCode, country)

    for(let j = 0; j < continents.length; j++) {
      if(continents[j].name === continent) {
        continents[j].countries.push(country)
      }
    }
  }
}

function getScoresFromCookies() {
  const cookieList = decodeURIComponent(document.cookie).split(";")
  for(const cookie of cookieList) {
    if (cookie.indexOf("expires") == -1) { //make sure this is a score, not an expires section
      const equalInd = cookie.indexOf("=")
      const scoreString = cookie.substring(equalInd + 1).trim() //score value will come after the =

      const scoreAttributes = scoreString.split(",")
      const score = new Score(scoreAttributes[0], scoreAttributes[1], scoreAttributes[2], scoreAttributes[3], scoreAttributes[4])
      scores.push(score)
    }
  }
}

//write all new scores from this session to cookies
function writeScores() {
  for(let i = 0; i < scores.length; i++) {
    const name = "score" + i
    const val = scoreString(scores[i])
    setCookie(name, val, 365) //score expires in a year
  }
}

function setCookie(name, val, expireDays) {
  const d = new Date();
  d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();

  document.cookie = name + "=" + val + ";" + expires;
}

function scoreString(score) {
  return score.mode + "," + score.region + "," + score.found + "," + score.total + "," + score.time
}