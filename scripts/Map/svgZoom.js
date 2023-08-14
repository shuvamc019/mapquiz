let mouseDown, inverseSVGMatrix, mousePoint, panOrigin

const MIN_SCALE = 1 / 10;
const MAX_WIDTH = 2700, MAX_HEIGHT = 1440, MIN_WIDTH = MAX_WIDTH * MIN_SCALE, MIN_HEIGHT = MAX_HEIGHT * MIN_SCALE

let currentViewBox = {
  minX: 0,
  minY: 0,
  width: MAX_WIDTH,
  height: MAX_HEIGHT
}

function initZoom() {
  inverseSVGMatrix = svgTag.getScreenCTM().inverse() //inverse of SVG point transformation matrix

  svg.contentDocument.addEventListener("wheel", zoom);
  svgTag.addEventListener("mousedown", function(mouseEvent) {
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
    console.log("Pan   Mouse Point: (" + parseInt(mousePoint.x) + ", " + parseInt(mousePoint.y) + ")  Viewbox: (" + parseInt(newMinX) + ", " + parseInt(newMinY) + ", " + parseInt(currentViewBox.width) + ", " + parseInt(currentViewBox.height) + ")")
  }
  
}

function zoom(wheelEvent) {
  //can't zoom in more if already fully zoomed
  if(wheelEvent.deltaY > 0 && (currentViewBox.width == MIN_WIDTH || currentViewBox.height == MIN_HEIGHT)) return

  mousePoint = getPoint(wheelEvent)
  
  const factor = 1.001 ** (-wheelEvent.deltaY)

  const newWidth = clamp(currentViewBox.width * factor, MIN_WIDTH, MAX_WIDTH)
  const newHeight = clamp(currentViewBox.height * factor, MIN_HEIGHT, MAX_HEIGHT)

  const newMinX = clamp(mousePoint.x - ((mousePoint.x - currentViewBox.minX) * factor), 0, MAX_WIDTH - newWidth)
  const newMinY = clamp(mousePoint.y - ((mousePoint.y - currentViewBox.minY) * factor), 0, MAX_HEIGHT - newHeight)

  setViewBox(newMinX, newMinY, newWidth, newHeight)

  console.log("Zoom   Mouse Point: (" + parseInt(mousePoint.x) + ", " + parseInt(mousePoint.y) + ")  Viewbox: (" + parseInt(newMinX) + ", " + parseInt(newMinY) + ", " + parseInt(newWidth) + ", " + parseInt(newHeight) + ")")
}

//fits val inside min and max
function clamp(val, min, max) {
  if(val < min) return min;
  if(val > max) return max;
  return val;
}

function zoomToFullScreen() {
  animateSetViewBox(0, 0, MAX_WIDTH, MAX_HEIGHT)
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