// Fisher-Yates shuffle
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// Returns a random non-zero value <= count
function randomAssign(count){
  var result = Math.floor(Math.random() * 2 * count) - count;
  if (result >= 0){
    result += 1;
  }
  return result;
}

function assignmentToIndex(assignment){
  if (assignment < 0){
    return (assignment + 1) * -2;
  } else {
    return (assignment * 2) - 1;
  }
}

function generateModel(size) {
  var result = [];
  for (var i = 0; i < size; ++i){
    result.push(randomAssign(1));
  }
  return result;
}

function generate3Sat(model){
  var result = [];
  for (var i = 0; i < model.length; ++i){
    clause = [model[i] * (i + 1), 0, 0];
    for (var j = 1; j < clause.length; ++j){
      clause[j] = randomAssign(model.length);
    }
    clause = shuffle(clause);
    result.push(clause);
  }
  result = shuffle(result);
  return result;
}

var clauseVars = []
var clauses = []

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
  var modelSize = 10;
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
  var boxActive = false;
  var boxElements = box.getElementsByTagName("div");
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
