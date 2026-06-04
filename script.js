// 📖 get fable id from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 📦 load all fables
fetch("data/fables.json")
  .then(res => res.json())
  .then(data => {

    // 🔍 find correct fable
    const fable = data.find(f => f.id == id);

    // 🧠 put data into page
    document.getElementById("title").innerText = fable.title;
    document.getElementById("latin").innerText = fable.latin;
    document.getElementById("commentary").innerText = fable.commentary;

    // 📚 build glossary
    let glossHTML = "";

    for (let word in fable.words) {
      glossHTML += `
        <p><b>${word}</b> = ${fable.words[word]}</p>
      `;
    }

    document.getElementById("gloss").innerHTML = glossHTML;
  });

// 🔘 quiz button
function goQuiz() {
  window.location.href = "quiz.html?id=" + id;
}
