(function () {
  "use strict";

  /*
   * PERSONALIZAÇÃO RÁPIDA
   * As músicas abaixo aparecem no player oficial incorporado do Spotify.
   * O site não baixa, extrai ou redistribui os áudios.
   */
  const siteConfig = {
    nome: "Isabella",
    dataAniversario: "[DATA]",
    playlist: [
      {
        title: "Te Dar",
        artist: "Ashira",
        note: "Para abrir a nossa história.",
        spotify: "https://open.spotify.com/track/0RhHarZR8rfiTciTb8oRGg",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0227e51a32deddbd241673cd13"
      },
      {
        title: "TE AMO SEM CULPA",
        artist: "Carol Biazin",
        note: "Mais uma música da nossa história.",
        spotify: "https://open.spotify.com/track/1chcsgpMWNNfTuhXSujoUA",
        cover: "https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e028c822133bf3cf6ae2de1d644"
      },
      {
        title: "Códigos",
        artist: "Carol Biazin",
        note: "Mais uma música que é nossa.",
        spotify: "https://open.spotify.com/intl-pt/track/6YaD8CoJIb0HGulK8n21RZ",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e028c822133bf3cf6ae2de1d644"
      },
      {
        title: "pensando direito",
        artist: "Delacruz, JOK3R, Péricles",
        note: "Da nossa playlist para ficar perto.",
        spotify: "https://open.spotify.com/intl-pt/track/57FSQIGpI6WZm4ko6mGOVJ",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0244edd080d52274c553c66c14"
      },
      {
        title: "Seu Jogo",
        artist: "Delacruz, Gu$t, MC Kevin o Chris",
        note: "Para lembrar que a nossa playlist continua crescendo.",
        spotify: "https://open.spotify.com/intl-pt/track/5e9WIdb3KsK7r8soV41bKo",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02b829627835550cd88418fb64"
      },
      {
        title: "Pouca Pausa",
        artist: "Clau, Cortesia Da Casa, Haikaiss",
        note: "A música da carta.",
        spotify: "https://open.spotify.com/intl-pt/track/2odzriVVZBwYOiYJEj30tm",
        cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e025937ef87945c165f9ace9c49"
      }
    ],
    carta: [
      "Desde que a gente foi naquele nascer do sol, eu comecei a gostar mais de ti, não que eu queria algo a mais, mas eu queria estar mais próximo, e desde então e venho gostando cada vez mais, e não é porque eu eu fiz esse site que eu gosto de ti"
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
    queueExpanded: false,
    spotifyController: null,
    spotifyControllerReady: false,
    spotifyPaused: true,
    spotifyEmbedPromise: null,
    initialPlaybackRequested: false,
    letterStarted: false,
    galleryIndex: 0,
    focusBeforeModal: null,
    toastTimer: null,
    chocolateBites: 0,
    fragranceStarted: false,
    fragranceRevealed: false,
    fragranceTimers: [],
    greeceNight: false,
    letterSunset: false
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
    scooterButton: document.getElementById("scooterButton"),
    fragrance: document.getElementById("fragrance"),
    fragranceLetter: document.getElementById("fragranceLetter"),
    fragranceStart: document.getElementById("fragranceStart"),
    fragrancePrompt: document.getElementById("fragrancePrompt"),
    fragranceReveal: document.getElementById("fragranceReveal"),
    fragranceMessage: document.getElementById("fragranceMessage"),
    greece: document.getElementById("greece"),
    greeceSunButton: document.getElementById("greeceSunButton"),
    greeceSunHint: document.getElementById("greeceSunHint"),
    greeceVisitMessage: document.getElementById("greeceVisitMessage"),
    greeceResult: document.getElementById("greeceResult"),
    letter: document.getElementById("letter"),
    letterSeaButton: document.getElementById("letterSeaButton"),
    letterSeaHint: document.getElementById("letterSeaHint"),
    continueMusicButton: document.getElementById("continueMusicButton"),
    letterContent: document.getElementById("letterContent"),
    birthdayName: document.getElementById("birthdayName"),
    birthdayWishMessage: document.getElementById("birthdayWishMessage"),
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
    currentTrackArtist: document.getElementById("currentTrackArtist"),
    currentTrackCover: document.getElementById("currentTrackCover"),
    playlistProgress: document.getElementById("playlistProgress"),
    playlistProgressFill: document.getElementById("playlistProgressFill"),
    playlistPreviousButton: document.getElementById("playlistPrevious"),
    playlistNextButton: document.getElementById("playlistNext"),
    playlistPlaybackButton: document.getElementById("playlistPlayback"),
    playlistQueueToggle: document.getElementById("playlistQueueToggle"),
    playlistQueueLabel: document.getElementById("playlistQueueLabel"),
    playlistQueue: document.getElementById("playlistQueue"),
    playlistTracks: document.getElementById("playlistTracks"),
    spotifyEmbed: document.getElementById("spotifyEmbed"),
    toast: document.getElementById("toast")
  };

  const chapters = Array.prototype.slice.call(document.querySelectorAll(".chapter"));
  const revealTargets = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

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

  function clearLegacySpotifySession() {
    try {
      window.localStorage.removeItem("bella-spotify-auth");
      window.sessionStorage.removeItem("bella-spotify-pkce");
      window.sessionStorage.removeItem("bella-spotify-autoplay");
      window.sessionStorage.removeItem("bella-resume-story");
    } catch (error) {
      // O player incorporado funciona mesmo se o navegador bloquear o storage.
    }
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

    setupSpotifyEmbed().catch(function () {});
  }

  function getSpotifyTrackUri(track) {
    const match = track.spotify.match(/track\/([^?]+)/);
    return match ? "spotify:track:" + match[1] : "";
  }

  function updatePlaybackButton() {
    const isPlaying = !state.spotifyPaused;
    const icon = elements.playlistPlaybackButton.querySelector(".story-player__play");

    elements.player.classList.toggle("is-playing", isPlaying);
    elements.playlistPlaybackButton.setAttribute("aria-label", isPlaying ? "Pausar música" : "Tocar música");
    icon.textContent = isPlaying ? "Ⅱ" : "▶";
  }

  function updatePlaybackProgress(position, duration) {
    const safePosition = Number(position);
    const safeDuration = Number(duration);
    const percentage = Number.isFinite(safePosition) && Number.isFinite(safeDuration) && safeDuration > 0
      ? Math.min(100, Math.max(0, (safePosition / safeDuration) * 100))
      : 0;

    elements.playlistProgressFill.style.width = percentage + "%";
    elements.playlistProgress.setAttribute("aria-valuenow", String(Math.round(percentage)));
  }

  function updateQueueInterface() {
    elements.player.classList.toggle("is-queue-open", state.queueExpanded);
    elements.playlistQueueToggle.setAttribute("aria-expanded", String(state.queueExpanded));
    elements.playlistQueue.setAttribute("aria-hidden", String(!state.queueExpanded));
    elements.playlistQueueLabel.textContent = state.queueExpanded ? "Ver menos músicas" : "Ver próximas músicas";
  }

  function updatePlaylistInterface() {
    const activeTrack = tracks[state.activeTrack];

    elements.currentTrack.textContent = activeTrack.title;
    elements.currentTrackArtist.textContent = activeTrack.artist || "A nossa playlist";
    elements.currentTrackCover.src = activeTrack.cover || "";
    elements.currentTrackCover.alt = "Capa de “" + activeTrack.title + "”";

    renderPlaylistQueue();
    updatePlaybackButton();
  }

  function loadSpotifyTrack(shouldPlay) {
    if (!state.spotifyControllerReady || !state.spotifyController) {
      return;
    }

    state.spotifyController.loadEntity(getSpotifyTrackUri(tracks[state.activeTrack]));
    if (shouldPlay) {
      window.setTimeout(function () {
        if (state.spotifyController) {
          state.spotifyController.play();
        }
      }, reducedMotion ? 0 : 140);
    }
  }

  function selectSpotifyTrack(index, shouldPlay) {
    const selectedIndex = Number(index);
    if (!tracks[selectedIndex]) {
      return;
    }

    state.activeTrack = selectedIndex;
    updatePlaybackProgress(0, 0);
    updatePlaylistInterface();
    loadSpotifyTrack(Boolean(shouldPlay));
  }

  function moveSpotifyTrack(direction) {
    const nextIndex = (state.activeTrack + direction + tracks.length) % tracks.length;
    selectSpotifyTrack(nextIndex, !state.spotifyPaused);
  }

  function renderPlaylistQueue() {
    const fragment = document.createDocumentFragment();

    for (let offset = 1; offset < tracks.length; offset += 1) {
      const index = (state.activeTrack + offset) % tracks.length;
      const track = tracks[index];
      const button = makeElement("button", "playlist-track");
      const number = makeElement("span", "playlist-track__number", String(index + 1).padStart(2, "0"));
      const copy = makeElement("span", "playlist-track__copy");
      const title = makeElement("strong", "", track.title);
      const note = makeElement("small", "", track.note);

      button.type = "button";
      button.setAttribute("data-playlist-index", String(index));
      button.setAttribute("aria-pressed", "false");
      if (offset === 1) {
        button.classList.add("is-next");
      }
      copy.appendChild(title);
      copy.appendChild(note);
      button.appendChild(number);
      button.appendChild(copy);
      button.addEventListener("click", function () {
        selectSpotifyTrack(index, !state.spotifyPaused);
      });
      fragment.appendChild(button);
    }

    elements.playlistTracks.replaceChildren(fragment);
  }

  function renderPlaylist() {
    selectSpotifyTrack(0, false);
  }

  function setupSpotifyEmbed() {
    if (state.spotifyEmbedPromise) {
      return state.spotifyEmbedPromise;
    }

    state.spotifyEmbedPromise = new Promise(function (resolve, reject) {
      const createController = function (IFrameAPI) {
        IFrameAPI.createController(elements.spotifyEmbed, {
          uri: getSpotifyTrackUri(tracks[state.activeTrack]),
          width: "1",
          height: "1"
        }, function (controller) {
          state.spotifyController = controller;
          controller.addListener("ready", function () {
            state.spotifyControllerReady = true;
            updatePlaybackButton();
            resolve(controller);
          });
          controller.addListener("playback_started", function () {
            state.initialPlaybackRequested = false;
          });
          controller.addListener("playback_update", function (event) {
            if (!event.data) {
              return;
            }

            state.spotifyPaused = Boolean(event.data.isPaused);
            const matchingTrack = tracks.findIndex(function (track) {
              return getSpotifyTrackUri(track) === event.data.playingURI;
            });
            if (matchingTrack >= 0) {
              state.activeTrack = matchingTrack;
            }
            updatePlaybackProgress(event.data.position, event.data.duration);
            updatePlaylistInterface();
          });
        });
      };

      const previousReady = window.onSpotifyIframeApiReady;
      window.onSpotifyIframeApiReady = function (IFrameAPI) {
        if (typeof previousReady === "function") {
          previousReady(IFrameAPI);
        }
        createController(IFrameAPI);
      };

      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.dataset.spotifyIframeApi = "true";
      script.addEventListener("error", function () {
        reject(new Error("spotify_embed_unavailable"));
      }, { once: true });
      document.body.appendChild(script);
    }).catch(function (error) {
      state.spotifyEmbedPromise = null;
      if (state.storyStarted) {
        showToast("Não foi possível carregar o player do Spotify agora.");
      }
      throw error;
    });

    return state.spotifyEmbedPromise;
  }

  function toggleSpotifyPlayback() {
    state.initialPlaybackRequested = false;
    setupSpotifyEmbed().then(function (controller) {
      controller.togglePlay();
    }).catch(function () {});
  }

  function playInitialTrackFromGesture() {
    state.initialPlaybackRequested = true;

    if (state.spotifyControllerReady && state.spotifyController) {
      state.spotifyController.play();
      return;
    }

    setupSpotifyEmbed().then(function (controller) {
      if (state.initialPlaybackRequested && state.storyStarted) {
        controller.play();
      }
    }).catch(function () {});
  }

  function togglePlaylistQueue() {
    state.queueExpanded = !state.queueExpanded;
    updateQueueInterface();
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

    playInitialTrackFromGesture();
    showToast("A nossa playlist está pronta.");
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
    selectSpotifyTrack(5, false);

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

  function runScooter() {
    elements.scooterButton.classList.remove("is-riding");
    void elements.scooterButton.offsetWidth;
    elements.scooterButton.classList.add("is-riding");
  }

  function clearFragranceTimers() {
    state.fragranceTimers.forEach(function (timer) {
      window.clearTimeout(timer);
    });
    state.fragranceTimers = [];
  }

  function showFragrancePrompt() {
    elements.fragrancePrompt.hidden = false;
    elements.fragrancePrompt.classList.remove("is-visible");
    void elements.fragrancePrompt.offsetWidth;
    elements.fragrancePrompt.classList.add("is-visible");

    window.requestAnimationFrame(function () {
      elements.fragranceReveal.focus({ preventScroll: true });
    });
  }

  function startFragranceSequence() {
    if (state.fragranceStarted) {
      return;
    }

    state.fragranceStarted = true;
    clearFragranceTimers();
    elements.fragrance.classList.add("is-opening");
    elements.fragrance.setAttribute("aria-busy", "true");
    elements.fragranceStart.disabled = true;
    elements.fragranceStart.setAttribute("aria-expanded", "true");

    if (reducedMotion) {
      elements.fragranceLetter.classList.add("is-open");
      elements.fragranceStart.hidden = true;
      showFragrancePrompt();
      elements.fragrance.classList.remove("is-opening");
      elements.fragrance.classList.add("is-open");
      elements.fragrance.removeAttribute("aria-busy");
      return;
    }

    state.fragranceTimers.push(window.setTimeout(function () {
      elements.fragranceStart.hidden = true;
    }, 320));

    state.fragranceTimers.push(window.setTimeout(function () {
      elements.fragranceLetter.classList.add("is-open");
    }, 480));

    state.fragranceTimers.push(window.setTimeout(showFragrancePrompt, 1500));

    state.fragranceTimers.push(window.setTimeout(function () {
      elements.fragrance.classList.remove("is-opening");
      elements.fragrance.classList.add("is-open");
      elements.fragrance.removeAttribute("aria-busy");
    }, 1820));
  }

  function revealFragranceMessage() {
    if (state.fragranceRevealed) {
      return;
    }

    state.fragranceRevealed = true;
    elements.fragranceMessage.textContent = "Não se acha, garota. Não é porque eu fiz isso que eu gosto de ti.";
    elements.fragrance.classList.add("is-revealed");
    elements.fragrancePrompt.classList.add("is-revealed");
    elements.fragranceReveal.textContent = "Tá bom, eu entendi 😌";
    elements.fragranceReveal.disabled = true;
  }

  function toggleGreeceNight() {
    state.greeceNight = !state.greeceNight;
    elements.greece.classList.toggle("is-night", state.greeceNight);
    elements.body.classList.toggle("greece-night-mode", state.greeceNight);
    elements.greeceSunButton.setAttribute("aria-pressed", String(state.greeceNight));
    elements.greeceSunHint.textContent = state.greeceNight ? "A noite chegou" : "Clique no sol";
    elements.greeceResult.textContent = state.greeceNight
      ? "Vamos para a Grécia ainda? À noite ela fica ainda mais bonita."
      : "O dia voltou. Mas a Grécia continua esperando a gente.";
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

    elements.greece.classList.remove("is-beach-choice", "is-walk-choice", "is-photos-choice", "is-beach-arriving");

    if (choice === "beach") {
      void elements.greece.offsetWidth;
    }

    elements.greece.classList.add("is-" + choice + "-choice");

    if (choice === "beach") {
      elements.greece.classList.add("is-beach-arriving");
    }

    elements.greeceVisitMessage.setAttribute("aria-hidden", String(choice !== "photos"));
    elements.greeceResult.textContent = responses[choice] + (state.greeceNight ? " À noite, então?" : "");
  }

  function toggleLetterSeaTheme() {
    state.letterSunset = !state.letterSunset;
    elements.letter.classList.toggle("is-sunset-theme", state.letterSunset);
    elements.body.classList.toggle("sunset-site-mode", state.letterSunset);
    elements.letterSeaButton.setAttribute("aria-pressed", String(state.letterSunset));
    elements.letterSeaHint.textContent = state.letterSunset ? "Voltar ao azul" : "Toque no mar";
    showToast(state.letterSunset ? "O mar aqueceu as cores do site." : "As cores azuis voltaram.");
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
    elements.birthdayWishMessage.hidden = false;
    elements.birthdayWishMessage.classList.remove("is-visible");
    void elements.birthdayWishMessage.offsetWidth;
    elements.birthdayWishMessage.classList.add("is-visible");

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
    state.fragranceStarted = false;
    state.fragranceRevealed = false;
    clearFragranceTimers();
    state.greeceNight = false;
    state.letterSunset = false;
    state.queueExpanded = false;
    state.spotifyPaused = true;
    state.initialPlaybackRequested = false;
    elements.letterContent.replaceChildren();
    elements.chocolateTreat.classList.remove("is-bite-1", "is-bite-2", "is-bite-3");
    elements.chocolateBites.textContent = "Uma barra inteira esperando por você.";
    elements.snickersMessage.textContent = "";
    elements.snickersButton.textContent = "🍫 Dar uma mordida";
    elements.snickersButton.disabled = false;
    elements.scooterButton.classList.remove("is-riding");
    elements.fragrance.classList.remove("is-opening", "is-open", "is-revealed");
    elements.fragrance.removeAttribute("aria-busy");
    elements.fragranceLetter.classList.remove("is-open");
    elements.fragranceStart.hidden = false;
    elements.fragranceStart.disabled = false;
    elements.fragranceStart.setAttribute("aria-expanded", "false");
    elements.fragrancePrompt.hidden = true;
    elements.fragrancePrompt.classList.remove("is-visible", "is-revealed");
    elements.fragranceMessage.textContent = "";
    elements.fragranceReveal.textContent = "Clica aqui";
    elements.fragranceReveal.disabled = false;
    elements.greece.classList.remove("is-night", "is-beach-choice", "is-walk-choice", "is-photos-choice", "is-beach-arriving");
    elements.body.classList.remove("greece-night-mode");
    elements.greeceSunButton.setAttribute("aria-pressed", "false");
    elements.greeceSunHint.textContent = "Clique no sol";
    elements.greeceVisitMessage.setAttribute("aria-hidden", "true");
    elements.greeceResult.textContent = "Escolhe uma pequena aventura. E toca no sol para ver a Grécia de outro jeito.";
    elements.letter.classList.remove("is-sunset-theme");
    elements.body.classList.remove("sunset-site-mode");
    elements.letterSeaButton.setAttribute("aria-pressed", "false");
    elements.letterSeaHint.textContent = "Toque no mar";
    elements.birthdayWishMessage.hidden = true;
    elements.birthdayWishMessage.classList.remove("is-visible");
    elements.story.hidden = true;
    elements.player.hidden = true;
    elements.chapterProgress.hidden = true;
    if (state.spotifyController) {
      state.spotifyController.pause();
    }
    updateQueueInterface();
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

    elements.playlistPreviousButton.addEventListener("click", function () {
      moveSpotifyTrack(-1);
    });

    elements.playlistNextButton.addEventListener("click", function () {
      moveSpotifyTrack(1);
    });

    elements.playlistPlaybackButton.addEventListener("click", function () {
      toggleSpotifyPlayback();
    });

    elements.playlistQueueToggle.addEventListener("click", function () {
      togglePlaylistQueue();
    });

    elements.continueMusicButton.addEventListener("click", function () {
      selectSpotifyTrack(5, true);
    });

    elements.snickersButton.addEventListener("click", acceptSnickers);
    elements.scooterButton.addEventListener("click", runScooter);
    elements.fragranceStart.addEventListener("click", startFragranceSequence);
    elements.fragranceReveal.addEventListener("click", revealFragranceMessage);
    elements.greeceSunButton.addEventListener("click", toggleGreeceNight);
    elements.letterSeaButton.addEventListener("click", toggleLetterSeaTheme);
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
    clearLegacySpotifySession();
    setTextContent();
    renderMemories();
    renderPlaylist();
    updateQueueInterface();
    bindEvents();
    setupObservers();
    updateProgress(0);
    setupSpotifyEmbed().catch(function () {});
  }

  initialise();
}());
