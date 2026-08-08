(function () {
  "use strict";

  /*
   * PERSONALIZAÇÃO RÁPIDA
   * As músicas abaixo são a playlist de vocês e aparecem no player oficial do Spotify.
   * O site não baixa, extrai ou redistribui os áudios.
   */
  const siteConfig = {
    nome: "Isabella",
    dataAniversario: "[DATA]",
    playlist: [
      {
        title: "Te Dar",
        note: "Para abrir a nossa história.",
        spotify: "https://open.spotify.com/track/0RhHarZR8rfiTciTb8oRGg"
      },
      {
        title: "TE AMO SEM CULPA",
        note: "A música da carta.",
        spotify: "https://open.spotify.com/track/1chcsgpMWNNfTuhXSujoUA"
      },
      {
        title: "Códigos",
        note: "Mais uma música que é nossa.",
        spotify: "https://open.spotify.com/intl-pt/track/6YaD8CoJIb0HGulK8n21RZ"
      },
      {
        title: "pensando direito",
        note: "Da nossa playlist para ficar perto.",
        spotify: "https://open.spotify.com/intl-pt/track/57FSQIGpI6WZm4ko6mGOVJ"
      },
      {
        title: "Seu Jogo",
        note: "Para lembrar que a nossa playlist continua crescendo.",
        spotify: "https://open.spotify.com/intl-pt/track/5e9WIdb3KsK7r8soV41bKo"
      }
    ],
    carta: [
      "[ESCREVA AQUI A CARTA]"
    ]
  };

  /*
   * Fotos e legendas. Troque image, alt, date e text sem alterar o restante do site.
   * Enquanto os arquivos não existirem, o site mostra um espaço reservado elegante.
   */
  const memories = [
    {
      image: "assets/images/foto01.jpg",
      alt: "Espaço reservado para a foto 01",
      date: "",
      text: "[Escreva aqui uma lembrança desta foto.]",
      orientation: "portrait",
      tilt: "-2.1deg"
    },
    {
      image: "assets/images/foto02.jpg",
      alt: "Espaço reservado para a foto 02",
      date: "",
      text: "[Escreva aqui uma lembrança desta foto.]",
      orientation: "portrait",
      tilt: "2deg"
    },
    {
      image: "assets/images/foto03.jpg",
      alt: "Espaço reservado para a foto 03",
      date: "",
      text: "[Escreva aqui uma lembrança desta foto.]",
      orientation: "wide",
      tilt: "-.8deg"
    },
    {
      image: "assets/images/foto04.jpg",
      alt: "Espaço reservado para a foto 04",
      date: "",
      text: "[Escreva aqui uma lembrança desta foto.]",
      orientation: "portrait",
      tilt: "1.5deg"
    },
    {
      image: "assets/images/foto05.jpg",
      alt: "Espaço reservado para a foto 05",
      date: "",
      text: "[Escreva aqui uma lembrança desta foto.]",
      orientation: "portrait",
      tilt: "-1.1deg"
    },
    {
      image: "assets/images/foto06.jpg",
      alt: "Espaço reservado para a foto 06",
      date: "",
      text: "[Escreva aqui uma lembrança desta foto.]",
      orientation: "wide",
      tilt: "1.7deg"
    }
  ];

  const tracks = siteConfig.playlist;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    giftOpened: false,
    storyStarted: false,
    activeTrack: 0,
    playlistOpen: false,
    letterStarted: false,
    galleryIndex: 0,
    focusBeforeModal: null,
    toastTimer: null,
    activeZumbaStep: 0,
    chocolateBites: 0
  };

  const elements = {
    body: document.body,
    giftGate: document.getElementById("giftGate"),
    giftButton: document.getElementById("giftButton"),
    giftReveal: document.getElementById("giftReveal"),
    startStoryButton: document.getElementById("startStoryBtn"),
    story: document.getElementById("story"),
    chapterProgress: document.getElementById("chapterProgress"),
    chapterNumber: document.getElementById("chapterNumber"),
    chapterName: document.getElementById("chapterName"),
    chapterProgressFill: document.getElementById("chapterProgressFill"),
    memoryStack: document.getElementById("memoryStack"),
    filmFrames: document.getElementById("filmFrames"),
    beachMemories: document.getElementById("beachMemories"),
    snickersButton: document.getElementById("snickersButton"),
    snickersMessage: document.getElementById("snickersMessage"),
    chocolateTreat: document.getElementById("chocolateTreat"),
    chocolateBites: document.getElementById("chocolateBites"),
    chocolateBurst: document.getElementById("chocolateBurst"),
    zumbaStatus: document.getElementById("zumbaStatus"),
    sprayButton: document.getElementById("sprayButton"),
    sprayMessage: document.getElementById("sprayMessage"),
    greece: document.getElementById("greece"),
    greeceResult: document.getElementById("greeceResult"),
    continueMusicButton: document.getElementById("continueMusicButton"),
    letterContent: document.getElementById("letterContent"),
    birthdayName: document.getElementById("birthdayName"),
    finalName: document.getElementById("finalName"),
    confettiButton: document.getElementById("confettiButton"),
    confettiField: document.getElementById("confettiField"),
    restartButton: document.getElementById("restartButton"),
    galleryModal: document.getElementById("galleryModal"),
    galleryClose: document.getElementById("galleryClose"),
    galleryPrev: document.getElementById("galleryPrev"),
    galleryNext: document.getElementById("galleryNext"),
    galleryImage: document.getElementById("galleryImage"),
    galleryPlaceholder: document.getElementById("galleryPlaceholder"),
    galleryCaption: document.getElementById("galleryCaption"),
    player: document.getElementById("storyPlayer"),
    currentTrack: document.getElementById("currentTrack"),
    playlistToggle: document.getElementById("playlistToggle"),
    playlistOpenButton: document.getElementById("playlistOpen"),
    playlistPanel: document.getElementById("playlistPanel"),
    playlistClose: document.getElementById("playlistClose"),
    playlistTracks: document.getElementById("playlistTracks"),
    spotifyEmbed: document.getElementById("spotifyEmbed"),
    spotifyOpen: document.getElementById("spotifyOpen"),
    toast: document.getElementById("toast")
  };

  const chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
  const revealTargets = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  const zumbaSequence = ["left", "right", "jump", "spin"];

  function makeElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (typeof text === "string") {
      element.textContent = text;
    }
    return element;
  }

  function setTextContent() {
    elements.birthdayName.textContent = "Feliz aniversário, " + siteConfig.nome + ". 💙";
    elements.finalName.textContent = "Feliz aniversário, " + siteConfig.nome + ".";
    document.title = "Uma pequena viagem pelas nossas memórias";
  }

  function createImageVisual(memory, visualClass, placeholderClass, label) {
    const visual = makeElement("div", visualClass);
    const image = document.createElement("img");
    const placeholder = makeElement("span", placeholderClass, label);

    image.alt = memory.alt;
    image.loading = "lazy";
    image.decoding = "async";
    image.style.display = "none";

    image.addEventListener("load", function () {
      image.style.display = "block";
      placeholder.hidden = true;
    });

    image.addEventListener("error", function () {
      image.style.display = "none";
      placeholder.hidden = false;
    });

    visual.appendChild(image);
    visual.appendChild(placeholder);

    if (memory.image) {
      image.src = memory.image;
    }

    return visual;
  }

  function renderMemories() {
    const memoryFragment = document.createDocumentFragment();

    memories.forEach(function (memory, index) {
      const card = makeElement("button", "memory-card memory-card--" + memory.orientation);
      const text = makeElement("span", "memory-card__text", memory.text);
      const date = makeElement("span", "memory-card__date", memory.date);
      const visual = createImageVisual(memory, "memory-card__visual", "memory-card__placeholder", "Foto " + String(index + 1).padStart(2, "0"));

      card.type = "button";
      card.style.setProperty("--tilt", memory.tilt);
      card.setAttribute("aria-label", "Abrir foto " + String(index + 1));
      card.appendChild(visual);
      card.appendChild(text);
      if (memory.date) {
        card.appendChild(date);
      }
      card.addEventListener("click", function () {
        openGallery(index);
      });
      memoryFragment.appendChild(card);
    });

    elements.memoryStack.appendChild(memoryFragment);

    const frameFragment = document.createDocumentFragment();
    memories.slice(0, 3).forEach(function (memory, index) {
      const frame = makeElement("button", "film-frame");
      const visual = createImageVisual(memory, "film-frame__visual", "film-frame__placeholder", "Uma lembrança");
      const frameOffsets = [
        { y: "1rem", tilt: "-5deg" },
        { y: "-.35rem", tilt: "2deg" },
        { y: "1.25rem", tilt: "5deg" }
      ];

      frame.type = "button";
      frame.style.setProperty("--frame-y", frameOffsets[index].y);
      frame.style.setProperty("--frame-tilt", frameOffsets[index].tilt);
      frame.setAttribute("aria-label", "Abrir foto em destaque " + String(index + 1));
      frame.appendChild(visual);
      frame.addEventListener("click", function () {
        openGallery(index);
      });
      frameFragment.appendChild(frame);
    });
    elements.filmFrames.appendChild(frameFragment);

    const beachFragment = document.createDocumentFragment();
    memories.slice(3, 6).forEach(function (memory, index) {
      const frame = makeElement("button", "beach-memory");
      const visual = createImageVisual(memory, "beach-memory__img", "beach-memory__placeholder", "Foto perto do mar");
      const tilts = ["-4deg", "1deg", "4deg"];

      frame.type = "button";
      frame.style.setProperty("--beach-tilt", tilts[index]);
      frame.setAttribute("aria-label", "Abrir foto perto do mar " + String(index + 4));
      frame.appendChild(visual);
      frame.addEventListener("click", function () {
        openGallery(index + 3);
      });
      beachFragment.appendChild(frame);
    });
    elements.beachMemories.appendChild(beachFragment);
  }

  function showToast(message) {
    window.clearTimeout(state.toastTimer);
    elements.toast.textContent = message;
    elements.toast.classList.add("is-visible");
    state.toastTimer = window.setTimeout(function () {
      elements.toast.classList.remove("is-visible");
    }, 4300);
  }

  function revealGift() {
    if (state.giftOpened) {
      return;
    }

    state.giftOpened = true;
    elements.giftButton.classList.add("is-open");
    elements.giftButton.setAttribute("aria-expanded", "true");
    elements.giftButton.setAttribute("aria-label", "Presente aberto");

    window.setTimeout(function () {
      elements.giftReveal.hidden = false;
      elements.startStoryButton.focus();
    }, reducedMotion ? 40 : 700);
  }

  function getSpotifyEmbedUrl(track) {
    const match = track.spotify.match(/track\/([^?]+)/);
    const trackId = match ? match[1] : "";
    return "https://open.spotify.com/embed/track/" + trackId + "?utm_source=generator&theme=0";
  }

  function updatePlaylistInterface() {
    const activeTrack = tracks[state.activeTrack];
    const trackButtons = Array.prototype.slice.call(elements.playlistTracks.querySelectorAll("[data-playlist-index]"));

    elements.currentTrack.textContent = activeTrack.title;
    elements.spotifyOpen.href = activeTrack.spotify;
    elements.spotifyOpen.textContent = "Abrir “" + activeTrack.title + "” no Spotify ↗";

    trackButtons.forEach(function (button) {
      const isSelected = Number(button.getAttribute("data-playlist-index")) === state.activeTrack;
      button.classList.toggle("is-selected", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function selectSpotifyTrack(index, shouldOpenPanel) {
    const selectedIndex = Number(index);
    if (!tracks[selectedIndex]) {
      return;
    }

    state.activeTrack = selectedIndex;
    if (state.storyStarted || state.playlistOpen || shouldOpenPanel) {
      elements.spotifyEmbed.src = getSpotifyEmbedUrl(tracks[selectedIndex]);
    }
    updatePlaylistInterface();

    if (shouldOpenPanel) {
      openPlaylist(true);
    }
  }

  function renderPlaylist() {
    const fragment = document.createDocumentFragment();

    tracks.forEach(function (track, index) {
      const button = makeElement("button", "playlist-track");
      const number = makeElement("span", "playlist-track__number", String(index + 1).padStart(2, "0"));
      const copy = makeElement("span", "playlist-track__copy");
      const title = makeElement("strong", "", track.title);
      const note = makeElement("small", "", track.note);

      button.type = "button";
      button.setAttribute("data-playlist-index", String(index));
      button.setAttribute("aria-pressed", "false");
      copy.appendChild(title);
      copy.appendChild(note);
      button.appendChild(number);
      button.appendChild(copy);
      button.addEventListener("click", function () {
        selectSpotifyTrack(index, false);
      });
      fragment.appendChild(button);
    });

    elements.playlistTracks.appendChild(fragment);
    selectSpotifyTrack(0, false);
  }

  function openPlaylist(shouldFocus) {
    state.playlistOpen = true;
    elements.playlistPanel.hidden = false;
    elements.playlistToggle.setAttribute("aria-expanded", "true");
    if (!elements.spotifyEmbed.getAttribute("src")) {
      elements.spotifyEmbed.src = getSpotifyEmbedUrl(tracks[state.activeTrack]);
    }

    if (shouldFocus) {
      window.setTimeout(function () {
        const activeButton = elements.playlistTracks.querySelector("[data-playlist-index='" + state.activeTrack + "']");
        if (activeButton) {
          activeButton.focus();
        }
      }, 0);
    }
  }

  function closePlaylist() {
    state.playlistOpen = false;
    elements.playlistPanel.hidden = true;
    elements.playlistToggle.setAttribute("aria-expanded", "false");
  }

  function startStory() {
    if (state.storyStarted) {
      return;
    }

    state.storyStarted = true;
    elements.story.hidden = false;
    elements.player.hidden = false;
    elements.chapterProgress.hidden = false;
    elements.body.classList.remove("intro-active");
    elements.giftGate.classList.add("is-leaving");
    window.setTimeout(function () {
      elements.giftGate.hidden = true;
    }, reducedMotion ? 20 : 760);

    window.requestAnimationFrame(function () {
      elements.story.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });

    openPlaylist(false);
    selectSpotifyTrack(0, false);
    showToast("Essa é a nossa playlist. Aperta play no player oficial do Spotify.");
  }

  function updateProgress(index) {
    const chapter = chapters[index];
    const number = String(index + 1).padStart(2, "0");
    const percent = ((index + 1) / chapters.length) * 100;

    elements.chapterNumber.textContent = number;
    elements.chapterName.textContent = chapter.getAttribute("data-chapter") || "Capítulo";
    elements.chapterProgressFill.style.width = percent + "%";
  }

  function setupObservers() {
    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach(function (target) {
        target.classList.add("is-visible");
      });
      return;
    }

    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });

    const chapterObserver = new IntersectionObserver(function (entries) {
      let bestEntry = null;
      entries.forEach(function (entry) {
        if (entry.isIntersecting && (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio)) {
          bestEntry = entry;
        }
      });

      if (bestEntry) {
        updateProgress(chapters.indexOf(bestEntry.target));
      }
    }, { threshold: [0.2, 0.45, 0.7] });

    chapters.forEach(function (chapter) {
      chapterObserver.observe(chapter);
    });

    const letterObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          beginLetter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.28 });
    letterObserver.observe(document.getElementById("letter"));
  }

  function beginLetter() {
    if (state.letterStarted) {
      return;
    }

    state.letterStarted = true;
    selectSpotifyTrack(1, false);

    elements.letterContent.replaceChildren();
    siteConfig.carta.forEach(function (paragraph, index) {
      const paragraphElement = makeElement("p", "", paragraph);
      elements.letterContent.appendChild(paragraphElement);
      window.setTimeout(function () {
        paragraphElement.classList.add("is-visible");
      }, reducedMotion ? 0 : 460 + index * 820);
    });
  }

  function launchChocolate() {
    elements.chocolateBurst.replaceChildren();

    for (let index = 0; index < 10; index += 1) {
      const piece = makeElement("span", "chocolate-piece");
      const horizontal = Math.round((Math.random() * 13 - 6.5) * 16);
      const vertical = Math.round((Math.random() * -7 - 1) * 16);
      const rotation = Math.round(Math.random() * 520 - 260);
      piece.style.setProperty("--pop-x", horizontal + "px");
      piece.style.setProperty("--pop-y", vertical + "px");
      piece.style.setProperty("--pop-r", rotation + "deg");
      elements.chocolateBurst.appendChild(piece);
    }

    window.setTimeout(function () {
      elements.chocolateBurst.replaceChildren();
    }, 1000);
  }

  function acceptSnickers() {
    if (state.chocolateBites >= 3) {
      return;
    }

    state.chocolateBites += 1;
    launchChocolate();
    elements.chocolateTreat.classList.remove("is-bite-1", "is-bite-2", "is-bite-3");
    elements.chocolateTreat.classList.add("is-bite-" + state.chocolateBites);

    if (state.chocolateBites === 1) {
      elements.chocolateBites.textContent = "Primeira mordida: oficialmente merecida.";
      elements.snickersButton.textContent = "🍫 Mais uma mordida";
      return;
    }

    if (state.chocolateBites === 2) {
      elements.chocolateBites.textContent = "Segunda mordida: essa barra não tinha chance.";
      elements.snickersButton.textContent = "🍫 Só mais uma";
      return;
    }

    elements.chocolateBites.textContent = "Última mordida. Acabou, mas valeu cada pedacinho.";
    elements.snickersMessage.textContent = "Agora sim. Podemos continuar.";
    elements.snickersButton.textContent = "🍫 Eita, acabou";
    elements.snickersButton.disabled = true;
  }

  function updateZumbaGame() {
    const beatNodes = Array.prototype.slice.call(document.querySelectorAll(".zumba-game__beats span"));
    const moveNodes = Array.prototype.slice.call(document.querySelectorAll(".zumba-move"));

    beatNodes.forEach(function (beat, index) {
      beat.classList.toggle("is-done", index < state.activeZumbaStep);
      beat.classList.toggle("is-current", index === state.activeZumbaStep && state.activeZumbaStep < zumbaSequence.length);
    });

    moveNodes.forEach(function (move) {
      move.classList.toggle("is-expected", move.getAttribute("data-move") === zumbaSequence[state.activeZumbaStep]);
    });
  }

  function handleZumbaMove(event) {
    const move = event.currentTarget;
    const selectedMove = move.getAttribute("data-move");
    const expectedMove = zumbaSequence[state.activeZumbaStep];

    if (selectedMove !== expectedMove) {
      move.classList.add("is-wrong");
      elements.zumbaStatus.textContent = "Quase! Vamos voltar ao primeiro passo.";
      window.setTimeout(function () {
        move.classList.remove("is-wrong");
        state.activeZumbaStep = 0;
        updateZumbaGame();
      }, reducedMotion ? 20 : 620);
      return;
    }

    state.activeZumbaStep += 1;
    if (state.activeZumbaStep === zumbaSequence.length) {
      updateZumbaGame();
      elements.zumbaStatus.textContent = "Muito bem. Nota 10/10. 💃";
      window.setTimeout(function () {
        elements.zumbaStatus.textContent = "Bonito e sem atitude.";
      }, reducedMotion ? 30 : 2300);
      return;
    }

    elements.zumbaStatus.textContent = "Perfeito. Continue no próximo passo iluminado.";
    updateZumbaGame();
  }

  function sprayFragrance() {
    elements.sprayButton.classList.remove("is-spraying");
    void elements.sprayButton.offsetWidth;
    elements.sprayButton.classList.add("is-spraying");
    elements.sprayMessage.textContent = "Tá bom, tá bom... você tem motivos para se achar.";
    window.setTimeout(function () {
      elements.sprayButton.classList.remove("is-spraying");
    }, reducedMotion ? 20 : 780);
  }

  function chooseGreece(event) {
    const button = event.currentTarget;
    const choice = button.getAttribute("data-greece-choice");
    const responses = {
      beach: "Uma onda chega devagar. Parece que o mar estava esperando por você.",
      walk: "As ruazinhas azuis e brancas ficam ainda mais bonitas com uma boa companhia.",
      photos: "Luz dourada, mar ao fundo e muitas fotos para guardar."
    };
    const buttons = Array.prototype.slice.call(document.querySelectorAll("[data-greece-choice]"));

    buttons.forEach(function (choiceButton) {
      choiceButton.classList.toggle("is-selected", choiceButton === button);
    });

    elements.greece.classList.remove("is-beach-choice", "is-walk-choice", "is-photos-choice");
    elements.greece.classList.add("is-" + choice + "-choice");
    elements.greeceResult.textContent = responses[choice];
  }

  function openGallery(index) {
    const memory = memories[index];
    state.galleryIndex = index;
    state.focusBeforeModal = document.activeElement;
    elements.galleryModal.hidden = false;
    elements.body.classList.add("modal-open");
    updateGallery(memory);
    window.setTimeout(function () {
      elements.galleryClose.focus();
    }, 0);
  }

  function updateGallery(memory) {
    elements.galleryCaption.textContent = memory.text;
    elements.galleryImage.alt = memory.alt;
    elements.galleryPlaceholder.textContent = "Foto reservada";
    elements.galleryPlaceholder.hidden = false;
    elements.galleryImage.style.display = "none";

    elements.galleryImage.onload = function () {
      elements.galleryImage.style.display = "block";
      elements.galleryPlaceholder.hidden = true;
    };

    elements.galleryImage.onerror = function () {
      elements.galleryImage.style.display = "none";
      elements.galleryPlaceholder.hidden = false;
    };

    elements.galleryImage.src = memory.image;
  }

  function moveGallery(direction) {
    const total = memories.length;
    state.galleryIndex = (state.galleryIndex + direction + total) % total;
    updateGallery(memories[state.galleryIndex]);
  }

  function closeGallery() {
    if (elements.galleryModal.hidden) {
      return;
    }
    elements.galleryModal.hidden = true;
    elements.body.classList.remove("modal-open");
    if (state.focusBeforeModal && typeof state.focusBeforeModal.focus === "function") {
      state.focusBeforeModal.focus();
    }
  }

  function trapGalleryFocus(event) {
    if (elements.galleryModal.hidden || event.key !== "Tab") {
      return;
    }

    const focusable = Array.prototype.slice.call(elements.galleryModal.querySelectorAll("button:not([disabled])"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function launchConfetti() {
    const colors = ["#f2d39d", "#ffffff", "#3e9fd0", "#0a5d95", "#d0eff7"];
    elements.confettiField.replaceChildren();

    for (let index = 0; index < 44; index += 1) {
      const piece = makeElement("span", "confetti-piece");
      piece.style.setProperty("--confetti-left", Math.round(Math.random() * 100) + "%");
      piece.style.setProperty("--confetti-x", Math.round(Math.random() * 260 - 130) + "px");
      piece.style.setProperty("--confetti-duration", Math.round(1250 + Math.random() * 1200) + "ms");
      piece.style.setProperty("--confetti-color", colors[index % colors.length]);
      elements.confettiField.appendChild(piece);
    }

    showToast("Seu pedido ficou guardado entre as estrelas.");
    window.setTimeout(function () {
      elements.confettiField.replaceChildren();
    }, 3000);
  }

  function resetExperience() {
    state.storyStarted = false;
    state.activeTrack = 0;
    state.letterStarted = false;
    state.chocolateBites = 0;
    elements.letterContent.replaceChildren();
    elements.chocolateTreat.classList.remove("is-bite-1", "is-bite-2", "is-bite-3");
    elements.chocolateBites.textContent = "Uma barra inteira esperando por você.";
    elements.snickersMessage.textContent = "";
    elements.snickersButton.textContent = "🍫 Dar uma mordida";
    elements.snickersButton.disabled = false;
    elements.story.hidden = true;
    elements.player.hidden = true;
    elements.chapterProgress.hidden = true;
    elements.spotifyEmbed.removeAttribute("src");
    closePlaylist();
    selectSpotifyTrack(0, false);
    elements.giftGate.hidden = false;
    elements.giftGate.classList.remove("is-leaving");
    elements.body.classList.add("intro-active");
    elements.giftButton.classList.remove("is-open");
    elements.giftButton.setAttribute("aria-expanded", "false");
    elements.giftButton.removeAttribute("aria-label");
    elements.giftReveal.hidden = true;
    window.scrollTo({ top: 0, behavior: "auto" });
    window.setTimeout(function () {
      elements.giftButton.focus();
    }, 50);
  }

  function bindEvents() {
    elements.giftButton.addEventListener("click", revealGift);
    elements.startStoryButton.addEventListener("click", startStory);

    elements.playlistToggle.addEventListener("click", function () {
      if (state.playlistOpen) {
        closePlaylist();
      } else {
        openPlaylist(true);
      }
    });

    elements.playlistOpenButton.addEventListener("click", function () {
      openPlaylist(true);
    });

    elements.playlistClose.addEventListener("click", function () {
      closePlaylist();
      elements.playlistToggle.focus();
    });

    elements.continueMusicButton.addEventListener("click", function () {
      selectSpotifyTrack(1, true);
    });

    elements.snickersButton.addEventListener("click", acceptSnickers);
    Array.prototype.slice.call(document.querySelectorAll(".zumba-move")).forEach(function (button) {
      button.addEventListener("click", handleZumbaMove);
    });
    elements.sprayButton.addEventListener("click", sprayFragrance);
    Array.prototype.slice.call(document.querySelectorAll("[data-greece-choice]")).forEach(function (button) {
      button.addEventListener("click", chooseGreece);
    });
    elements.confettiButton.addEventListener("click", launchConfetti);
    elements.restartButton.addEventListener("click", resetExperience);

    elements.galleryClose.addEventListener("click", closeGallery);
    elements.galleryPrev.addEventListener("click", function () {
      moveGallery(-1);
    });
    elements.galleryNext.addEventListener("click", function () {
      moveGallery(1);
    });
    elements.galleryModal.addEventListener("click", function (event) {
      if (event.target === elements.galleryModal) {
        closeGallery();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && state.playlistOpen) {
        closePlaylist();
        elements.playlistToggle.focus();
        return;
      }

      if (!elements.galleryModal.hidden) {
        if (event.key === "Escape") {
          closeGallery();
        } else if (event.key === "ArrowLeft") {
          moveGallery(-1);
        } else if (event.key === "ArrowRight") {
          moveGallery(1);
        }
        trapGalleryFocus(event);
      }
    });
  }

  function initialise() {
    setTextContent();
    renderMemories();
    renderPlaylist();
    updateZumbaGame();
    bindEvents();
    setupObservers();
    updateProgress(0);
  }

  initialise();
}());
