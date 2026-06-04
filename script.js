// =========================
// COMMON VARIABLES
// =========================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentFable = null;


// =========================
// SEARCH FUNCTION (INDEX)
// =========================

function searchFable() {

  const searchBox = document.getElementById("searchBox");

  if (!searchBox) return;

  const input = searchBox.value.trim().toLowerCase();

  fetch("data/fables.json")
    .then(res => res.json())
    .then(fables => {

      const found = fables.find(f =>
        f.id.toString() === input ||
        f.title.toLowerCase().includes(input)
      );

      if (found) {
        window.location.href = "fable.html?id=" + found.id;
      } else {
        alert("Fable not found.");
      }

    });

}


// =========================
// FABLE PAGE
// =========================

if (window.location.pathname.includes("fable")) {

  fetch("data/fables.json")
    .then(res => res.json())
    .then(data => {

      currentFable = data.find(f => f.id == id);

      if (!currentFable) {
        document.body.innerHTML = "<h1>Fable not found</h1>";
        return;
      }

      document.getElementById("title").innerText =
        currentFable.title;

      document.getElementById("commentary").innerText =
        currentFable.commentary;

      const words = currentFable.latin.split(" ");

      let html = "";

      words.forEach(w => {

        const clean =
          w.replace(/[^a-zA-Z]/g, "");

        if (currentFable.words[clean]) {

          html += `
            <span
              class="word"
              onclick="showMeaning('${clean}')">
              ${w}
            </span>
          `;

        } else {

          html += w + " ";

        }

      });

      document.getElementById("latin").innerHTML = html;

    });

}


// =========================
// CLICKABLE VOCAB
// =========================

function showMeaning(word) {

  const meaning = currentFable.words[word];

  document.getElementById("popup").innerHTML =
    `<b>${word}</b> = ${meaning}`;

}


// =========================
// QUIZ PAGE
// =========================

if (window.location.pathname.includes("quiz")) {

  let quizData = null;

  fetch("data/quizzes.json")
    .then(res => res.json())
    .then(data => {

      quizData = data.find(q => q.id == id);

      if (!quizData) {
        document.body.innerHTML = "<h1>Quiz not found</h1>";
        return;
      }

      document.getElementById("title").innerText =
        "Quiz: Fable " + id;

      const box =
        document.getElementById("quizBox");

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

      window.checkAnswers = function () {

        let score = 0;

        quizData.questions.forEach((q, i) => {

          const input =
            document.getElementById("q" + i)
              .value
              .trim()
              .toLowerCase();

          const resultBox =
            document.getElementById("r" + i);

          if (input === q.answer.toLowerCase()) {

            resultBox.innerHTML = "✔";
            resultBox.style.color = "green";

            score++;

          } else {

            resultBox.innerHTML =
              "✘ " + q.answer;

            resultBox.style.color = "red";

          }

        });

        document.getElementById("score").innerText =
          "Score: " +
          score +
          "/" +
          quizData.questions.length;

      };

    });

}


// =========================
// QUIZ BUTTON FROM FABLE
// =========================

function goQuiz() {

  window.location.href =
    "quiz.html?id=" + id;

}
