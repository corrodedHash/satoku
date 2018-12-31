export default class SatFormular {
  variableUses: Array<Array<number>> = [];
  clauses: Array<Array<number>> = [];

  addClause(clause: Array<number>) {
    this.clauses.push(clause)
    for (let variable in clause) {
      if (!(variable in this.variableUses)) {
        this.variableUses[variable] = []
      }
      this.variableUses[variable].push(this.clauses.length - 1)
    }
  };

  toDimacs() {
    let resultString = ""
    resultString = "p cnf " + this.variableUses.length.toString();
    resultString += " " + this.clauses.length.toString() + "\n";
    for (let clauseIndex = 0; clauseIndex < this.clauses.length;
         clauseIndex++) {
      for (let variableNumber in this.clauses[clauseIndex]) {
        resultString += this.clauses[clauseIndex][variableNumber] ? "" : "-";
        resultString += ((parseInt(variableNumber)) + 1)
        resultString += " "
      }
      resultString += "0\n"
    }
  };
}
