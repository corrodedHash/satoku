import SatFormular from "sat/satFormular";

import BaseGameView from "./baseGameView";

export default class CompactGameView extends BaseGameView {
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
  }
  public getCssClasses() { return CompactGameView.cssClasses; }

  public createNode(clauseIndex: number, variableNumber: number,
                    positive: boolean) {
    const node = document.createElement("div");
    node.id = "var_" + clauseIndex + ":" + variableNumber;
    node.classList.add(CompactGameView.cssClasses.node);
    if (positive) {
      node.classList.add(CompactGameView.cssClasses.nodeNegated);
      node.classList.add(CompactGameView.cssClasses.nodeInactive);
    } else {
      node.classList.add(CompactGameView.cssClasses.nodeNonNegated);
      node.classList.add(CompactGameView.cssClasses.nodeActive);
    }
    const id = (positive ? 1 : -1) * (variableNumber + 1);
    node.innerHTML = id.toString();
    node.onclick = () => { this.clickCallback(variableNumber); };
    return node;
  }

  public createBox(clause: number[], clauseIndex: number) {
    const box = document.createElement("div");
    box.className = CompactGameView.cssClasses.nodeBox;
    box.id = "clause_" + clauseIndex;
    for (const variableNumber in clause) {
      if (!clause.hasOwnProperty(variableNumber)) {
        continue;
      }
      const currentVariable =
          this.createNode(clauseIndex, parseInt(variableNumber, 10),
                          clause[variableNumber] > 0);
      box.appendChild(currentVariable);
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
  }
}

CompactGameView.cssClasses = {
  node : "compactNode",
  nodeActive : "compactNodeActive",
  nodeBox : "compactNodeBox",
  nodeBoxActive : "compactNodeBoxActive",
  nodeBoxInactive : "compactNodeBoxInactive",
  nodeInactive : "compactNodeInactive",
  nodeInvisible : "compactNodeInvisible",
  nodeNegated : "compactNodeNegated",
  nodeNonNegated : "compactNodeNonNegated",
};
