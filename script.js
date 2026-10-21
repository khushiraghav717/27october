
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const envelope = $("#envelope");
const intro = $("#intro");
const letterSection = $("#letterSection");
const toast = $("#toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

// OPEN THE ENVELOPE
function openEnvelope() {
  envelope.classList.add("open");

  setTimeout(() => {
    intro.classList.add("hidden");
    letterSection.classList.remove("hidden");

    letterSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    burstHearts(12);
  }, 550);
}

envelope.addEventListener("click", openEnvelope);

envelope.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openEnvelope();
  }
});

$("#openLetterBtn").addEventListener("click", openEnvelope);

// NAVIGATE TO THE NEXT SECTION
$$("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.next);

    target.classList.remove("hidden");

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    burstHearts(5);
  });
});

// YES / NO INTERACTION
const noBtn = $("#noBtn");
let noCount = 0;

const noMessages = [
  "Are you sure? 🥺",
  "Think again, handsome!",
  "That button seems broken… 😌",
  "Try the other one, love ♡"
];

noBtn.addEventListener("click", () => {
  noCount++;

  $("#response").textContent =
    noMessages[Math.min(noCount - 1, noMessages.length - 1)];

  noBtn.style.transform =
    `translate(${Math.sin(noCount * 2) * 22}px,
    ${Math.cos(noCount * 2) * 8}px)`;

  if (noCount >= 3) {
    $("#yesBtn").textContent = "OKAY YES, ALWAYS ♡";
  }
});

$("#yesBtn").addEventListener("click", () => {
  $("#response").textContent =
    "Correct answer! I love you, Shivam. ♡";

  $("#celebrationSection").classList.remove("hidden");

  $("#celebrationSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  burstHearts(28);
});

// MAKE A WISH: BLOW OUT THE CANDLE
function makeWish() {
  $("#flame").classList.add("out");

  $("#wishResponse").textContent =
    "Wish made! May all our little dreams find their way to us. ✨";

  $("#cake").style.filter =
    "drop-shadow(0 0 18px #f3c5a5)";

  burstHearts(18);
}

$("#cake").addEventListener("click", makeWish);

$("#cake").addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    makeWish();
  }
});

// GIFT BOX MESSAGES
const gifts = [
  {
    eyebrow: "Gift no. 1 · A little reminder",
    title: "You are loved. A lot.",
    text: "On your best days, your worst days, and all the ordinary days in between — I hope you never forget how special you are to me. ♡"
  },
  {
    eyebrow: "Gift no. 2 · Something I adore",
    title: "It's the little things.",
    text: "Your smile, your voice, your silly side, the way you make me laugh when I'm trying to be serious… I could make a whole list, but then we'd be here forever. 💌"
  },
  {
    eyebrow: "Gift no. 3 · A promise for us",
    title: "I'll keep choosing us.",
    text: "I promise to keep communicating, celebrating your wins, cheering you on, and making room for new memories. Not perfect — just honest, caring, and us. ✨"
  }
];

$$("[data-gift]").forEach((button) => {
  button.addEventListener("click", () => {
    const gift = gifts[Number(button.dataset.gift)];

    $("#giftEyebrow").textContent = gift.eyebrow;
    $("#giftTitle").textContent = gift.title;
    $("#giftText").textContent = gift.text;

    $("#giftMessage").classList.remove("hidden");

    $("#giftMessage").scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    burstHearts(7);
  });
});

$("#closeGift").addEventListener("click", () => {
  $("#giftMessage").classList.add("hidden");
});

// LOVE COUPONS
const coupons = [
  "Coupon redeemed: one extra-long hug, delivered with interest. 🤗",
  "Coupon redeemed: your date, your rules. Plan something fun! ✨",
  "Coupon redeemed: forehead kisses, unlimited edition. 💋",
  "Coupon redeemed: I'm listening. Tell me everything. ☁"
];

$$("[data-coupon]").forEach((button) => {
  button.addEventListener("click", () => {
    const index = Number(button.dataset.coupon);

    button.style.background = "#f4dfe0";
    button.querySelector("span").textContent = "♡ REDEEMED ♡";

    $("#couponResponse").textContent = coupons[index];

    burstHearts(5);
  });
});

// PHOTO POP-UPS
$$("[data-photo]").forEach((button, index) => {
  button.addEventListener("click", () => {
    const src = button.dataset.photo;
    const img = new Image();

    img.onload = () => {
      $("#viewerImage").src = src;

      $("#viewerCaption").textContent = [
        "My favourite moment ♡",
        "Us being us ✧",
        "A day to remember ♥"
      ][index];

      $("#photoViewer").classList.remove("hidden");

      $("#photoViewer").scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    };

    img.onerror = () => {
      showToast("Add your photo as " + src + " inside the project folder.");
    };

    img.src = src;
  });
});

$("#closePhoto").addEventListener("click", () => {
  $("#photoViewer").classList.add("hidden");
  $("#viewerImage").src = "";
});

// BACKGROUND MUSIC
const music = $("#bgMusic");
const musicToggle = $("#musicToggle");

let musicOn = false;

musicToggle.addEventListener("click", async () => {
  if (!musicOn) {
    try {
      await music.play();

      musicOn = true;

      musicToggle.innerHTML =
        '♫ <span>Music: on</span>';

    } catch (error) {
      showToast(
        "Add music/our-song.mp3 first, then tap Music again."
      );
    }
  } else {
    music.pause();
    musicOn = false;

    musicToggle.innerHTML =
      '♫ <span>Music: off</span>';
  }
});

// FLOATING HEARTS
function burstHearts(count = 8) {
  const symbols = ["♥", "♡", "✧", "💕"];

  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");

    heart.className = "heart-float";

    heart.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = (10 + Math.random() * 80) + "vw";
    heart.style.top = (45 + Math.random() * 35) + "vh";

    heart.style.color = [
      "#b94c68",
      "#d99a85",
      "#c79c5b",
      "#9c5267"
    ][Math.floor(Math.random() * 4)];

    heart.style.animationDelay =
      (Math.random() * 0.35) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2300);
  }
}

// START THE WEBSITE AGAIN
$("#restartBtn").addEventListener("click", () => {
  $$("main section").forEach((section, index) => {
    if (index !== 0) {
      section.classList.add("hidden");
    }
  });

  intro.classList.remove("hidden");
  envelope.classList.remove("open");

  $("#flame").classList.remove("out");

  $("#response").textContent = "";
  $("#wishResponse").textContent = "";
  $("#couponResponse").textContent = "";

  noCount = 0;
  noBtn.style.transform = "";

  $("#yesBtn").textContent = "YES, ALWAYS ♡";

  $$(".coupon").forEach((coupon, index) => {
    coupon.style.background = "";
    coupon.querySelector("span").textContent =
      `COUPON 0${index + 1}`;
  });

  $("#giftMessage").classList.add("hidden");
  $("#photoViewer").classList.add("hidden");

  $("#cake").style.filter = "";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});