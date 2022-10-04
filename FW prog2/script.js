var socket = io();

var side = 35;
weath = "winter";
socket.on("weather_data", function (data) {
  weath = data;
});

function setup() {
  createCanvas(20 * side, 20 * side);
}

function weatherFiller(t) {
  let w = weath;
  if (t == 1) {
    if (w == "winter") fill("white");
    else if (w == "summer") fill("green");
    else if (w == "autumn") fill("#fc7b03");
    else if (w == "spring") fill("#e6a4fc");
  } else if (t == 2) {
    if (w == "winter") fill("yellow");
    else if (w == "summer") fill("yellow");
    else if (w == "autumn") fill("yellow");
    else if (w == "spring") fill("yellow");
  } else if (t == 3) {
    if (w == "winter") fill("red");
    else if (w == "summer") fill("red");
    else if (w == "autumn") fill("red");
    else if (w == "spring") fill("red");
  } else if (t == 4) {
    if (w == "winter") fill("brown");
    else if (w == "summer") fill("brown");
    else if (w == "autumn") fill("brown");
    else if (w == "spring") fill("brown");
  } else if (t == 5) {
    if (w == "winter") fill("purple");
    else if (w == "summer") fill("purple");
    else if (w == "autumn") fill("purple");
    else if (w == "spring") fill("purple");
  } else fill("gray");
  if (w == "autumn") {
    document.body.style.backgroundImage = "url('autumn.jpg')";
  } else if (w == "spring") {
    document.body.style.backgroundImage = "url('spring.jpg')";
  } else if (w == "summer") {
    document.body.style.backgroundImage = "url('summer.jpg')";
  } else if (w == "winter") {
    document.body.style.backgroundImage = "url('winter.jpg')";
  }
}

function nkarel(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      weatherFiller(matrix[y][x]);
      // if (matrix[y][x] == 1) {
      //    if (matrix[y][x] == 2) {
      //   fill("yellow");
      // } else if (matrix[y][x] == 3) {
      //   fill("red");
      // } else if (matrix[y][x] == 4) {
      //   fill("brown");
      // } else if (matrix[y][x] == 5) {
      //   fill('purple');
      // } else {
      //   fill("gray");
      // }

      rect(x * side, y * side, side, side);
    }
  }
}
socket.on("send matrix", nkarel);

function kill() {
  socket.emit("kill");
}
function addGrass() {
  socket.emit("add grass");
}
function addGrassEater() {
  socket.emit("add grassEater");
}
function addPredator() {
  socket.emit("add predator");
}
function weather() {
  socket.emit("weather");
}
