function CompactGameView(formular, clickCallback, parentNode) {
  this.formular = formular
  this.clickCallback = clickCallback
  this.mainNode = this.generate()
  parentNode.appendChild(this.mainNode)
}

CompactGameView.prototype.cssClasses = {
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

CompactGameView.prototype.createNode = function (
  clauseIndex, variableNumber, positive){
  var node = document.createElement("div");
  node.id = "var_" + clauseIndex + ":" + variableNumber;
  node.classList.add(this.cssClasses.node);
  if (positive){
    node.classList.add(this.cssClasses.nodeNegated);
    node.classList.add(this.cssClasses.nodeInactive);
  } else {
    node.classList.add(this.cssClasses.nodeNonNegated);
    node.classList.add(this.cssClasses.nodeActive);
  }
  node.innerHTML = (positive ? 1 : -1) * variableNumber + 1;
  node.onclick = () => {this.clickCallback(variableNumber)};
  return node;
}

CompactGameView.prototype.createBox = function (clause, clauseIndex) {
  var box = document.createElement("div");
  box.className = this.cssClasses.nodeBox;
  box.id = "clause_" + clauseIndex;
  for (let variableNumber in clause){
    let currentVariable = this.createNode(clauseIndex, variableNumber,
      clause[variableNumber]);
    box.appendChild(currentVariable);
  }
  return box;
}

CompactGameView.prototype.generate = function (){
  let puzzleDiv = document.createElement("div");
  puzzleDiv.id = "puzzleContainer";
  for (var i = 0; i < this.formular.clauses.length; ++i){
    puzzleDiv.appendChild(this.createBox(this.formular.clauses[i], i));
  }
  return puzzleDiv;
}

CompactGameView.prototype.setClause = function(clauseIndex, positive){
  let clauseNode = this.mainNode.getElementById("clause_" + clauseIndex);
  if (positive){
    clauseNode.classList.remove(this.cssClasses.nodeBoxInactive)
    clauseNode.classList.add(this.cssClasses.nodeBoxActive)
  } else {
    clauseNode.classList.remove(this.cssClasses.nodeBoxActive)
    clauseNode.classList.add(this.cssClasses.nodeBoxInactive)
  }
}

CompactGameView.prototype.setVariable = function(
  clauseIndex, variableNumber, positive){
  let clauseNode = this.mainNode.getElementById("var_" 
    + clauseIndex + ":" + variableNumber);
  if (positive){
    clauseNode.classList.remove(this.cssClasses.nodeInactive)
    clauseNode.classList.add(this.cssClasses.nodeActive)
  } else {
    clauseNode.classList.remove(this.cssClasses.nodeActive)
    clauseNode.classList.add(this.cssClasses.nodeInactive)
  }

}
