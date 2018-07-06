function GameModel(_formular){
  this.formular = _formular
  this.assignment = []
  for (var i = 0; i < this.formular.variables.length; i++){
    this.assignment.push(true)
  }
  this.variableListeners = []
  this.clauseListeners = []
}

GameModel.prototype.clauseTrue = function(clauseIndex){
  for (var i = 0; i < this.formular.clauses[clauseIndex].length; i++){
    var variableNumber = this.formular.clauses[clauseIndex][i].number
    if (this.assignment[variableNumber] 
      == this.formular.clauses[variableNumber].positive){
      return true
    }
  }
  return false
}

GameModel.prototype.flipVariableAssignment = function(variableNumber)
{
  this.assignment[variableNumber] = !(this.assignment[variableNumber])
  for (int i = 0; i < this.formular.variables[variableNumber].length; i++){
    var clauseIndex = this.formular.variables[variableNumber][i]
    for (int j = 0; j < this.variableListeners.length; j++){
      this.variableListeners[j](clauseIndex, variableNumber, this.formular.clauses[clauseIndex][variableIndex]
    }
  }
}

GameModel.prototype.setVariableAssignment = function(clauseIndex, variableNumber, boolstate)
{
  for (var i = 0; i < this.formular[clauseIndex].length; i++){
    if (this.formular[clauseIndex][i].number == variableNumber){
      this.assignment[clauseIndex][i] = boolstate
    }
  }
}

GameModel.prototype.getVariableAssignment = function(clauseIndex, variableNumber){
  for (var i = 0; i < this.formular[clauseIndex].length; i++){
    if (this.formular[clauseIndex][i].number == variableNumber){
      return this.formular[clauseIndex][i].positive == this.assignment[clauseIndex][i]
    }
  }
  console.log("Variable " + variableNumber
    + " not contained in clause " + clauseIndex)
}

GameModel.prototype.isWon = function(){
  for (var i = 0; i < this.assignment.length; i++){
    if (!(this.clauseTrue(i))){
      return false
    }
  }
  return true
}
