const hiddenMessage ="TU VEUX TE PARDONNER ? ALORS VA A L'EGLISE !";
const crosswordLetters = document.querySelectorAll(".letter");

const filledLetters = [0, 1, 2, 13, 14, 17, 25, 27, 34];
let errorCount = 0;
const maxErrors = 5;

function checkLetterValidity(inputLetter, index) {
  if (filledLetters.includes(index)) {
    return true;
  }

  let hiddenLetters = 0;
  for (let i = 0; i < hiddenMessage.length; i++) {
    if (hiddenMessage[i] !== " ") {
      if (hiddenLetters === index) {
        const correctLetter = hiddenMessage[i];
        return inputLetter === correctLetter;
      }
      hiddenLetters++;
    }
  }

}

crosswordLetters.forEach((letter) => {
  letter.addEventListener("input", handleLetterInput);
  letter.addEventListener("focus", clearLetter);
});

function handleLetterInput(event) {
  if (event.data && event.data >= "a" && event.data <= "z") {
    event.target.textContent = event.data.toUpperCase();
  }

  const inputLetter = event.target.textContent.trim();
  const letterIndex = parseInt(event.target.dataset.index);

  const isValid = checkLetterValidity(inputLetter, letterIndex);

  event.target.style.backgroundColor = isValid ? "green" : "red";

  if (isValid) {
    event.target.contentEditable = "false";
  } else {
    errorCount++;
    if (errorCount >= maxErrors) {
      document.getElementById("help").style.display = "block";
    }
  }

  if (isValid) {
    let nextIndex = letterIndex + 1;
    let nextLetter = document.querySelector(
      `.letter[data-index="${nextIndex}"]`
    );
    while (nextLetter && nextLetter.textContent.trim() !== "") {
        nextIndex++;
        nextLetter = document.querySelector(`.letter[data-index="${nextIndex}"]`)
    }
    if (nextLetter) {
      nextLetter.focus();
    }
  }

  if (allLettersFilled()) {
    console.log("Mon nom est John Peaks");
    const backgroundMusic = document.getElementById("noir");
    backgroundMusic.pause();

    setTimeout(() => {
        const knockDoor = document.getElementById("door");
        knockDoor.volume = 1.0;
        knockDoor.play();
    }, 3000);
  }
}

function allLettersFilled() {
    return Array.from(crosswordLetters).every((letter) => letter.textContent.trim() !== "");
}

function clearLetter(event) {
    event.target.textContent = "";
}

window.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = document.getElementById("noir");
    backgroundMusic.play();
})
