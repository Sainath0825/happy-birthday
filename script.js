window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("username") || "Guest";

  // Set all elements with class "username"
  document.querySelectorAll(".username").forEach(el => {
    el.textContent = name;
  });

  // Dynamically update href on <a>
  const openButton = document.getElementById("openButton");
  if (openButton) {
    openButton.href = `index3.html?username=${encodeURIComponent(name)}`;
  }

  // Start typewriter effect
  typeWriter(message);
};

const message = "Your brother has something special just for you…";
const speed = 50;

function typeWriter(text, i = 0) {
  const target = document.getElementById("typewriter");
  if (!target) return;

  if (i < text.length) {
    target.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), speed);
  }
}

// Optional
function revealSurprise() {
  alert("🎉 Surprise! Here comes your special message...");
}


