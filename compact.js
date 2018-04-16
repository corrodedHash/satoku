var compactPuzzleGenerator = {
  cssClasses: {
    node: "compactNode",
    nodeNonNegated: "compactNodeNonNegated",
    nodeNegated: "compactNodeNegated",
    nodeActive: "compactNodeActive",
    nodeInactive: "compactNodeInactive",
    nodeInvisible: "compactNodeInvisible",
    nodeBox: "compactNodeBox",
    nodeBoxActive: "compactNodeBoxActive",
    nodeBoxInactive: "compactNodeBoxInactive"
  },

  createNode: function (assignment){
    var node = document.createElement("div");
    node.classList.add(this.cssClasses.node);
    if (assignment < 0){
      node.classList.add(this.cssClasses.nodeNegated);
      node.classList.add(this.cssClasses.nodeInactive);
    } else {
      node.classList.add(this.cssClasses.nodeNonNegated);
      node.classList.add(this.cssClasses.nodeActive);
    }
    node.innerHTML = assignment;
    node.onclick = () => {gameHandler.nodeClicked(assignment);};
    return node;
  },

  createBox: function (clause) {
    var box = document.createElement("div");
    box.className = this.cssClasses.nodeBox;
    for (var i = 0; i < clause.length; ++i){
      let currentVariable = this.createNode(clause[i]);
      gameHandler.appendToClauseVars(clause[i], currentVariable);
      box.appendChild(currentVariable);
    }
    gameHandler.clauses.push(box);
    gameHandler.checkBox(box);
    return box;
  },

  generate: function (satquery){
    gameHandler.activeGenerator = this
    let puzzleDiv = document.createElement("div")
    puzzleDiv.id = "puzzleContainer"
    for (var i = 0; i < satquery.length; ++i){
      puzzleDiv.appendChild(this.createBox(satquery[i]));
    }
    return puzzleDiv
  }

}
