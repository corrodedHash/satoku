function randomAssign(count){
  var result = Math.floor(Math.random() * 2 * count) - count;
    if (result >= 0){
      result += 1;
    }
    return result;
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
    clause = [model[i], 0, 0];
    for (var j = 1; j < clause.length; ++j){
      clause[j] = randomAssign(model.length); 
    }
    result.push(clause);
  }
  return result;
}

function createBox(clause) {
  var box = document.createElement("div");
  box.className = "nodeBox";
  document.body.appendChild(box);
  function createNode(assignment){
    var node = document.createElement("div");
    node.className = "node";
    node.innerHTML = assignment;
    box.appendChild(node);
  }
  for (var i = 0; i < clause.length; ++i){
    createNode(clause[i]);
  }
}

function displayQuiz(model, satquery){
  model = generateModel(10)
  satquery = generate3Sat(model)
  console.log(satquery.length);
  console.log(model.length);
  for (var i = 0; i < satquery.length; ++i){
    createBox(satquery[i]);
  }
}


function nodeClicked() {

}

displayQuiz();
