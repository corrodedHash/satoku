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
  box.className = "nodeBox";
  function createNode(assignment){
    var node = document.createElement("div");
    node.classList.add("node");
    if (assignment < 0){
      node.classList.add("nodeNonNegated");
      node.classList.add("nodeActive");
    } else {
      node.classList.add("nodeNegated");
      node.classList.add("nodeInactive");
    }
    node.innerHTML = assignment;
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
  currentValue.classList.toggle("nodeActive");
  currentValue.classList.toggle("nodeInactive");
}

function checkBox(box){
  let boxActive = false;
  let boxElements = box.getElementsByTagName("div");
  for (var key in [...boxElements]){
    if (boxElements[key].classList.contains("nodeActive")){
      boxActive = true;
      break;
    }
  }
  if (boxActive == true){
    box.classList.toggle("nodeBoxInactive", false);
    box.classList.toggle("nodeBoxActive", true);
  } else {
    box.classList.toggle("nodeBoxActive", false);
    box.classList.toggle("nodeBoxInactive", true);
  }
}

function nodeClicked(assignment) {
  clauseVars[assignmentToIndex(assignment)].forEach(flipNode);
  clauseVars[assignmentToIndex(-1 * assignment)].forEach(flipNode);
  clauses.forEach(checkBox);
}

displayQuiz();
