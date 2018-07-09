function GameHandler(parentNode){
  this.formular = factoringSat()
  this.view = new CompactGameView(this.formular, this.clickHandler, parentNode)
  this.model = new GameModel(this.formular)
  this.model.variableListeners.push(this.view.setVariable)
  this.model.clauseListeners.push(this.view.setClause)
}

GameHandler.prototype.clickHandler = function (variableNumber){
  this.model.flipVariableAssignment(variableNumber)
}
