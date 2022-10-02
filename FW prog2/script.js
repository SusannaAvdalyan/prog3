var socket = io()

var side = 35;


function setup() {
  createCanvas(20 * side, 20 * side);


}

socket.on("weather", function (data) {
  weath = data;
})

function nkarel(matrix) {
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        fill("green");
      } else if (matrix[y][x] == 2) {
        fill("yellow");
      } else if (matrix[y][x] == 3) {
        fill("red");
      } else if (matrix[y][x] == 4) {
        fill("brown");
      } else if (matrix[y][x] == 5) {
        fill('purple');
      } else {
        fill("gray");
      }

      rect(x * side, y * side, side, side);
    }
  }
  
}

setInterval(() => {
  socket.on('send matrix', nkarel)
  console.log(weath);
}, 0  );


function kill() {
  socket.emit("kill")
}
function addGrass() {
  socket.emit("add grass")
}
function addGrassEater() {
  socket.emit("add grassEater")
}
function addPredator() {
  socket.emit("add predator")
}
function weather(){
  socket.emit("weather")
}