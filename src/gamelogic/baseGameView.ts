export default abstract class BaseGameView {
  mainNode: any;
  abstract getCssClasses(): any;

  setClause(clauseIndex: number, positive: boolean) {
    let clauseNode =
        this.mainNode.ownerDocument.getElementById("clause_" + clauseIndex);
    if (positive) {
      clauseNode.classList.remove(this.getCssClasses().nodeBoxInactive);
      clauseNode.classList.add(this.getCssClasses().nodeBoxActive);
    } else {
      clauseNode.classList.remove(this.getCssClasses().nodeBoxActive);
      clauseNode.classList.add(this.getCssClasses().nodeBoxInactive);
    }
  };

  setVariable(clauseIndex: number, variableNumber: number, positive: boolean) {
    let clauseNode = this.mainNode.ownerDocument.getElementById(
        "var_" + clauseIndex + ":" + variableNumber);
    if (positive) {
      clauseNode.classList.remove(this.getCssClasses().nodeInactive);
      clauseNode.classList.add(this.getCssClasses().nodeActive);
    } else {
      clauseNode.classList.remove(this.getCssClasses().nodeActive);
      clauseNode.classList.add(this.getCssClasses().nodeInactive);
    }
  };
};
