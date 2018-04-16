var beautyPuzzleGenerator = {
  cssClasses: {
    node: "beautyNode",
    nodeNonNegated: "beautyNodeNonNegated",
    nodeNegated: "beautyNodeNegated",
    nodeActive: "beautyNodeActive",
    nodeInactive: "beautyNodeInactive",
    nodeInvisible: "beautyNodeInvisible",
    nodeBox: "beautyNodeBox",
    nodeBoxActive: "beautyNodeBoxActive",
    nodeBoxInactive: "beautyNodeBoxInactive"
  },

  createNode: function (assignment){
    var node = document.createElement("div");
    node.classList.add(this.cssClasses.node);
    if (assignment < 0){
      node.classList.add(this.cssClasses.nodeNonNegated);
      node.classList.add(this.cssClasses.nodeActive);
    } else {
      node.classList.add(this.cssClasses.nodeNegated);
      node.classList.add(this.cssClasses.nodeInactive);
    }
    node.onclick = () => {gameHandler.nodeClicked(assignment);};
    return node;
  },

  createInvisibleNode: function (){
    var node = document.createElement("div");
    node.classList.add(this.cssClasses.node);
    node.classList.add(this.cssClasses.nodeInvisible);
    return node;
  },

  createBox: function (clause, varCount) {
    var box = document.createElement("div");
    box.className = this.cssClasses.nodeBox;
    for (var i = 1; i <= varCount; ++i){
      if (clause.indexOf(i) >= 0){
        let currentVariable = this.createNode(i);
        gameHandler.appendToClauseVars(i, currentVariable)
        box.appendChild(currentVariable);
      } else if(clause.indexOf(-1 * i) >=0){
        let currentVariable = this.createNode(-i);
        gameHandler.appendToClauseVars(-i, currentVariable)
        box.appendChild(currentVariable);
      } else {
        box.appendChild(this.createInvisibleNode());
      }
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
      puzzleDiv.appendChild(this.createBox(satquery[i], getVarCount(satquery)));
    }
    return puzzleDiv
  }
}
