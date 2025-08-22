const optionA = document.querySelector(".option-A");
const optionB = document.querySelector(".option-B");
const result  = document.querySelector("#result");
const photoA  = document.querySelector("#photoA");
const photoB  = document.querySelector("#photoB");
const barA    = document.getElementById("barA");
const barB    = document.getElementById("barB");

let currentindex = 0;
let votesA = 0;
let votesB = 0;
let photos = [];

// 🔑 Yahan apni Pexels API key daalna
const API_KEY = "oqXb1Ix4MfNlrwOLevIKePAm2FRDLWjMXOY37PlRLpLpqIi4BtXhYnFy";

// Girls images fetch karna
async function loadPhotos() {
  try {
    let res = await fetch("https://api.pexels.com/v1/search?query=girl&per_page=1000", {
      headers: {
        Authorization: API_KEY
      }
    });
    let data = await res.json();

    photos = [];
    for (let i = 0; i < data.photos.length; i += 2) {
      photos.push({
        A: data.photos[i].src.large,
        B: data.photos[i + 1]?.src.large || data.photos[0].src.large
      });
    }

    setPhotos(currentindex);
    updateBars();
  } catch (err) {
    console.error("Error loading photos:", err);
  }
}

function updateBars() {
  const total = votesA + votesB;
  if (total === 0) {
    barA.style.width = "0%";
    barA.textContent = "0%";
    barB.style.width = "0%";
    barB.textContent = "0%";
    result.textContent = "";
    return;
  }

  const percentA = Math.round((votesA / total) * 100);
  const percentB = 100 - percentA;

  barA.style.width = percentA + "%";
  barA.textContent = percentA + "%";
  barB.style.width = percentB + "%";
  barB.textContent = percentB + "%";

  result.textContent = `Photo A: ${votesA} votes (${percentA}%) | Photo B: ${votesB} votes (${percentB}%)`;
}

function setPhotos(idx) {
  if (photos.length === 0) return;
  photoA.src = photos[idx].A;
  photoB.src = photos[idx].B;
}

function nextPhotos() {
  currentindex++;
  if (currentindex >= photos.length) currentindex = 0;

  setPhotos(currentindex);
  votesA = 0;
  votesB = 0;
  barA.style.width = "0%";
  barA.textContent = "0%";
  barB.style.width = "0%";
  barB.textContent = "0%";
  result.textContent = "";
}

optionA.addEventListener("click", () => {
  votesA++;
  updateBars();
});

optionB.addEventListener("click", () => {
  votesB++;
  updateBars();
});

// Init
loadPhotos();
