let mouseDown = false
let panOrigin = null

let zoomCenter = null
let zoomTimeout = null

const MAX_WIDTH = 2700, MAX_HEIGHT = 1440, MIN_WIDTH = MAX_WIDTH / 15, MIN_HEIGHT = MAX_HEIGHT / 15

const defaultViewBox = {
  minX: 0,
  minY: 0,
  width: MAX_WIDTH,
  height: MAX_HEIGHT
}

const aspectRatio = defaultViewBox.height / defaultViewBox.width

let currentViewBox = {
  minX: 0,
  minY: 0,
  width: MAX_WIDTH,
  height: MAX_HEIGHT
}

function initZoom() {
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

function getPoint(event) {
    //convert screen coordinates to SVG coordinates
    let point = svgTag.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY
    point = point.matrixTransform(svgTag.getScreenCTM().inverse());
    return point
}

function pan(mouseEvent) {
  if(mouseDown) { //can only pan if mouse is down and being dragged
    mouseEvent.preventDefault() //stops a selection being made

    const point = getPoint(mouseEvent)

    const newMinX = currentViewBox.minX + (panOrigin.x - point.x)
    const newMinY = currentViewBox.minY + (panOrigin.y - point.y)

    setViewBox({minX: newMinX, minY: newMinY, width: currentViewBox.width, height: currentViewBox.height})
  }
  
}

function zoom(wheelEvent) {
  const point = getPoint(wheelEvent)
  if(zoomCenter === null) {
    zoomCenter = point
  }

  const factor = 0.999 ** wheelEvent.deltaY
  const newWidth = currentViewBox.width * factor
  const newHeight = currentViewBox.height * factor

  const newX = zoomCenter.x - newWidth / 2
  const newY = zoomCenter.y - newHeight / 2

  setViewBox({minX: newX, minY: newY, width: newWidth, height: newHeight})

  window.clearTimeout(zoomTimeout);
	zoomTimeout = setTimeout(function() {
    zoomCenter = null
	}, 500);
}

function fitViewBoxInBounds(viewBox) {
  const newWidth = clamp(viewBox.width, MIN_WIDTH, MAX_WIDTH)
  const newHeight = clamp(viewBox.width, MIN_HEIGHT, MAX_HEIGHT)

  const newMinX = clamp(viewBox.minX, 0, defaultViewBox.width - newWidth)
  const newMinY = clamp(viewBox.minY, 0, defaultViewBox.height - newHeight)

  viewBox.minX = newMinX
  viewBox.minY = newMinY
  viewBox.width = newWidth
  viewBox.height = newHeight
}

//fits val inside min and max
function clamp(val, min, max) {
  if(val < min) return min;
  if(val > max) return max;
  return val;
}

function zoomToFullScreen() {
  animateSetViewBox(defaultViewBox)
}

function setViewBox(viewBox) {
  fitViewBoxInBounds(viewBox)
  currentViewBox = viewBox
  svgTag.setAttribute("viewBox", viewBoxString(viewBox))
}

function animateSetViewBox(viewBox) {
  fitViewBoxInBounds(viewBox)
  currentViewBox = viewBox
  gsap.to(svgTag, 1, { 
    attr: { viewBox: viewBoxString(viewBox)
  }, 
  ease:"power2.inOut"})
}

function viewBoxString(viewBox) {
  return viewBox.minX.toString() + " " + viewBox.minY.toString() + " " + viewBox.width.toString() + " " + viewBox.height.toString()
}