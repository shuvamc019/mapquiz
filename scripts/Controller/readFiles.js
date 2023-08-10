const groupColors = []; //array to hold color for each group
const regionViewboxes = new Map(); //map each region to its viewbox

const countryToCodeMap = new Map(); //map all different country names to country code
const countryMap = new Map(); //map code to country object

const continents = []

function Country(name, continent, group, color, grayScale, viewBox) {
  this.name = name;
  this.continent = continent;
  this.group = group;
  this.color = color;
  this.grayScale = grayScale;
  this.viewBox = viewBox;
}

function Continent(name, countries, viewBox) {
  this.name = name;
  this.countries = countries;
  this.viewBox = viewBox;
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
    const color = line[1];
    const grayScale = line[2];
    groupColors[2 * i - 2] = color;
    groupColors[2 * i - 1] = grayScale;
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

    const color = groupColors[2 * groupNum - 2];
    const grayScale = groupColors[2 * groupNum - 1];

    const viewBox = regionViewboxes.get(region)

    const country = new Country(countryName, continent, groupNum, color, grayScale, viewBox)
    countryMap.set(countryCode, country)

    for(let j = 0; j < continents.length; j++) {
      if(continents[j].name === continent) {
        continents[j].countries.push(country)
      }
    }
  }

  console.log(countryMap.get("sv"))
}