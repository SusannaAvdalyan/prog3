let LivingCreature = require("./LivingCreature")

module.exports = class Grass extends LivingCreature{
  
    mul() {
      super.multiply++;
      var emptyCell = super.chooseCell(0);
      var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
  
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