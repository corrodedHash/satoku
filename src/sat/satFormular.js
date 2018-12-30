function SatFormular(){
  // Contains index of clauses which used variables[i]
  this.variableUses = []
  // Contains all clauses
  // A clause is a dictionary with key: positive
  this.clauses = []
}

SatFormular.prototype.addClause = function(clause) {
  this.clauses.push(clause)
  for (let variable in clause){
    if (!(variable in this.variableUses)){
      this.variableUses[variable] = []
    }
    this.variableUses[variable].push(this.clauses.length - 1)
  }
}

SatFormular.prototype.toDimacs = function() {
  let resultString = ""
  resultString = "p cnf " + this.variableUses.length.toString();
  resultString += " " + this.clauses.length.toString() + "\n";
  for (let clauseIndex = 0; clauseIndex < this.clauses.length; clauseIndex++){
    for (let variableNumber in this.clauses[clauseIndex]){
      resultString += this.clauses[clauseIndex][variableNumber] ? "" : "-";
      resultString += ((parseInt(variableNumber)) + 1)
      resultString += " "
    }
    resultString += "0\n"
  }
}
