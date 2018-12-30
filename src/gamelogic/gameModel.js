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

GameModel.prototype.flipVariableAssignment = function(variableNumber){
  this.assignment[variableNumber] = !(this.assignment[variableNumber])

  for (let i = 0; i < this.formular.variableUses[variableNumber].length; i++){
    var clauseIndex = this.formular.variableUses[variableNumber][i]
      this.notifyVariableListeners(clauseIndex, variableNumber,
        this.assignment[variableNumber]
        == this.formular.clauses[clauseIndex][variableNumber])

      this.notifyClauseListeners(clauseIndex, this.clauseTrue(clauseIndex))
  }
}

GameModel.prototype.notifyClauseListeners = function(clauseIndex, 
  state) {
    for (let j = 0; j < this.variableListeners.length; j++){
      this.clauseListeners[j](clauseIndex, state)
    }
}

GameModel.prototype.notifyVariableListeners = function(clauseIndex, 
  variableNumber, state) {
    for (let j = 0; j < this.variableListeners.length; j++){
      this.variableListeners[j](clauseIndex, variableNumber,
        state)
    }
}

GameModel.prototype.updateAll = function(){
  for (let clauseIndex = 0; clauseIndex < this.formular.clauses.length; 
    clauseIndex++){
    for (let variableNumber in this.formular.clauses[clauseIndex]){
      this.notifyVariableListeners(clauseIndex, variableNumber, 
        this.assignment[variableNumber]
        == this.formular.clauses[clauseIndex][variableNumber])
    }
    this.notifyClauseListeners(clauseIndex, this.clauseTrue(clauseIndex))
  }
}

GameModel.prototype.isWon = function(){
  for (var i = 0; i < this.formular.clauses.length; i++){
    if (!(this.clauseTrue(i))){
      return false
    }
  }
  return true
}
