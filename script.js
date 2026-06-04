function showGloss(word) {
  const box = document.getElementById("glossBox");

  let text = "";

  if (word === "gallus") {
    text = "gallus = foolish man / cock";
  }

  if (word === "iaspis") {
    text = "iaspis = wisdom / precious stone";
  }

  box.innerHTML = text;
  box.style.display = "block";
}

function showNote() {
  const note = document.getElementById("noteBox");
  note.style.display = "block";
}