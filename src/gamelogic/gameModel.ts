import SatFormular from 'sat/satFormular'

export default class GameModel {
  variableListeners: Array < (clauseIndex: number, variableNumber: number,
                              state: boolean) => void >= [];
  clauseListeners: Array < (clauseIndex: number, state: boolean) => void > = [];
  formular: SatFormular;
  assignment: Array<boolean> = [];
  constructor(formular: SatFormular) {
    this.formular = formular
    for (var i = 0; i < this.formular.variableUses.length; i++) {
      this.assignment.push(true)
    }
  }
  clauseTrue(clauseIndex: number): boolean {
    let clause = this.formular.clauses[clauseIndex];
    for (let variableNumber in clause) {
      if (this.assignment[variableNumber] == (clause[variableNumber] > 0)) {
        return true;
      }
    }
    return false;
  }
  flipVariableAssignment(variableNumber: number): void {
    this.assignment[variableNumber] = !(this.assignment[variableNumber]);

    for (let i = 0; i < this.formular.variableUses[variableNumber].length;
         i++) {
      var clauseIndex = this.formular.variableUses[variableNumber][i];
      this.notifyVariableListeners(
          clauseIndex, variableNumber,
          this.assignment[variableNumber] ==
              (this.formular.clauses[clauseIndex][variableNumber] > 0));

      this.notifyClauseListeners(clauseIndex, this.clauseTrue(clauseIndex));
    }
  }
  notifyClauseListeners(clauseIndex: number, state: boolean) {
    for (let j = 0; j < this.variableListeners.length; j++) {
      this.clauseListeners[j](clauseIndex, state);
    }
  }
  notifyVariableListeners(clauseIndex: number, variableNumber: number,
                          state: boolean) {
    for (let j = 0; j < this.variableListeners.length; j++) {
      this.variableListeners[j](clauseIndex, variableNumber, state);
    }
  }

  updateAll() {
    for (let clauseIndex = 0; clauseIndex < this.formular.clauses.length;
         clauseIndex++) {
      for (let variableNumber in this.formular.clauses[clauseIndex]) {
        this.notifyVariableListeners(
            clauseIndex, parseInt(variableNumber),
            this.assignment[variableNumber] ==
                (this.formular.clauses[clauseIndex][variableNumber] > 0))
      }
      this.notifyClauseListeners(clauseIndex, this.clauseTrue(clauseIndex))
    }
  }

  isWon() {
    for (var i = 0; i < this.formular.clauses.length; i++) {
      if (!(this.clauseTrue(i))) {
        return false;
      }
    }
    return true;
  }
}
