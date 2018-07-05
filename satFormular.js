function SatFormular(){
  // Contains index of clauses which used variables[i]
  this.variables = []
  // Contains all clauses
  // A clause contains variable = {number: 0, positive: true}
  this.clauses = []
}

SatFormular.prototype.addClause = function(clause) {
  this.clauses.push(clause)
  for (var i = 0; i < clause.length; i++){
    if (!(clause[i].index in this.variables)){
      this.variables[clause[i].index] = []
    }
    this.variables[clause[i].index].push(this.clauses.length - 1)
  }
}
