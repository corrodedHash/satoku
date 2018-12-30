/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("puzzleSelector").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("puzzleSelector").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function displayQuiz() {
  // Remove all content from puzzleBox
  let myNode = document.getElementById("puzzleBox");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

  let beautyRadioChecked = document.getElementById("beauty").checked == true;
  let compactRadioChecked = document.getElementById("compact").checked == true;
  let gameViewClass = []
  if (beautyRadioChecked){
    gameViewClass = PrettyGameView
  } else if (compactRadioChecked){
    gameViewClass = CompactGameView
  } else {
    alert("huh?")
  }

  let factoringRadioChecked = document.getElementById("fact").checked == true;
  let randomRadioChecked = document.getElementById("rand").checked == true;
  let additionRadioChecked = document.getElementById("add").checked == true;

  let formular: SatFormular;

  if (factoringRadioChecked){
    formular = SatGenerator.factoringSat()
  } else if (randomRadioChecked){
    formular = SatGenerator.random3Sat(10, 20)
  } else if (additionRadioChecked){
    formular = SatGenerator.additionSat(
      document.getElementById("additionNumber1").value,
      document.getElementById("additionNumber2").value)
  } else {
    alert("huh?")
  }

  let gameController = new GameController(myNode, gameViewClass, GameModel, formular)
}

function toggleInvisDiv(activatedRadio){
  let radios = document.getElementsByName(activatedRadio.name);
  for (let i = 0; i < radios.length; ++i){
    let radioToggleDiv = document.getElementById(radios[i].id + "Inputs");
    if (radios[i].checked){
      if (radioToggleDiv !== null){
        let style = window.getComputedStyle(radioToggleDiv);
        radioToggleDiv.style.height = style.getPropertyValue('max-height');
      }
    } else {
      if (radioToggleDiv !== null){
        radioToggleDiv.style.height = 0;
      }
    }
  }
}
