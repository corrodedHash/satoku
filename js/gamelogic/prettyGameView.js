/* exported beautyPuzzleGenerator */
/* global gameHandler */
/* global getVarCount */

function PrettyGameView(formular, clickCallback, parentNode) {
  this.formular = formular
  this.clickCallback = clickCallback
  this.mainNode = this.generate()
  parentNode.appendChild(this.mainNode)
}

PrettyGameView.prototype = Object.create(BaseGameView.prototype);

PrettyGameView.prototype.cssClasses= {
  node: "beautyNode",
  nodeNonNegated: "beautyNodeNonNegated",
  nodeNegated: "beautyNodeNegated",
  nodeActive: "beautyNodeActive",
  nodeInactive: "beautyNodeInactive",
  nodeInvisible: "beautyNodeInvisible",
  nodeBox: "beautyNodeBox",
  nodeBoxActive: "beautyNodeBoxActive",
  nodeBoxInactive: "beautyNodeBoxInactive"
}

PrettyGameView.prototype.createNode = function (
  clauseIndex, variableNumber, positive){
  var node = document.createElement("div");
  node.classList.add(this.cssClasses.node);
  node.id = "var_" + clauseIndex + ":" + variableNumber;

  if (positive){
    node.classList.add(this.cssClasses.nodeNegated);
    node.classList.add(this.cssClasses.nodeInactive);
  } else {
    node.classList.add(this.cssClasses.nodeNonNegated);
    node.classList.add(this.cssClasses.nodeActive);
  }
  let id = (positive ? 1 : -1) * ((1 * variableNumber) + 1)
  node.innerHTML = id.toString();
  node.onclick = () => {this.clickCallback(variableNumber)};
  return node;
}

PrettyGameView.prototype.createInvisibleNode = function (){
  var node = document.createElement("div");
  node.classList.add(this.cssClasses.node);
  node.classList.add(this.cssClasses.nodeInvisible);
  return node;
}

PrettyGameView.prototype.createBox = function (clause, clauseIndex) {
  var box = document.createElement("div");
  box.className = this.cssClasses.nodeBox;
  box.id = "clause_" + clauseIndex;
  for (var i = 0; i <= this.formular.variableUses.length; ++i){
    if (i in clause){
      let currentVariable = this.createNode(clauseIndex, i, clause[i]);
      box.appendChild(currentVariable);
    } else {
      box.appendChild(this.createInvisibleNode());
    }
  }
  return box;
}

PrettyGameView.prototype.generate = function (){
  let puzzleDiv = document.createElement("div");
  puzzleDiv.id = "puzzleContainer";
  for (var i = 0; i < this.formular.clauses.length; ++i){
    puzzleDiv.appendChild(this.createBox(this.formular.clauses[i], i));
  }
  return puzzleDiv;
}
