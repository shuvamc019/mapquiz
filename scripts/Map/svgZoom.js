let mouseDown, inverseSVGMatrix, mousePoint, panOrigin, zoomOrigin

const MIN_SCALE = 1 / 10;
const MAX_WIDTH = 2700, MAX_HEIGHT = 1440, MIN_WIDTH = MAX_WIDTH * MIN_SCALE, MIN_HEIGHT = MAX_HEIGHT * MIN_SCALE

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
  inverseSVGMatrix = svgTag.getScreenCTM().inverse() //inverse of SVG point transformation matrix

  svg.contentDocument.addEventListener("wheel", zoom, {passive: false});
  svg.contentDocument.addEventListener("mousedown", function(mouseEvent) {
    mouseDown = true
    panOrigin = getPoint(mouseEvent)
  });
  svg.contentDocument.addEventListener("mouseup", function() { mouseDown = false });
  svg.contentDocument.addEventListener("mouseleave", function() { mouseDown = false });
  svg.contentDocument.addEventListener("mousemove", pan);

  zoomToFullScreen()

  svgTag.addEventListener("keydown", function() {
    console.log(parseInt(currentViewBox.minX) + "," + parseInt(currentViewBox.minY) + "," + parseInt(currentViewBox.width) + "," + parseInt(currentViewBox.height))
  })
}

//sets mousePoint variable to the mouse location in SVG coordinates
function getPoint(event) {
    point = svgTag.createSVGPoint()

    //convert screen coordinates to SVG coordinates
    point.x = event.clientX
    point.y = event.clientY
    return point.matrixTransform(inverseSVGMatrix);
}

function pan(mouseEvent) {
  if(mouseDown) { //can only pan if mouse is down and being dragged
    mouseEvent.preventDefault() //stops a selection being made

    mousePoint = getPoint(mouseEvent)

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
      scale = 1.01 ** (wheelEvent.deltaY)
  } else { //normal wheel scrolling
      //can't zoom in more if already fully zoomed
      if(wheelEvent.deltaY > 0 && (currentViewBox.width == MIN_WIDTH || currentViewBox.height == MIN_HEIGHT)) return
      scale = 1.001 ** (-wheelEvent.deltaY)
  }

  const newWidth = clamp(currentViewBox.width * scale, MIN_WIDTH, MAX_WIDTH)
  const newHeight = clamp(currentViewBox.height * scale, MIN_HEIGHT, MAX_HEIGHT)

  const newMinX = clamp(mousePoint.x - ((mousePoint.x - currentViewBox.minX) * scale), 0, MAX_WIDTH - newWidth)
  const newMinY = clamp(mousePoint.y - ((mousePoint.y - currentViewBox.minY) * scale), 0, MAX_HEIGHT - newHeight)

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
  svgTag.setAttribute("viewBox", viewBoxString(minX, minY, width, height))
}

function animateSetViewBox(minX, minY, width, height) {
  currentViewBox.minX = minX
  currentViewBox.minY = minY
  currentViewBox.width = width
  currentViewBox.height = height

  gsap.to(svgTag, 0.75, { 
    attr: { viewBox: viewBoxString(minX, minY, width, height)
  }, 
  ease:"power2.inOut"})
}

function viewBoxString(minX, minY, width, height) {
  return minX.toString() + " " + minY.toString() + " " + width.toString() + " " + height.toString()
}