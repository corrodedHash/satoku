export default abstract class BaseGameView {
  public mainNode: any;
  public abstract getCssClasses(): any;

  public setClause(clauseIndex: number, positive: boolean) {
    const clauseNode =
        this.mainNode.ownerDocument.getElementById("clause_" + clauseIndex);
    if (positive) {
      clauseNode.classList.remove(this.getCssClasses().nodeBoxInactive);
      clauseNode.classList.add(this.getCssClasses().nodeBoxActive);
    } else {
      clauseNode.classList.remove(this.getCssClasses().nodeBoxActive);
      clauseNode.classList.add(this.getCssClasses().nodeBoxInactive);
    }
  }

  public setVariable(clauseIndex: number, variableNumber: number, positive: boolean) {
    const clauseNode = this.mainNode.ownerDocument.getElementById(
        "var_" + clauseIndex + ":" + variableNumber);
    if (positive) {
      clauseNode.classList.remove(this.getCssClasses().nodeInactive);
      clauseNode.classList.add(this.getCssClasses().nodeActive);
    } else {
      clauseNode.classList.remove(this.getCssClasses().nodeActive);
      clauseNode.classList.add(this.getCssClasses().nodeInactive);
    }
  }
}
