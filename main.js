import {generateModel, generate3Sat} from "./3sat.js";

var clauseVars = []
var clauses = []

function assignmentToIndex(assignment){
  if (assignment < 0){
    return (assignment + 1) * -2;
  } else {
    return (assignment * 2) - 1;
  }
}

function createBox(clause) {
  var box = document.createElement("div");
  box.className = "nodeBoxInactive";
  function createNode(assignment){
    var node = document.createElement("div");
    if (assignment < 0){
      node.className = "nodeInactive";
    } else {
      node.className = "nodeActive";
    }
    node.innerHTML = assignment;
    node.style.cursor = 'pointer';
    node.onclick = () => {nodeClicked(assignment);};
    clauseVars[assignmentToIndex(assignment)].push(node);
    return node;
  }
  for (var i = 0; i < clause.length; ++i){
    box.appendChild(createNode(clause[i]));
  }
  clauses.push(box);
  return box;
}

function displayQuiz(model, satquery){
  let modelSize = 10;
  let result = []
  clauseVars = Array.apply(null, Array(modelSize * 2)).map(function () { return []; });
  model = generateModel(modelSize);
  satquery = generate3Sat(model);
  for (var i = 0; i < satquery.length; ++i){
    document.body.appendChild(createBox(satquery[i]));
  }
  clauses.forEach(checkBox);
}

function flipNode(currentValue) {
  if (currentValue.className == "nodeInactive"){
    currentValue.className = "nodeActive";
  } else {
    currentValue.className = "nodeInactive";
  }
}

function checkBox(box){
  let boxActive = false;
  let boxElements = box.getElementsByTagName("div");
  for (var key in boxElements){
    if (boxElements[key].className == "nodeActive"){
      boxActive = true;
      break;
    }
  }
  if (boxActive == true){
    box.className = "nodeBoxActive";
  } else {
    box.className = "nodeBoxInactive";
  }
}

function nodeClicked(assignment) {
  clauseVars[assignmentToIndex(assignment)].forEach(flipNode);
  clauseVars[assignmentToIndex(-1 * assignment)].forEach(flipNode);
  clauses.forEach(checkBox);
}

displayQuiz();
