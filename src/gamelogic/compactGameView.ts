import BaseGameView from './baseGameView'
import SatFormular from 'sat/satFormular'
export default class CompactGameView extends BaseGameView{
    getCssClasses() {
      return CompactGameView.cssClasses;
    }
  formular: any;
  clickCallback: any;
  mainNode: any;
  static cssClasses: { node: string; nodeNonNegated: string; nodeNegated: string; nodeActive: string; nodeInactive: string; nodeInvisible: string; nodeBox: string; nodeBoxActive: string; nodeBoxInactive: string; };
  constructor(formular: SatFormular, clickCallback: () => void, parentNode: HTMLElement){
    super();
    this.formular = formular;
    this.clickCallback = clickCallback;
    this.mainNode = this.generate();
    parentNode.appendChild(this.mainNode);
  }

  createNode(
    clauseIndex: number, variableNumber: number, positive: boolean){
    var node = document.createElement("div");
    node.id = "var_" + clauseIndex + ":" + variableNumber;
    node.classList.add(CompactGameView.cssClasses.node);
    if (positive){
      node.classList.add(CompactGameView.cssClasses.nodeNegated);
      node.classList.add(CompactGameView.cssClasses.nodeInactive);
    } else {
      node.classList.add(CompactGameView.cssClasses.nodeNonNegated);
      node.classList.add(CompactGameView.cssClasses.nodeActive);
    }
    let id = (positive ? 1 : -1) * (variableNumber + 1)
    node.innerHTML = id.toString();
    node.onclick = () => {this.clickCallback(variableNumber)};
    return node;
  }

  createBox(clause: Array<number>, clauseIndex: number) {
    var box = document.createElement("div");
    box.className = CompactGameView.cssClasses.nodeBox;
    box.id = "clause_" + clauseIndex;
    for (let variableNumber in clause){
      let currentVariable = this.createNode(clauseIndex, parseInt(variableNumber),
        clause[variableNumber] > 0);
      box.appendChild(currentVariable);
    }
    return box;
  }

  generate (){
    let puzzleDiv = document.createElement("div");
    puzzleDiv.id = "puzzleContainer";
    for (var i = 0; i < this.formular.clauses.length; ++i){
      puzzleDiv.appendChild(this.createBox(this.formular.clauses[i], i));
    }
    return puzzleDiv;
  }
}

CompactGameView.cssClasses = {
  node: "compactNode",
  nodeNonNegated: "compactNodeNonNegated",
  nodeNegated: "compactNodeNegated",
  nodeActive: "compactNodeActive",
  nodeInactive: "compactNodeInactive",
  nodeInvisible: "compactNodeInvisible",
  nodeBox: "compactNodeBox",
  nodeBoxActive: "compactNodeBoxActive",
  nodeBoxInactive: "compactNodeBoxInactive"
}



