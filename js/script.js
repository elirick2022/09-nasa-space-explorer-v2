// ==========================
// 🌌 GLOBAL VARIABLES
// ==========================
const galleryContainer = document.querySelector("#gallery");
const getImagesButton = document.querySelector("#getImageBtn"); // matches your HTML button ID

// ✅ Class-provided JSON feed
const NASA_FEED_URL = "https://cdn.jsdelivr.net/gh/GCA-Classroom/apod/data.json";

// ==========================
// 🧠 RANDOM SPACE FACTS (LevelUp)
// ==========================
const spaceFacts = [
  "A day on Venus is longer than a year on Venus.",
  "There are more stars in the universe than grains of sand on Earth.",
  "Neutron stars can spin up to 600 times per second!",
  "Saturn could float in water because it’s mostly made of gas.",
  "Light from the Sun takes about 8 minutes to reach Earth.",
  "The footprints on the Moon will stay there for millions of years.",
  "There’s a planet made entirely of diamonds called 55 Cancri e."
];

// ==========================
// 🚀 FETCH NASA DATA
// ==========================
async function fetchSpaceImages() {
  try {
    // Clear the placeholder and show a loading message
    galleryContainer.innerHTML = `<p class="loading">🔄 Loading space photos...</p>`;

    const response = await fetch(NASA_FEED_URL);
    if (!response.ok) throw new Error("Network error while fetching NASA data");

    const data = await response.json();

    // Once loaded, display gallery
    displayGallery(data);
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    galleryContainer.innerHTML = `<p class="error">⚠️ Unable to load space photos. Please try again later.</p>`;
  }
}

// ==========================
// 🖼️ DISPLAY GALLERY ITEMS
// ==========================
function displayGallery(data) {
  galleryContainer.innerHTML = ""; // clear any loading text

  data.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("gallery-item");

    // Handle videos gracefully (LevelUp feature)
    if (item.media_type === "video") {
      card.innerHTML = `
        <div class="video-item">
          <iframe src="${item.url}" frameborder="0" allowfullscreen class="gallery-video"></iframe>
          <h3>${item.title}</h3>
          <p>${item.date}</p>
        </div>
      `;
    } else {
      card.innerHTML = `
        <img src="${item.url}" alt="${item.title}" class="gallery-image" />
        <h3>${item.title}</h3>
        <p>${item.date}</p>
      `;

      // Add click to open modal
      card.addEventListener("click", () => openModal(item));
    }

    galleryContainer.appendChild(card);
  });
}

// ==========================
// 🪐 MODAL FUNCTIONALITY
// ==========================

// Create modal dynamically (since HTML didn’t include one)
const modal = document.createElement("div");
modal.id = "modal";
modal.innerHTML = `
  <div id="modal-content" class="modal-content">
    <span id="modal-close" class="modal-close">&times;</span>
  </div>
`;
document.body.appendChild(modal);

const modalContent = modal.querySelector("#modal-content");
const modalClose = modal.querySelector("#modal-close");

function openModal(item) {
  modal.style.display = "flex";
  modalContent.innerHTML = `
    <span id="modal-close" class="modal-close">&times;</span>
    <img src="${item.url}" alt="${item.title}" class="modal-image" />
    <h2>${item.title}</h2>
    <p><em>${item.date}</em></p>
    <p>${item.explanation}</p>
  `;

  modal.querySelector("#modal-close").addEventListener("click", closeModal);
}

function closeModal() {
  modal.style.display = "none";
}

// Close modal on outside click
modal.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

// ==========================
// � DISPLAY RANDOM SPACE FACT
// ==========================
function displayRandomFact() {
  const factText = document.querySelector("#factText");
  // Pick a random fact from the spaceFacts array
  const randomFact = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
  factText.textContent = "Space Fact: " +randomFact;
}

// Display a random fact when the page loads
displayRandomFact();

// ==========================
// 🌙 DARK MODE TOGGLE
// ==========================
const darkModeToggle = document.querySelector("#darkModeToggle");

// Check if user has a saved preference
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.textContent = "☀️";
}

// Toggle dark mode on button click
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  
  // Update button icon
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️";
    localStorage.setItem("darkMode", "enabled");
  } else {
    darkModeToggle.textContent = "🌙";
    localStorage.setItem("darkMode", "disabled");
  }
}

// ==========================
// 💫 EVENT LISTENERS
// ==========================
getImagesButton.addEventListener("click", fetchSpaceImages);
darkModeToggle.addEventListener("click", toggleDarkMode);