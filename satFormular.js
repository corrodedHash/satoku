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
