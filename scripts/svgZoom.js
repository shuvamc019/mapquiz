import { gsap } from "gsap";
let panZoom = null;

function initZoom() {
  panZoom = svgPanZoom(svg,  {
    minZoom: 1,
    maxZoom: 10,
    zoomScaleSensitivity: 0.15,
    contain: true,
    refreshRate: 50,
    beforePan: beforePan
  })
}

function zoomToDefault() {
  let step = 0
  intervalID = setInterval(function(){
    if (step++ < 60) {
      panZoom.zoomBy(0.95)
    } else {
      clearInterval(intervalID)
    }
  }, 10)
}

function beforePan(oldPan, newPan){
  var stopHorizontal = false
    , stopVertical = false
    , gutterWidth = window.innerWidth
    , gutterHeight = window.innerHeight
      // Computed variables
    , sizes = this.getSizes()
    , leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth
    , rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom)
    , topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight
    , bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom)

  customPan = {}
  customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
  customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

  return customPan
}

function zoomInViewBox(minX, minY, width, height) {
  //setViewBox(minX, minY, width, height)
  /*gsap.to(svg.contentDocument.getElementsByTagName("svg")[0], {
    viewBox: "500 500 100 100"
  })*/
  gsap.to(controlPanel, {
    x: 1000
  })
}

function setViewBox(minX, minY, width, height) {
  const svgTag = svg.contentDocument.getElementsByTagName("svg")[0]
  svgTag.setAttribute("viewBox", minX.toString() + " " + minY.toString() + " " + width.toString() + " " + height.toString())
}