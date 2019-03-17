import SatFormular from "sat/satFormular";

import BaseGameView from "./baseGameView";

export default class PrettyGameView extends BaseGameView {
  public static cssClasses: {
    node: string; nodeNonNegated: string; nodeNegated: string;
    nodeActive: string;
    nodeInactive: string;
    nodeInvisible: string;
    nodeBox: string;
    nodeBoxActive: string;
    nodeBoxInactive: string;
  };
  public formular: any;
  public clickCallback: any;
  public mainNode: any;
  constructor(formular: SatFormular, clickCallback: () => void,
              parentNode: HTMLElement) {
    super();
    this.formular = formular;
    this.clickCallback = clickCallback;
    this.mainNode = this.generate();
    parentNode.appendChild(this.mainNode);
  }  public getCssClasses() { return PrettyGameView.cssClasses; }

  public createNode(clauseIndex: number, variableNumber: number, positive: boolean) {
    const node = document.createElement("div");
    node.classList.add(PrettyGameView.cssClasses.node);
    node.id = "var_" + clauseIndex + ":" + variableNumber;

    if (positive) {
      node.classList.add(PrettyGameView.cssClasses.nodeNegated);
      node.classList.add(PrettyGameView.cssClasses.nodeInactive);
    } else {
      node.classList.add(PrettyGameView.cssClasses.nodeNonNegated);
      node.classList.add(PrettyGameView.cssClasses.nodeActive);
    }
    const id = (positive ? 1 : -1) * ((1 * variableNumber) + 1);
    node.innerHTML = id.toString();
    node.onclick = () => { this.clickCallback(variableNumber); };
    return node;
  }
  public createInvisibleNode() {
    const node = document.createElement("div");
    node.classList.add(PrettyGameView.cssClasses.node);
    node.classList.add(PrettyGameView.cssClasses.nodeInvisible);
    return node;
  }
  public createBox(clause: number[], clauseIndex: number) {
    const box = document.createElement("div");
    box.className = PrettyGameView.cssClasses.nodeBox;
    box.id = "clause_" + clauseIndex;
    for (let i = 0; i <= this.formular.variableUses.length; ++i) {
      if (i in clause) {
        const currentVariable = this.createNode(clauseIndex, i, clause[i] > 0);
        box.appendChild(currentVariable);
      } else {
        box.appendChild(this.createInvisibleNode());
      }
    }
    return box;
  }
  public generate() {
    const puzzleDiv = document.createElement("div");
    puzzleDiv.id = "puzzleContainer";
    for (let i = 0; i < this.formular.clauses.length; ++i) {
      puzzleDiv.appendChild(this.createBox(this.formular.clauses[i], i));
    }
    return puzzleDiv;
  }}

PrettyGameView.cssClasses = {
  node : "beautyNode",
  nodeActive : "beautyNodeActive",
  nodeBox : "beautyNodeBox",
  nodeBoxActive : "beautyNodeBoxActive",
  nodeBoxInactive : "beautyNodeBoxInactive",
  nodeInactive : "beautyNodeInactive",
  nodeInvisible : "beautyNodeInvisible",
  nodeNegated : "beautyNodeNegated",
  nodeNonNegated : "beautyNodeNonNegated",
};
