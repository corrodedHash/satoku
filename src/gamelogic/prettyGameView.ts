import SatFormular from 'sat/satFormular'

import BaseGameView from './baseGameView'

export default class PrettyGameView extends BaseGameView {
  getCssClasses() { return PrettyGameView.cssClasses; }
  formular: any;
  clickCallback: any;
  mainNode: any;
  static cssClasses: {
    node: string; nodeNonNegated : string; nodeNegated : string;
    nodeActive : string;
    nodeInactive : string;
    nodeInvisible : string;
    nodeBox : string;
    nodeBoxActive : string;
    nodeBoxInactive : string;
  };
  constructor(formular: SatFormular, clickCallback: () => void,
              parentNode: HTMLElement) {
    super();
    this.formular = formular;
    this.clickCallback = clickCallback;
    this.mainNode = this.generate();
    parentNode.appendChild(this.mainNode);
  }

  createNode(clauseIndex: number, variableNumber: number, positive: boolean) {
    var node = document.createElement("div");
    node.classList.add(PrettyGameView.cssClasses.node);
    node.id = "var_" + clauseIndex + ":" + variableNumber;

    if (positive) {
      node.classList.add(PrettyGameView.cssClasses.nodeNegated);
      node.classList.add(PrettyGameView.cssClasses.nodeInactive);
    } else {
      node.classList.add(PrettyGameView.cssClasses.nodeNonNegated);
      node.classList.add(PrettyGameView.cssClasses.nodeActive);
    }
    let id = (positive ? 1 : -1) * ((1 * variableNumber) + 1)
    node.innerHTML = id.toString();
    node.onclick = () => { this.clickCallback(variableNumber) };
    return node;
  }

  createInvisibleNode() {
    var node = document.createElement("div");
    node.classList.add(PrettyGameView.cssClasses.node);
    node.classList.add(PrettyGameView.cssClasses.nodeInvisible);
    return node;
  }

  createBox(clause: Array<number>, clauseIndex: number) {
    var box = document.createElement("div");
    box.className = PrettyGameView.cssClasses.nodeBox;
    box.id = "clause_" + clauseIndex;
    for (var i = 0; i <= this.formular.variableUses.length; ++i) {
      if (i in clause) {
        let currentVariable = this.createNode(clauseIndex, i, clause[i] > 0);
        box.appendChild(currentVariable);
      } else {
        box.appendChild(this.createInvisibleNode());
      }
    }
    return box;
  }

  generate() {
    let puzzleDiv = document.createElement("div");
    puzzleDiv.id = "puzzleContainer";
    for (var i = 0; i < this.formular.clauses.length; ++i) {
      puzzleDiv.appendChild(this.createBox(this.formular.clauses[i], i));
    }
    return puzzleDiv;
  }
}

PrettyGameView.cssClasses = {
  node : "beautyNode",
  nodeNonNegated : "beautyNodeNonNegated",
  nodeNegated : "beautyNodeNegated",
  nodeActive : "beautyNodeActive",
  nodeInactive : "beautyNodeInactive",
  nodeInvisible : "beautyNodeInvisible",
  nodeBox : "beautyNodeBox",
  nodeBoxActive : "beautyNodeBoxActive",
  nodeBoxInactive : "beautyNodeBoxInactive"
}
