let mouseDown, mousePoint, panOrigin, zoomOrigin

let WINDOW_MAX_WIDTH = window.screen.availWidth
let WINDOW_MAX_HEIGHT = (window.screen.availHeight - (window.outerHeight - window.innerHeight))
let ASPECT_RATIO = WINDOW_MAX_WIDTH / WINDOW_MAX_HEIGHT
const MIN_SCALE = 1 / 10;

let MAX_HEIGHT = 1440, MAX_WIDTH = MAX_HEIGHT * ASPECT_RATIO
let MIN_WIDTH = MAX_WIDTH * MIN_SCALE, MIN_HEIGHT = MAX_HEIGHT * MIN_SCALE

let currentViewBox = {
  minX: 0,
  minY: 0,
  width: MAX_WIDTH,
  height: MAX_HEIGHT
}

let defaultViewbox = {
  minX: 0,
  minY: 0,
  width: MAX_WIDTH,
  height: MAX_HEIGHT
}

function initZoom() {
  svg.contentDocument.addEventListener("wheel", zoom, {passive: false});
  svg.contentDocument.addEventListener("mousedown", function(mouseEvent) {
    mouseDown = true
    panOrigin = getPoint(mouseEvent)
  });
  svg.contentDocument.onmouseup = function() { mouseDown = false }
  svg.contentDocument.onmouseleave =  function() { mouseDown = false }
  svg.contentDocument.onmousemove = pan

  setViewBox(0, 0, MAX_WIDTH, MAX_HEIGHT)

  svgTag.addEventListener("keydown", function() {
    printViewbox()
  })

  window.onresize = sizeChange

}

//sets mousePoint variable to the mouse location in SVG coordinates
function getPoint(event) {
    point = svgTag.createSVGPoint()

    //convert screen coordinates to SVG coordinates
    point.x = event.clientX
    point.y = event.clientY
    return point.matrixTransform(svgTag.getScreenCTM().inverse());
}

function pan(mouseEvent) {
  if(mouseDown) { //can only pan if mouse is down and being dragged
    mouseEvent.preventDefault() //stops a selection being made
    mousePoint = getPoint(mouseEvent)

    console.log((panOrigin.y - mousePoint.y))

    const newMinX = clamp(currentViewBox.minX + (panOrigin.x - mousePoint.x), 0, MAX_WIDTH - currentViewBox.width)
    const newMinY = clamp(currentViewBox.minY + (panOrigin.y - mousePoint.y), 0, MAX_HEIGHT - currentViewBox.height)

    setViewBox(newMinX, newMinY, currentViewBox.width, currentViewBox.height)
  } 
}

function zoom(wheelEvent) {
  wheelEvent.preventDefault()
  mousePoint = getPoint(wheelEvent)

  let scale;

  if(wheelEvent.ctrlKey) { //pinch zoom event
      //can't zoom in more if already fully zoomed
      if(wheelEvent.deltaY < 0 && (currentViewBox.width == MIN_WIDTH || currentViewBox.height == MIN_HEIGHT)) return
      scale = 1.005 ** (wheelEvent.deltaY)
  } else { //normal wheel scrolling
      //can't zoom in more if already fully zoomed
      if(wheelEvent.deltaY > 0 && (currentViewBox.width == MIN_WIDTH || currentViewBox.height == MIN_HEIGHT)) return
      scale = 1.0005 ** (-wheelEvent.deltaY)
  }

  const newWidth = clamp(currentViewBox.width * scale, MIN_WIDTH, MAX_WIDTH)
  const newHeight = clamp(currentViewBox.height * scale, MIN_HEIGHT, MAX_HEIGHT)

  let newMinX = clamp(mousePoint.x - ((mousePoint.x - currentViewBox.minX) * scale), 0, MAX_WIDTH - newWidth)
  let newMinY = clamp(mousePoint.y - ((mousePoint.y - currentViewBox.minY) * scale), 0, MAX_HEIGHT - newHeight)

  setViewBox(newMinX, newMinY, newWidth, newHeight)
}


//fits val inside min and max
function clamp(val, min, max) {
  if(val < min) return min;
  if(val > max) return max;
  return val;
}

function setDefaultViewbox(minX, minY, width, height) {
  defaultViewbox.minX = minX
  defaultViewbox.minY = minY
  defaultViewbox.width = width
  defaultViewbox.height = height
}

function zoomToFullScreen() {
  setDefaultViewbox(0, 0, MAX_WIDTH, MAX_HEIGHT)
  animateSetViewBox(0, 0, MAX_WIDTH, MAX_HEIGHT)
}

function zoomToDefaultViewbox() {
  animateSetViewBox(defaultViewbox.minX, defaultViewbox.minY, defaultViewbox.width, defaultViewbox.height)
}

function setViewBox(minX, minY, width, height) {
  currentViewBox.minX = minX
  currentViewBox.minY = minY
  currentViewBox.width = width
  currentViewBox.height = height

  resizeWindow()

  svgTag.setAttribute("viewBox", viewBoxString(currentViewBox.minX, currentViewBox.minY, currentViewBox.width, currentViewBox.height))
}

function animateSetViewBox(minX, minY, width, height) {
  currentViewBox.minX = minX
  currentViewBox.minY = minY
  currentViewBox.width = width
  currentViewBox.height = height

  resizeWindow()

  gsap.to(svgTag, 0.75, { 
    attr: { viewBox: viewBoxString(currentViewBox.minX, currentViewBox.minY, currentViewBox.width, currentViewBox.height)
  }, 
  ease:"power2.inOut"})
}

function viewBoxString(minX, minY, width, height) {
  return minX.toString() + " " + minY.toString() + " " + width.toString() + " " + height.toString()
}

//change viewbox dimensions based on window dimensions
function resizeWindow() {
  let ratio = window.innerWidth / window.innerHeight

  const newWidth = clamp(currentViewBox.height * ratio, 0, MAX_WIDTH)
  const newMinX = clamp((currentViewBox.minX + currentViewBox.width / 2) - newWidth / 2, 0, MAX_WIDTH - newWidth)

  currentViewBox.width = newWidth
  currentViewBox.minX = newMinX
  
}

function sizeChange() {
  setViewBox(currentViewBox.minX, currentViewBox.minY, currentViewBox.width, currentViewBox.height)
}

function printViewbox() {
  console.log(parseInt(currentViewBox.minX) + "," + parseInt(currentViewBox.minY) + "," + parseInt(currentViewBox.width) + "," + parseInt(currentViewBox.height))
}