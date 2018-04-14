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

function getRandom(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

// Returns a random non-zero value <= count
function randomAssign(count){
  let result = Math.floor(Math.random() * 2 * count) - count;
  if (result >= 0){
    result += 1;
  }
  return result;
}

function generateModel(size) {
  let result = [];
  for (let i = 0; i < size; ++i){
    result.push(randomAssign(1));
  }
  return result;
}

function generate3Sat(varCount, clauseCount){
  let result = [];
  let model = generateModel(varCount);
  for (let i = 0; i < varCount; ++i){
    let clause = [model[i] * (i + 1), 0, 0];
    for (let j = 1; j < clause.length; ++j){
      clause[j] = randomAssign(varCount);
    }
    clause = shuffle(clause);
    result.push(clause);
  }
  for (let i = varCount; i < clauseCount; ++i){
    let curVar = getRandom(0, varCount - 1)
    let clause = [model[curVar] * (curVar + 1), 0, 0];
    for (let j = 1; j < clause.length; ++j){
      clause[j] = randomAssign(varCount);
    }
    clause = shuffle(clause);
    result.push(clause);
  }
  result = shuffle(result);
  return result;
}

function factoring3Sat(){
  let result = [[2, 3, 4], [6, 7, 8], [-9], [10], [-27, 12, 15], [-27, -12,
    -15], [27, 12, -15], [27, -12, 15], [-12, -15, 28], [12, 15, -28], [12,
      -28], [15, -28], [-13, -16, 30], [-13, -28, 30], [-16, -28, 30], [13, 16,
        -30], [13, 28, -30], [16, 28, -30], [-14, -17, 32], [-14, -30, 32],
    [-17, -30, 32], [14, 17, -32], [14, 30, -32], [17, 30, -32], [-33, 18, 32],
    [-33, -18, -32], [33, 18, -32], [33, -18, 32], [-18, -32, 34], [18, 32,
      -34], [18, -34], [32, -34], [-35, 20, 23], [-35, -20, -23], [35, 20,
        -23], [35, -20, 23], [-20, -23, 36], [20, 23, -36], [20, -36], [23,
          -36], [-21, -24, 38], [-21, -36, 38], [-24, -36, 38], [21, 24, -38],
    [21, 36, -38], [24, 36, -38], [-22, -25, 40], [-22, -38, 40], [-25, -38,
      40], [22, 25, -40], [22, 38, -40], [25, 38, -40], [-41, 26, 40], [-41,
        -26, -40], [41, 26, -40], [41, -26, 40], [-26, -40, 42], [26, 40, -42],
    [26, -42], [40, -42], [-43, 29, 19], [-43, -29, -19], [43, 29, -19], [43,
      -29, 19], [-29, -19, 44], [29, 19, -44], [29, -44], [19, -44], [-31, -35,
        46], [-31, -44, 46], [-35, -44, 46], [31, 35, -46], [31, 44, -46], [35,
          44, -46], [-33, -37, 48], [-33, -46, 48], [-37, -46, 48], [33, 37,
            -48], [33, 46, -48], [37, 46, -48], [-34, -39, 50], [-34, -48, 50],
    [-39, -48, 50], [34, 39, -50], [34, 48, -50], [39, 48, -50], [-51, 41, 50],
    [-51, -41, -50], [51, 41, -50], [51, -41, 50], [-41, -50, 52], [41, 50,
      -52], [41, -52], [50, -52], [-53, 42, 52], [-53, -42, -52], [53, 42,
        -52], [53, -42, 52], [-42, -52, 54], [42, 52, -54], [42, -54], [52,
          -54], [11, -1, -5], [-11, 1], [-11, 5], [12, -2, -5], [-12, 2], [-12,
            5], [13, -3, -5], [-13, 3], [-13, 5], [14, -4, -5], [-14, 4], [-14,
              5], [15, -1, -6], [-15, 1], [-15, 6], [16, -2, -6], [-16, 2],
    [-16, 6], [17, -3, -6], [-17, 3], [-17, 6], [18, -4, -6], [-18, 4], [-18,
      6], [19, -1, -7], [-19, 1], [-19, 7], [20, -2, -7], [-20, 2], [-20, 7],
    [21, -3, -7], [-21, 3], [-21, 7], [22, -4, -7], [-22, 4], [-22, 7], [23,
      -1, -8], [-23, 1], [-23, 8], [24, -2, -8], [-24, 2], [-24, 8], [25, -3,
        -8], [-25, 3], [-25, 8], [26, -4, -8], [-26, 4], [-26, 8], [11, -9],
    [-11, 9], [27, -10], [-27, 10], [43, -9], [-43, 9], [45, -10], [-45, 10],
    [47, -9], [-47, 9], [49, -9], [-49, 9], [51, -9], [-51, 9], [53, -9], [-53,
      9], [54, -9], [-54, 9], [16, 28, 55], [-29, 13, -55], [-16, 28, 56],
    [-29, -13, -56], [16, -28, 57], [-29, -13, -57], [-16, -28, 58], [-29, 13,
      -58], [-16, -28, 59], [29, -13, -59], [16, -28, 60], [29, 13, -60], [-16,
        28, 61], [29, 13, -61], [16, 28, 62], [29, -13, -62], [17, 30, 63],
    [-31, 14, -63], [-17, 30, 64], [-31, -14, -64], [17, -30, 65], [-31, -14,
      -65], [-17, -30, 66], [-31, 14, -66], [-17, -30, 67], [31, -14, -67],
    [17, -30, 68], [31, 14, -68], [-17, 30, 69], [31, 14, -69], [17, 30, 70],
    [31, -14, -70], [24, 36, 71], [-37, 21, -71], [-24, 36, 72], [-37, -21,
      -72], [24, -36, 73], [-37, -21, -73], [-24, -36, 74], [-37, 21, -74],
    [-24, -36, 75], [37, -21, -75], [24, -36, 76], [37, 21, -76], [-24, 36,
      77], [37, 21, -77], [24, 36, 78], [37, -21, -78], [25, 38, 79], [-39, 22,
        -79], [-25, 38, 80], [-39, -22, -80], [25, -38, 81], [-39, -22, -81],
    [-25, -38, 82], [-39, 22, -82], [-25, -38, 83], [39, -22, -83], [25, -38,
      84], [39, 22, -84], [-25, 38, 85], [39, 22, -85], [25, 38, 86], [39, -22,
        -86], [35, 44, 87], [-45, 31, -87], [-35, 44, 88], [-45, -31, -88],
    [35, -44, 89], [-45, -31, -89], [-35, -44, 90], [-45, 31, -90], [-35, -44,
      91], [45, -31, -91], [35, -44, 92], [45, 31, -92], [-35, 44, 93], [45,
        31, -93], [35, 44, 94], [45, -31, -94], [37, 46, 95], [-47, 33, -95],
    [-37, 46, 96], [-47, -33, -96], [37, -46, 97], [-47, -33, -97], [-37, -46,
      98], [-47, 33, -98], [-37, -46, 99], [47, -33, -99], [37, -46, 100], [47,
        33, -100], [-37, 46, 101], [47, 33, -101], [37, 46, 102], [47, -33,
          -102], [39, 48, 103], [-49, 34, -103], [-39, 48, 104], [-49, -34,
            -104], [39, -48, 105], [-49, -34, -105], [-39, -48, 106], [-49, 34,
              -106], [-39, -48, 107], [49, -34, -107], [39, -48, 108], [49, 34,
                -108], [-39, 48, 109], [49, 34, -109], [39, 48, 110], [49, -34,
                  -110]]
  result.forEach((currentValue) => {shuffle(currentValue);});
  shuffle(result);
  return result;
}

function additionSat(numA, numB){
  let numALen = Math.floor(Math.log2(numA)) + 1
  let numBLen = Math.floor(Math.log2(numB)) + 1
  let resultLen = Math.max(numALen, numBLen) + 1
  let numAIdStart = 1 + resultLen
  let numBIdStart = numAIdStart + Math.max(numALen, numBLen)
  let carryIdStart = numBIdStart + Math.max(numALen, numBLen)
  let result = []

  console.log(numAIdStart)
  console.log(numBIdStart)
  console.log(carryIdStart)

  function carryClause(carryId, oldCarryId, inputAId, inputBId){
    let result = []
    result.push([-inputAId, -oldCarryId, carryId])
    result.push([-inputBId, -oldCarryId, carryId])
    result.push([inputAId, oldCarryId, -carryId])
    result.push([inputBId, oldCarryId, -carryId])
    result.push([inputAId, inputBId, -carryId])
    result.push([-inputAId, -inputBId, carryId])
    return result
  }

  function resultClause(resultId, carryId, inputAId, inputBId){
    let result = []
    result.push([inputAId, inputBId, resultId, -carryId])
    result.push([inputAId, inputBId, -resultId, carryId])
    result.push([-inputAId, -inputBId, resultId, -carryId])
    result.push([-inputAId, -inputBId, -resultId, carryId])
    result.push([inputAId, -inputBId, resultId, carryId])
    result.push([inputAId, -inputBId, -resultId, -carryId])
    result.push([-inputAId, inputBId, resultId, carryId])
    result.push([-inputAId, inputBId, -resultId, -carryId])
    return result
  }

  for (let i = 0; i < resultLen - 1; ++i){
    result.push(...resultClause(1 + i, carryIdStart + i + 1, numAIdStart + i, numBIdStart + i))
    result.push(...carryClause(carryIdStart + i + 1, carryIdStart + i, numAIdStart + i, numBIdStart + i))
  }
  result.push([-carryIdStart])
  result.push([-(carryIdStart + resultLen - 1), resultLen])
  result.push([carryIdStart + resultLen - 1, -resultLen])

  let binNumA = numA.toString(2).padStart(Math.max(numALen, numBLen), '0')
  let binNumB = numB.toString(2).padStart(Math.max(numALen, numBLen), '0')

  console.log(binNumA)
  console.log(binNumB)
  for (let i = Math.max(numALen, numBLen) - 1; i >= 0 ; --i){
    if (binNumA[i] === '1'){
      result.push([numAIdStart + Math.max(numALen, numBLen) - i - 1])
    } else if (binNumA[i] ==='0'){
      result.push([-(numAIdStart + Math.max(numALen, numBLen) - i - 1)])
    } else {
      console.log("Unknown char in " + binNumA)
    }
    if (binNumB[i] === '1'){
      result.push([numBIdStart + Math.max(numALen, numBLen) - i - 1])
    } else if (binNumB[i] ==='0'){
      result.push([-(numBIdStart + Math.max(numALen, numBLen) - i - 1)])
    } else {
      console.log("Unknown char in " + binNumB)
    }
  }
  return result
}

function satToDimacs(clauses) {
  let maxVar = 0;
  let resultString = ""
  clauses.forEach((currentClause) => {
    currentClause.forEach((currentValue) => {
      resultString += currentValue.toString() + " "
      if (Math.abs(currentValue) > maxVar){
        maxVar = Math.abs(currentValue)
      }
    })
    resultString += "0\n"
  })
  resultString = "p cnf " + maxVar.toString() + " " + clauses.length.toString() + "\n" + resultString
  return resultString
}
