const canvas = document.querySelector("svg");
const bound = canvas.getBoundingClientRect();
const pathStroke = document.querySelector("path")
var points = [];
var path = "";
var hue = 0;
var sat = 50;
var light = 50;

const color = document.querySelector(".color");

setColor();
    
function setHue(value) {
  hue = value;
  setColor();
}
function setSat(value) {
  sat = value;
  setColor();
}
function setLight(value) {
  light = value;
  setColor();
}
function setColor() {
  color.style.background = 
    `hsl(${hue} ${sat}% ${light}%)`;
}
fillingObj = null;
canvas.addEventListener("touchstart",
(e) => {
  console.log("in")
  fillingObj = document.elementFromPoint(
    e.touches[0].clientX,
    e.touches[0].clientY);
  console.log(fillingObj)
  console.log(fillingObj?.id);
});

canvas.addEventListener("touchmove",
(e) => {
  points.push({
    x: Math.round(
      e.touches[0].clientX - bound.left),
    y: Math.round(
      e.touches[0].clientY - bound.top)
  });
});

canvas.addEventListener("touchend", 
() => {
  if(points.length < 1){ 
    if(fillingObj?.id == "xx") {
      fillingObj.style.fill = color.style.background;
      fillingObj = null;
    }
    return; 
  }
  
  path += `M ${points[0].x} ${points[0].y}`;
  for(var i = 1; i<points.length; i++){
    path += ` L ${points[i].x} ${points[i].y}`;
  }
  
  var temp = document.createElementNS
    ("http://www.w3.org/2000/svg","path")
  //console.log(path)
  temp.setAttribute("id", "xx");
  canvas.append(temp);
  temp.style.d = `path(\"${path} Z\")`;
  path = "";
  points = [];
})
