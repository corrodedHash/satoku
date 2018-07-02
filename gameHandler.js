/* exported gameHandler */

var gameHandler = {
  activeGenerator: null,
  clauseVars : [],
  clauses : [],

  appendToClauseVars:function (index, value){
    index = gameHandler.assignmentToIndex(index);
    if (typeof(gameHandler.clauseVars[index]) === "undefined"){
      gameHandler.clauseVars[index] = [value];
    } else {
      gameHandler.clauseVars[index].push(value);
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
    if (boxActive === true){
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxInactive, false);
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxActive, true);
    } else {
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxInactive, true);
      box.classList.toggle(gameHandler.activeGenerator.cssClasses.nodeBoxActive, false);
    }
  },

  nodeClicked: function (assignment) {
    gameHandler.clauseVars[gameHandler.assignmentToIndex(assignment)].forEach(gameHandler.flipNode);
    gameHandler.clauseVars[gameHandler.assignmentToIndex(-1 * assignment)].forEach(gameHandler.flipNode);
    gameHandler.clauses.forEach(gameHandler.checkBox);
  }
};
