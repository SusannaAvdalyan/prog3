class Grass {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;

    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(char) {
    var found = [];

    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];

      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  mul() {
    this.multiply++;
    var emptyCell = this.chooseCell(0);
    var newCell = random(emptyCell);

    if (newCell && this.multiply >= 5) {
      var newX = newCell[0];
      var newY = newCell[1];

      matrix[newY][newX] = 1;

      var gr = new Grass(newX, newY);

      grassArr.push(gr);

      this.multiply = 0;
    }
  }
}

class GrassEater {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.multiply = 0;
    this.directions = [];
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(char) {
    this.getNewCoordinates();
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

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
    var emptyCell = this.chooseCell(0);
    var newCell = random(emptyCell);

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
    var emptyCell = this.chooseCell(1);
    var newCell = random(emptyCell);

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

class Predator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.multiply = 0;
    this.directions = [];
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  mul() {
    this.multiply++;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    console.log(emptyCells);
    if (newCell && this.multiply >= 15) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = 3;

      var pre = new Predator(newX, newY);
      predatorArr.push(pre);
      this.multiply = 0;
    }
  }

  move() {
    this.energy--;
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

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
    var emptyCells = this.chooseCell(2);
    var newCell = random(emptyCells);

    if (newCell) {
      this.energy++;
      var newX = newCell[0];
      var newY = newCell[1];

      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;
      this.x = newX;
      this.y = newY;
      for (var i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    } else {
      this.move();
    }
  }

  die() {
    matrix[this.y][this.x] = 0;
    for (var i in predatorArr) {
      if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
        predatorArr.splice(i, 1);
        break;
      }
    }
  }
}
class VacuumCleaner {
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
class Builder {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.directions = [
      [this.x, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x, this.y + 1],
    ];
  }
  getNewCordinates() {
    this.directions = [
      [this.x, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x, this.y + 1],
    ];
  }
  chooseCell(char) {
    this.getNewCordinates();
    let result = [];

    for (let i = 0; i < this.directions.length; i++) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];

      if (y < matrix.length && y >= 0 && x < matrix[0].length && x >= 0) {
        if (matrix[y][x] == char) {
          result.push(this.directions[i]);
        }
      }
    }
    return result;
  }
  eat() {
    let found = this.chooseCell(0);
    let exact = random(found);

    if (exact) {
      let x = exact[0];
      let y = exact[1];

      for (let i = 0; i < grassArr.length; i++) {
        if (grassArr[i].x == x && grassArr[i].y == y) {
          grassArr.splice(i, 1);
        }
      }

      matrix[y][x] = 5;
      matrix[this.y][this.x] = 1;

      this.x = x;
      this.y = y;
    }
  }
}
