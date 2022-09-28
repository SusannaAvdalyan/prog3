var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000, () => {
    console.log("server run");
});

function matrixGenerator(
    matrixSize,
    grassCount,
    grEatCount,
    predatorCount,
    VcCount
  ) {
    let matrix = [];
  
    for (let i = 0; i < matrixSize; i++) {
      matrix[i] = [];
      for (let j = 0; j < matrixSize; j++) {
        matrix[i][j] = 0;
      }
    }
  
    for (let i = 0; i < grassCount; i++) {
      let x = Math.floor(Math.random() * matrixSize);
      let y = Math.floor(Math.random() * matrixSize);
  
      if (matrix[y][x] == 0) {
        matrix[y][x] = 1;
      }
    }
  
    for (let i = 0; i < grEatCount; i++) {
      let x = Math.floor(Math.random() * matrixSize);
      let y = Math.floor(Math.random() * matrixSize);
  
      if (matrix[y][x] == 0) {
        matrix[y][x] = 2;
      }
    }
    for (let i = 0; i < predatorCount; i++) {
      let x = Math.floor(Math.random() * matrixSize);
      let y = Math.floor(Math.random() * matrixSize);
  
      if (matrix[y][x] == 0) {
        matrix[y][x] = 3;
      }
    }
    for (let i = 0; i < VcCount; i++) {
      let x = Math.floor(Math.random() * matrixSize);
      let y = Math.floor(Math.random() * matrixSize);
  
      if (matrix[y][x] == 0) {
        matrix[y][x] = 4;
      }
    }
    for (let i = 0; i < VcCount; i++) {
      let x = Math.floor(Math.random() * matrixSize);
      let y = Math.floor(Math.random() * matrixSize);
  
      if (matrix[y][x] == 0) {
        matrix[y][x] = 5;
      }
    }
  
    return matrix;
  }
  
matrix = matrixGenerator(20, 15, 40, 1, 25, 5);

io.sockets.emit("send matrix", matrix)
  

 grassArr = [];
 grassEaterArr = [];
 predatorArr = [];
 VacuumCleanerArr = [];
 builderArr = [];


 Grass = require("./grass")
 GrassEater = require("./grassEater")
 Predator  = require("./predator")
 Builder = require("./builder")
 VacuumCleaner = require("./vaccumCleaner")


 function createObject(){
  for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] == 1) {
        var gr = new Grass(x, y);

        grassArr.push(gr);
      } else if (matrix[y][x] == 2) {
        var grEat = new GrassEater(x, y);

        grassEaterArr.push(grEat);
      } else if (matrix[y][x] == 3) {
        var pre = new Predator(x, y);

        predatorArr.push(pre);
      } else if (matrix[y][x] == 4) {
        var vc = new VacuumCleaner(x, y);

        VacuumCleanerArr.push(vc);
      }
      else if (matrix[y][x] == 5) {
        var bd = new Builder(x, y);

        builderArr.push(bd);
      }
    }
  }

io.sockets.emit("send matrix", matrix)
   
 }


 function game(){

  for (var i in grassArr) {
    grassArr[i].mul();
  }

  for (let i in grassEaterArr) {
    grassEaterArr[i].mul();
    grassEaterArr[i].eat();
  }

  for (let i in predatorArr) {
    predatorArr[i].mul();
    predatorArr[i].eat();
  }
  for (let i in VacuumCleanerArr) {
    // let y էիր գրել սա առաջինը
    VacuumCleanerArr[i].mul();
    VacuumCleanerArr[i].clean();
  }
  for (let i in builderArr) {
    builderArr[i].eat();
  }

io.sockets.emit("send matrix", matrix)
    
 }

 setInterval(game, 200)




 io.on("connection", () => {
   createObject(matrix)
 })