const svg = document.getElementById("map");
let svgTag = null

async function init() {
  svgTag = svg.contentDocument.getElementsByTagName("svg")[0]
  
  await fetch("../resources/us/groups.csv").then(r=>r.text()).then(readGroupFile);

  await fetch("../resources/us/states.csv").then(r=>r.text()).then(readStateFile);

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


