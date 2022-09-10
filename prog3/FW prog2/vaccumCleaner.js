class VacuumCleaner extends LivingCreature{
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.multiply = 0;
      this.directions = [
        [this.x - 2, this.y - 2],
        [this.x - 1, this.y - 2],
        [this.x, this.y - 2],
        [this.x + 1, this.y - 2],
        [this.x + 2, this.y - 2],
  
        [this.x - 2, this.y - 1],
        [this.x - 1, this.y - 1],
        [this.x, this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x + 2, this.y - 1],
  
        [this.x - 2, this.y],
        [this.x - 1, this.y],
        [this.x, this.y],
        [this.x + 1, this.y],
        [this.x + 2, this.y],
  
        [this.x - 2, this.y + 1],
        [this.x - 1, this.y + 1],
        [this.x, this.y + 1],
        [this.x + 1, this.y + 1],
        [this.x + 2, this.y + 1],
  
        [this.x - 2, this.y + 2],
        [this.x - 1, this.y + 2],
        [this.x, this.y + 2],
        [this.x + 1, this.y + 2],
        [this.x + 2, this.y + 1],
      ];
    }
    // getNewCoordinates() {
  
    // }
    chooseCell(char, char1, char2) {
      // this.getNewCoordinates()
      var found = [];
  
      for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
  
        if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
          if (matrix[y][x] == char) {
            found.push(this.directions[i]); //զանգվածիտ անունը found է իսկ դու result ում ես push անոմ
          }
        }
        if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
          if (matrix[y][x] == char1) {
            found.push(this.directions[i]);
          }
        }
        if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
          if (matrix[y][x] == char2) {
            found.push(this.directions[i]);
          }
        }
        return found;
      }
    }
    mul() {
      this.multiply++;
      var emptyCells = this.chooseCell(0, 1, 2);
      var newCell = random(emptyCells);
  
      if (newCell && this.multiply >= 10) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = 4;
  
        var vc = new VacuumCleaner(newX, newY);
        VacuumCleanerArr.push(vc);
        this.multiply = 0;
      }
    }
    clean() {
      var emptyCells = this.chooseCell(1, 2, 3);
  
      if (emptyCells) {
        for (var j in emptyCells) {
          //var -մոռացել ես գրել
          var newX = emptyCells[j][0]; //այստեղ կրկին i-էիր գրել
          var newY = emptyCells[j][1];
  
          matrix[newY][newX] = matrix[this.y][this.x];
          matrix[this.y][this.x] = 0;
          this.x = newX;
          this.y = newY;
          for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
              grassEaterArr.splice(i, 1);
              fill("aqua");
              break;
            }
          }
          for (var i in grassArr) {
            if (newX == grassArr[i].x && newY == grassArr[i].y) {
              grassArr.splice(i, 1);
              break;
            }
          }
          for (var i in predatorArr) {
            if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
              predatorArr.splice(i, 1);
              break;
            }
          } //
        } //ջնջելու ամբողջ լոգիկան if-ից դուրս ես գրել
      }
    }
  }