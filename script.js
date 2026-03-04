import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA5dYM02tcTl7uDvX1WgyWqpihCWvfeIHs",
      authDomain: "hide-and-seek-d8104.firebaseapp.com",
      databaseURL: "https://hide-and-seek-d8104-default-rtdb.firebaseio.com",
      projectId: "hide-and-seek-d8104",
      storageBucket: "hide-and-seek-d8104.firebasestorage.app",
      messagingSenderId: "967191587097",
      appId: "1:967191587097:web:19765825deb306ab2dbd88"
    
};

const ACCESS_CODE = "HideAndSeekMiddelsfähr_26419";
const LS_KEY = "hs_participants_v1";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const statusEl = document.getElementById("status");
const log = (msg) => statusEl.textContent = "Status: " + msg;

const codeBox = document.getElementById("codeBox");
const formBox = document.getElementById("formBox");

document.getElementById("btnCheck").addEventListener("click", () => {
  const code = document.getElementById("accessCode").value;
  if (code === ACCESS_CODE) {
    codeBox.style.display = "none";
    formBox.classList.remove("hidden");
    log("Code korrekt.");
  } else {
    alert("Falscher Code!");
  }
});

document.getElementById("btnRegister").addEventListener("click", async () => {

  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const age = document.getElementById("age").value.trim();
  const className = document.getElementById("classInput").value.trim();

  if (!firstname || !lastname || !age || !className) {
    alert("Bitte alle Felder ausfüllen!");
    return;
  }

  const items = Array.from(document.querySelectorAll(".itemBox:checked")).map(cb => cb.value);

  const payload = { firstname, lastname, age, class: className, items };

  await push(ref(database, "participants"), payload);

  alert("Erfolgreich angemeldet!");
});

onValue(ref(database, "participants"), (snapshot) => {
  const membersDiv = document.getElementById("members");
  const countEl = document.getElementById("count");

  membersDiv.innerHTML = "";
  let count = 0;

  snapshot.forEach((child) => {
    const data = child.val();
    count++;

    const div = document.createElement("div");
    div.className = "member";
    div.innerText = `${data.firstname} ${data.lastname} | Klasse: ${data.class}`;
    membersDiv.appendChild(div);
  });

  countEl.innerText = count;
});
