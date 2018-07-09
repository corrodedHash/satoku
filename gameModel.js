function GameModel(_formular){
  this.formular = _formular
  this.assignment = []
  for (var i = 0; i < this.formular.variableUses.length; i++){
    this.assignment.push(true)
  }
  this.variableListeners = []
  this.clauseListeners = []
}

GameModel.prototype.clauseTrue = function(clauseIndex){
  let clause = this.formular.clauses[clauseIndex]
  for (let variableNumber in clause){
    if (this.assignment[variableNumber] == clause[variableNumber]){
      return true
    }
  }
  return false
}

GameModel.prototype.flipVariableAssignment = function(variableNumber)
{
  this.assignment[variableNumber] = !(this.assignment[variableNumber])

  for (let i = 0; i < this.formular.variableUses[variableNumber].length; i++){
    var clauseIndex = this.formular.variableUses[variableNumber][i]
    for (let j = 0; j < this.clauseListeners.length; j++){
      this.variableListeners[j](clauseIndex, variableNumber,
        this.assignment[variableNumber]
        == this.formular.clauses[clauseIndex][variableNumber])

      this.clauseListeners[j](clauseIndex, this.clauseTrue(clauseIndex))
    }
  }
}

GameModel.prototype.isWon = function(){
  for (var i = 0; i < this.assignment.length; i++){
    if (!(this.clauseTrue(i))){
      return false
    }
  }
  return true
}
