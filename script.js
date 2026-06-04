const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentFable = null;

fetch("data/fables.json")
  .then(res => res.json())
  .then(data => {

    currentFable = data.find(f => f.id == id);

    document.getElementById("title").innerText = currentFable.title;
    document.getElementById("commentary").innerText = currentFable.commentary;

    // 🧠 build clickable Latin text
    const words = currentFable.latin.split(" ");

    let html = "";

    words.forEach(w => {
      const clean = w.replace(/[^a-zA-Z]/g, ""); // remove punctuation

      if (currentFable.words[clean]) {
        html += `<span class="word" onclick="showMeaning('${clean}')">${w}</span> `;
      } else {
        html += w + " ";
      }
    });

    document.getElementById("latin").innerHTML = html;
  });

// 🧠 when word is clicked
function showMeaning(word) {
  const meaning = currentFable.words[word];
  document.getElementById("popup").innerHTML =
    `<b>${word}</b> = ${meaning}`;
}

// 📖 get id
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// =========================
// 📚 QUIZ SYSTEM
// =========================

if (window.location.pathname.includes("quiz")) {

  let quizData = null;

  fetch("data/quizzes.json")
    .then(res => res.json())
    .then(data => {

      quizData = data.find(q => q.id == id);

      const box = document.getElementById("quizBox");

      let html = "";

      quizData.questions.forEach((q, i) => {
        html += `
          <div>
            <b>${q.word}</b><br>
            <input id="q${i}" placeholder="meaning">
            <span id="r${i}"></span>
          </div>
          <br>
        `;
      });

      box.innerHTML = html;
    });

  // 🧠 check answers
  window.checkAnswers = function () {

    let score = 0;

    quizData.questions.forEach((q, i) => {

      const input = document.getElementById("q" + i).value.trim().toLowerCase();
      const resultBox = document.getElementById("r" + i);

      if (input === q.answer.toLowerCase()) {
        resultBox.innerHTML = "✔";
        resultBox.style.color = "green";
        score++;
      } else {
        resultBox.innerHTML = "✘ " + q.answer;
        resultBox.style.color = "red";
      }

    });

    document.getElementById("score").innerText =
      "Score: " + score + "/" + quizData.questions.length;
  };
}
