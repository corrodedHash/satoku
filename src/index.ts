import  PrettyGameView  from 'gamelogic/prettyGameView'
import  CompactGameView  from 'gamelogic/compactGameView'
import GameController from 'gamelogic/gameController'
import GameModel from 'gamelogic/gameModel'
import SatGenerator from 'sat/satGenerator'
import SatFormular from 'sat/satFormular'
function getViewClass() {
  let beautyRadio = <HTMLInputElement> document.getElementById("beauty");
  let compactRadio = <HTMLInputElement> document.getElementById("compact");
  let beautyRadioChecked = (beautyRadio.checked == true);
  let compactRadioChecked = (compactRadio.checked == true);
  let gameViewClass: any;
  if (beautyRadioChecked){
    gameViewClass = PrettyGameView
  } else if (compactRadioChecked){
    gameViewClass = CompactGameView
  } else {
    alert("huh?")
  }
  return gameViewClass;
}

function getFormular() {
  let factoringRadio = <HTMLInputElement> document.getElementById("fact");
  let randomRadio = <HTMLInputElement> document.getElementById("rand");
  let additionRadio = <HTMLInputElement> document.getElementById("add");
  let additionInput1 = <HTMLInputElement> document.getElementById("additionNumber1");
  let additionInput2 = <HTMLInputElement> document.getElementById("additionNumber2");

  let factoringRadioChecked = (factoringRadio.checked == true);
  let randomRadioChecked = (randomRadio.checked == true);
  let additionRadioChecked = (additionRadio.checked == true);
  let additionNumber1 = parseInt(additionInput1.value);
  let additionNumber2 = parseInt(additionInput2.value);

  let formular: SatFormular;

  if (factoringRadioChecked){
    formular = SatGenerator.factoringSat()
  } else if (randomRadioChecked){
    formular = SatGenerator.random3Sat(10, 20)
  } else if (additionRadioChecked){
    formular = SatGenerator.additionSat(
      additionNumber1,
      additionNumber2)
  } else {
    alert("Huh?");
    formular = SatGenerator.random3Sat(10, 20)
  }
  return formular;
}

export function displayQuiz() {
  // Remove all content from puzzleBox
  let myNode = <HTMLElement> document.getElementById("puzzleBox");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  let gameViewClass = getViewClass();
  let formular = getFormular();


  let gameController = new GameController(myNode, gameViewClass, GameModel, formular)
}
