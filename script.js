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
