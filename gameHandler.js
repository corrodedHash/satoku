function GameHandler(parentNode, gameViewClass, gameModelClass, formular){
  this.formular = formular 

  this.view = new gameViewClass(this.formular, 
    this.clickHandler.bind(this), parentNode)

  this.model = new gameModelClass(this.formular)

  this.model.variableListeners.push(this.view.setVariable.bind(this.view))
  this.model.clauseListeners.push(this.view.setClause.bind(this.view))

  this.model.updateAll()
}

GameHandler.prototype.clickHandler = function (variableNumber){
  this.model.flipVariableAssignment(variableNumber)
}
