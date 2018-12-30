export abstract class BaseGameView {
    mainNode: any;
    cssClasses: any;

  setClause (clauseIndex: number, positive: boolean){
    let clauseNode = this.mainNode.ownerDocument.getElementById("clause_" + clauseIndex);
    if (positive){
      clauseNode.classList.remove(this.cssClasses.nodeBoxInactive)
      clauseNode.classList.add(this.cssClasses.nodeBoxActive)
    } else {
      clauseNode.classList.remove(this.cssClasses.nodeBoxActive)
      clauseNode.classList.add(this.cssClasses.nodeBoxInactive)
    }
  }

  setVariable (
    clauseIndex: number, variableNumber: number, positive: boolean){
    let clauseNode = this.mainNode.ownerDocument.getElementById("var_"
      + clauseIndex + ":" + variableNumber);
    if (positive){
      clauseNode.classList.remove(this.cssClasses.nodeInactive)
      clauseNode.classList.add(this.cssClasses.nodeActive)
    } else {
      clauseNode.classList.remove(this.cssClasses.nodeActive)
      clauseNode.classList.add(this.cssClasses.nodeInactive)
    }
  }
}


