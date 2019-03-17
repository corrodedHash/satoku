export default class SatFormular {
  public variableUses: number[][] = [];
  public clauses: boolean[][] = [];

  public addClause(clause: boolean[]) {
    this.clauses.push(clause);
    for (const variable in clause) {
      if (!clause.hasOwnProperty(variable)) {
        continue;
      }
      if (!(variable in this.variableUses)) {
        this.variableUses[variable] = [];
      }
      this.variableUses[variable].push(this.clauses.length - 1);
    }
  }

  public toDimacs() {
    let resultString = "";
    resultString = "p cnf " + this.variableUses.length.toString();
    resultString += " " + this.clauses.length.toString() + "\n";
    for (const clause of this.clauses) {
      for (const variableNumber in clause) {
        if (!clause.hasOwnProperty(variableNumber)) {
          continue;
        }
        resultString += clause[variableNumber] ? "" : "-";
        resultString += (parseInt(variableNumber, 10)) + 1;
        resultString += " ";
      }
      resultString += "0\n";
    }
  }
}
