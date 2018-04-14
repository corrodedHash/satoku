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
    node.classList.add("nodeNegated");
    node.classList.add("nodeInactive");
  } else {
    node.classList.add("nodeNonNegated");
    node.classList.add("nodeActive");
  }
  node.innerHTML = assignment;
  node.onclick = () => {nodeClicked(assignment);};
  return node;
}

function appendToClauseVars(index, value){

  if (typeof(clauseVars[index]) === "undefined"){
    clauseVars[index] = [value];
  } else {
    clauseVars[index].push(value);
  }
}

function createBox(clause) {
  var box = document.createElement("div");
  box.className = "nodeBox";
  for (var i = 0; i < clause.length; ++i){
    let currentVariable = createNode(clause[i]);
    appendToClauseVars(assignmentToIndex(i), currentVariable);
    box.appendChild(currentVariable);
  }
  clauses.push(box);
  return box;
}

function displayQuiz(){
  //let satquery = factoring3Sat();//generate3Sat(modelSize, 20);
  //let satquery = generate3Sat(modelSize, 40);
  let satquery = additionSat(4, 5);
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
