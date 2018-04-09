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
  let result = Math.floor(Math.random() * 2 * count) - count;
  if (result >= 0){
    result += 1;
  }
  return result;
}

export function generateModel(size) {
  let result = [];
  for (let i = 0; i < size; ++i){
    result.push(randomAssign(1));
  }
  return result;
}

export function generate3Sat(model){
  let result = [];
  for (var i = 0; i < model.length; ++i){
    let clause = [model[i] * (i + 1), 0, 0];
    for (var j = 1; j < clause.length; ++j){
      clause[j] = randomAssign(model.length);
    }
    clause = shuffle(clause);
    result.push(clause);
  }
  result = shuffle(result);
  return result;
}
