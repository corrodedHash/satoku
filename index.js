import {factoring3Sat, generate3Sat} from "./3sat.js";

var clauseVars = []
var clauses = []

function assignmentToIndex(assignment){
  if (assignment < 0){
    return (assignment + 1) * -2;
  } else {
    return (assignment * 2) - 1;
  }
}

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
  return node;
}

function createBox(clause) {
  var box = document.createElement("div");
  box.className = "nodeBox";
  for (var i = 0; i < clause.length; ++i){
    let currentClause = createNode(clause[i]);
    clauseVars[assignmentToIndex(clause[i])].push(currentClause);
    box.appendChild(createNode(clause[i]));
  }
  clauses.push(box);
  return box;
}

export function displayQuiz(){
  let modelSize = 110;
  let result = []
  clauseVars = Array.apply(null, Array(modelSize * 2)).map(function () { return []; });
  let satquery = factoring3Sat();//generate3Sat(modelSize, 20);
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
  for (let key in [...boxElements]){
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
