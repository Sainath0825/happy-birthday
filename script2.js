window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("username") || "Guest";

  // Insert username
  document.querySelectorAll(".username").forEach(el => {
    el.textContent = name;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const card = document.getElementById("card");
  const cardWrapper = document.getElementById("cardWrapper");
  const music = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("musicToggle");
  const replayBtn = document.getElementById("replayBtn");

  let hasFlipped = false;

  // 🎁 Flip card and trigger confetti/music
  cardWrapper.addEventListener("click", () => {
    if (hasFlipped) return;

    card.classList.add("flipped");
    hasFlipped = true;

    // 🎉 Fire confetti
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    // 🎶 Start music (must be triggered by interaction)
    if (music) {
      music.play().catch(() => {
        console.warn("Music play blocked until interaction.");
      });
    }
  });

  // 🔊 Mute/Unmute toggle
  if (toggleBtn && music) {
    toggleBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        toggleBtn.textContent = "🔊";
      } else {
        music.pause();
        toggleBtn.textContent = "🔇";
      }
    });
  }

  // ⏪ Replay
  if (replayBtn && card) {
    replayBtn.addEventListener("click", () => {
      card.classList.remove("flipped");
      hasFlipped = false;

      void card.offsetWidth; // Force reflow for CSS transition

      setTimeout(() => {
        card.classList.add("flipped");
        hasFlipped = true;

        // Confetti again
        if (typeof confetti === "function") {
          confetti({
            particleCount: 800,
            spread: 800,
            origin: { y: 0.6 }
          });
        }

        // Restart music
        if (music) {
          music.play().catch(() => {});
          toggleBtn.textContent = "🔊";
        }
      }, 300);
    });
  }
});
