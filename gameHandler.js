var gameHandler = {
  activeGenerator: null,
  clauseVars : [],
  clauses : [],

  appendToClauseVars:function (index, value){
    index = this.assignmentToIndex(index)
    if (typeof(this.clauseVars[index]) === "undefined"){
      this.clauseVars[index] = [value];
    } else {
      this.clauseVars[index].push(value);
    }
  },

  assignmentToIndex:function (assignment){
    if (assignment < 0){
      return (assignment + 1) * -2;
    } else {
      return (assignment * 2) - 1;
    }
  },

  flipNode: function (currentValue) {
    currentValue.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeActive);
    currentValue.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeInactive);
  },

  checkBox: function (box){
    let boxActive = false;
    let boxElements = box.getElementsByTagName("div");
    for (let key in [...boxElements]){
      if (boxElements[key].classList.contains(gameHandler.activeGenerator.cssClasses.nodeActive)){
        boxActive = true;
        break;
      }
    }
    if (boxActive == true){
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxInactive, false);
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxActive, true);
    } else {
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxInactive, true);
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxActive, false);
    }
  },

  nodeClicked: function (assignment) {
    this.clauseVars[this.assignmentToIndex(assignment)].forEach(this.flipNode);
    this.clauseVars[this.assignmentToIndex(-1 * assignment)].forEach(this.flipNode);
    this.clauses.forEach(this.checkBox);
  }
}
