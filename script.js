
// =========================
// SEARCH (ONLY HOME PAGE)
// =========================

function searchFable() {

  const input = document.getElementById("searchBox").value.trim().toLowerCase();

  if (input === "1" || input.includes("gallo")) {
    window.location.href = "fable.html?id=1";
  } else {
    alert("Fable not found");
  }
}


// =========================
// ONLY RUN THIS ON FABLE PAGE
// =========================

if (window.location.pathname.includes("fable.html")) {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  let currentFable = null;

  fetch("data/fables.json")
    .then(res => res.json())
    .then(data => {

      currentFable = data.find(f => f.id == id);

      if (!currentFable) {
        document.body.innerHTML = "<h1>Fable not found</h1>";
        return;
      }

      document.getElementById("title").innerText = currentFable.title;
      document.getElementById("commentary").innerText = currentFable.commentary;

      const words = currentFable.latin.split(" ");

      let html = "";

      words.forEach(w => {

        const clean = w.replace(/[^a-zA-Z]/g, "");

        if (currentFable.words[clean]) {
          html += `<span class="word" onclick="showMeaning('${clean}')">${w}</span> `;
        } else {
          html += w + " ";
        }

      });

      document.getElementById("latin").innerHTML = html;

    });
}


// =========================
// CLICKABLE WORDS
// =========================

function showMeaning(word) {
  document.getElementById("popup").innerHTML =
    "<b>" + word + "</b> = " + currentFable.words[word];
}


// =========================
// QUIZ BUTTON
// =========================

function goQuiz() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  window.location.href = "quiz.html?id=" + id;
}
