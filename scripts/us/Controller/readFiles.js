const groupColors = []; //array to hold color for each group
const stateMap = new Map(); //map code to state object

const scores = []

window.onbeforeunload = writeScores

function State(name, color, grayScale, saturated) {
  this.name = name;
  this.color = color;
  this.grayScale = grayScale;
  this.saturated = saturated
}

function Score(mode, region, found, total, time) {
  this.mode = mode
  this.region = region
  this.found = parseInt(found)
  this.total = parseInt(total)
  this.time = parseInt(time)
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

function readStateFile(fileText) {
  //split text by newline
  const lines = fileText.split("\n");

  //start from i=1 since first line of csv is header
  for(let i = 1; i < lines.length; i++) {
    const line = lines[i].split(",");

    const stateName = line[0]
    const stateCode = line[1]
    const groupNum = parseInt(line[2]);

    const color = groupColors[3 * groupNum - 3];
    const grayScale = groupColors[3 * groupNum - 2];
    const saturated = groupColors[3 * groupNum - 1];

    const state = new State(stateName, color, grayScale, saturated)
    stateMap.set(stateCode, state)
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
      if(score.region != "undefined") scores.push(score)
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