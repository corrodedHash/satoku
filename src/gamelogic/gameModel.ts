import SatFormular from "sat/satFormular";

export default class GameModel {
  public variableListeners: Array<(clauseIndex: number, variableNumber: number,
                                   state: boolean) => void> = [];
  public clauseListeners: Array<(clauseIndex: number, state: boolean) => void> =
      [];
  public formular: SatFormular;
  public assignment: boolean[] = [];
  constructor(formular: SatFormular) {
    this.formular = formular;
    for (const i of this.formular.variableUses) {
      this.assignment.push(true);
    }
  }

  public clauseTrue(clauseIndex: number): boolean {
    const clause = this.formular.clauses[clauseIndex];
    for (const variableNumber in clause) {
      if (this.assignment[variableNumber] === clause[variableNumber]) {
        return true;
      }
    }
    return false;
  }

  public flipVariableAssignment(variableNumber: number): void {
    this.assignment[variableNumber] = !(this.assignment[variableNumber]);

    for (const i of this.formular.variableUses[variableNumber]) {
      const clauseIndex = this.formular.variableUses[variableNumber][i];
      this.notifyVariableListeners(
          clauseIndex, variableNumber,
          this.assignment[variableNumber] ===
              this.formular.clauses[clauseIndex][variableNumber]);

      this.notifyClauseListeners(clauseIndex, this.clauseTrue(clauseIndex));
    }
  }

  public notifyClauseListeners(clauseIndex: number, state: boolean) {
    for (const j of this.clauseListeners) {
      j(clauseIndex, state);
    }
  }

  public notifyVariableListeners(clauseIndex: number, variableNumber: number,
                                 state: boolean) {
    for (const j of this.variableListeners) {
      j(clauseIndex, variableNumber, state);
    }
  }

  public updateAll() {
    for (let clauseIndex = 0; clauseIndex < this.formular.clauses.length;
         clauseIndex++) {
      for (const variableNumber in this.formular.clauses[clauseIndex]) {
        if (!this.formular.clauses[clauseIndex].hasOwnProperty(
                variableNumber)) {
          continue;
        }
        this.notifyVariableListeners(
            clauseIndex, parseInt(variableNumber, 10),
            this.assignment[variableNumber] ===
                this.formular.clauses[clauseIndex][variableNumber]);
      }
      this.notifyClauseListeners(clauseIndex, this.clauseTrue(clauseIndex));
    }
  }

  public isWon() {
    for (let i = 0; i < this.formular.clauses.length; i++) {
      if (!(this.clauseTrue(i))) {
        return false;
      }
    }
    return true;
  }
}
