let LivingCreature = require("./LivingCreature")

module.exports = class Builder extends LivingCreature{
    constructor(x, y) {
      super(x,y)
      this.directions = [
        [this.x, this.y - 1],
        [this.x - 1, this.y],
        [this.x + 1, this.y],
        [this.x, this.y + 1],
      ];
    }
    
    eat() {
      let found = this.chooseCell(0);
      let exact = found[Math.floor(Math.random() * found.length)];
  
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
  