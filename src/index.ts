import CompactGameView from "gamelogic/compactGameView";
import GameController from "gamelogic/gameController";
import GameModel from "gamelogic/gameModel";
import PrettyGameView from "gamelogic/prettyGameView";
import SatFormular from "sat/satFormular";
import SatGenerator from "sat/satGenerator";

function getViewClass() {
  const beautyRadio = document.getElementById("beauty") as HTMLInputElement;
  const compactRadio = document.getElementById("compact") as HTMLInputElement;
  const beautyRadioChecked = (beautyRadio.checked === true);
  const compactRadioChecked = (compactRadio.checked === true);
  let gameViewClass: any;
  if (beautyRadioChecked) {
    gameViewClass = PrettyGameView;
  } else if (compactRadioChecked) {
    gameViewClass = CompactGameView;
  } else {
    alert("huh?");
  }
  return gameViewClass;
}

function getFormular() {
  const factoringRadio = document.getElementById("fact") as HTMLInputElement;
  const randomRadio = document.getElementById("rand") as HTMLInputElement;
  const additionRadio = document.getElementById("add") as HTMLInputElement;
  const additionInput1 =
      document.getElementById("additionNumber1") as HTMLInputElement;
  const additionInput2 =
      document.getElementById("additionNumber2") as HTMLInputElement;

  const factoringRadioChecked = (factoringRadio.checked === true);
  const randomRadioChecked = (randomRadio.checked === true);
  const additionRadioChecked = (additionRadio.checked === true);
  const additionNumber1 = parseInt(additionInput1.value, 10);
  const additionNumber2 = parseInt(additionInput2.value, 10);

  let formular: SatFormular;

  if (factoringRadioChecked) {
    formular = SatGenerator.factoringSat();
  } else if (randomRadioChecked) {
    formular = SatGenerator.random3Sat(10, 20);
  } else if (additionRadioChecked) {
    formular = SatGenerator.additionSat(additionNumber1, additionNumber2);
  } else {
    alert("Huh?");
    formular = SatGenerator.random3Sat(10, 20);
  }
  return formular;
}

export function displayQuiz() {
  // Remove all content from puzzleBox
  const myNode = document.getElementById("puzzleBox") as HTMLElement;
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  const gameViewClass = getViewClass();
  const formular = getFormular();

  const gameController =
      new GameController(myNode, gameViewClass, GameModel, formular);
}
