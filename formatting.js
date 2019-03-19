function toggleInvisDiv(activatedRadio) {
  let radios = document.getElementsByName(activatedRadio.name);
  for (let i = 0; i < radios.length; ++i) {
    let radioToggleDiv = document.getElementById(radios[i].id + "Inputs");
    if (radios[i].checked) {
      if (radioToggleDiv !== null) {
        let style = window.getComputedStyle(radioToggleDiv);
        radioToggleDiv.style.height = style.getPropertyValue("max-height");
      }
    } else {
      if (radioToggleDiv !== null) {
        radioToggleDiv.style.height = 0;
      }
    }
  }
}

/* Set the width of the side navigation to 250px and the left margin of the page
 * content to 250px */
function openNav() {
  document.getElementById("puzzleSelector").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page
 * content to 0 */
function closeNav() {
  document.getElementById("puzzleSelector").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
