let livingCreature = require("./LivingCreature")
module.exports =   class GrassEater extends LivingCreature {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.energy = 8;
      this.multiply = 0;
      this.directions = [];
    }
  
    
  
    mul() {
      this.multiply++;
      var emptyCell = super.chooseCell(0);
      var newCell = emptyCell(Math.floor * Math.random);
  
      console.log(emptyCells);
      if (newCell && this.multiply >= 15) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 2;
  
        var grEat = new GrassEater(newX, newY);
        grassEaterArr.push(grEat);
        this.multiply = 0;
      }
    }
  
    move() {
      this.energy--;
      var emptyCell = super.chooseCell(0);
      var newCell = emptyCell(Math.floor * Math.random);
  
      if (newCell && this.energy >= 0) {
        console.log(newCell);
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
      } else {
        if (this.energy < 0) {
          this.die();
        }
      }
    }
  
    eat() {
      var emptyCell = super.chooseCell(1);
      var newCell = emptyCell(Math.floor * Math.random);
  
      if (newCell) {
        this.energy++;
        var newX = newCell[0];
        var newY = newCell[1];
  
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
        this.x = newX;
        this.y = newY;
        for (var i in grassArr) {
          if (newX == grassArr[i].x && newY == grassArr[i].y) {
            grassArr.splice(i, 1);
            break;
          }
        }
      } else {
        this.move();
      }
    }
  
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in grassEaterArr) {
        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    }
  }