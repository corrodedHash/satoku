function GameModel(_formular){
  this.formular = _formular
  this.assignment = []
  for (var i = 0; i < this.formular.clauses.length; i++){
    this.assignment.push(
      Array.apply(null, Array(this.formular.clauses[i].length))
      .map(function () { return true; }))
  }
}

GameModel.prototype.clauseTrue = function(clauseIndex){
  for (var i = 0; i < this.formular[clauseIndex].length; i++){
    if (this.formular[clauseIndex][i].positive
      == this.assignment[clauseIndex][i]){
      return true
    }
  }
  return false
}

GameModel.prototype.variableTrue = function(clauseIndex, variableNumber){
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
