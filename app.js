/* MARVEL MARATHON — clean app script */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const KEY = "marvelMarathonCompanionProgress";
  const universes = ["MCU", "X-Men", "Deadpool", "Fantastic Four", "Sony Spider-Man", "Other Marvel"];
  const symbols = {
    "MCU": "🛡️", "X-Men": "✖️", "Deadpool": "💥",
    "Fantastic Four": "🚀", "Sony Spider-Man": "🕷️", "Other Marvel": "🦸"
  };

  // [id, title, type, universe, story year, release year, priority, description]
  const catalog = [
    ["cap1","Captain America: The First Avenger","Movie","MCU",1943,2011,"essential","Steve Rogers' origin and the Tesseract."],
    ["captainmarvel","Captain Marvel","Movie","MCU",1995,2019,"recommended","Carol Danvers discovers her cosmic powers."],
    ["ironman","Iron Man","Movie","MCU",2010,2008,"essential","Tony Stark's origin."],
    ["hulk","The Incredible Hulk","Movie","MCU",2011,2008,"extra","Bruce Banner's early MCU story."],
    ["ironman2","Iron Man 2","Movie","MCU",2011,2010,"extra","Tony Stark faces new threats."],
    ["thor1","Thor","Movie","MCU",2011,2011,"recommended","Introduces Thor and Loki."],
    ["avengers1","The Avengers","Movie","MCU",2012,2012,"essential","The original Avengers assemble."],
    ["ironman3","Iron Man 3","Movie","MCU",2012,2013,"extra","Tony deals with the aftermath of New York."],
    ["thor2","Thor: The Dark World","Movie","MCU",2013,2013,"extra","The Aether and Infinity Stone history."],
    ["winter","Captain America: The Winter Soldier","Movie","MCU",2014,2014,"essential","A major turning point for S.H.I.E.L.D."],
    ["gotg1","Guardians of the Galaxy","Movie","MCU",2014,2014,"essential","Introduces the cosmic team."],
    ["gotg2","Guardians of the Galaxy Vol. 2","Movie","MCU",2014,2017,"recommended","Continues the Guardians' story."],
    ["ultron","Avengers: Age of Ultron","Movie","MCU",2015,2015,"essential","The Avengers face Ultron."],
    ["antman1","Ant-Man","Movie","MCU",2015,2015,"recommended","Introduces Scott Lang and the Quantum Realm."],
    ["civilwar","Captain America: Civil War","Movie","MCU",2016,2016,"essential","The Avengers are divided."],
    ["blackwidow","Black Widow","Movie","MCU",2016,2021,"recommended","Natasha's story after Civil War."],
    ["blackpanther","Black Panther","Movie","MCU",2016,2018,"recommended","Introduces Wakanda."],
    ["homecoming","Spider-Man: Homecoming","Movie","MCU",2016,2017,"recommended","Peter Parker's early MCU story."],
    ["doctorstrange1","Doctor Strange","Movie","MCU",2016,2016,"essential","Introduces the mystic arts."],
    ["ragnarok","Thor: Ragnarok","Movie","MCU",2017,2017,"essential","Leads into Infinity War."],
    ["infinity","Avengers: Infinity War","Movie","MCU",2018,2018,"essential","The Infinity Saga reaches its turning point."],
    ["antmanwasp","Ant-Man and the Wasp","Movie","MCU",2018,2018,"recommended","A story linked to the Quantum Realm."],
    ["endgame","Avengers: Endgame","Movie","MCU",2023,2019,"essential","The culmination of the Infinity Saga."],
    ["wandavision","WandaVision","Series","MCU",2023,2021,"essential","Wanda and Vision after Endgame."],
    ["falcon","The Falcon and the Winter Soldier","Series","MCU",2024,2021,"recommended","Sam Wilson's path toward the shield."],
    ["shangchi","Shang-Chi and the Legend of the Ten Rings","Movie","MCU",2024,2021,"recommended","Introduces Shang-Chi."],
    ["farfromhome","Spider-Man: Far From Home","Movie","MCU",2024,2019,"recommended","Peter's story after Endgame."],
    ["nowayhome","Spider-Man: No Way Home","Movie","MCU",2024,2021,"essential","A major multiverse crossover."],
    ["multiverse","Doctor Strange in the Multiverse of Madness","Movie","MCU",2025,2022,"essential","Explores alternate realities."],
    ["hawkeye","Hawkeye","Series","MCU",2024,2021,"extra","Introduces Kate Bishop."],
    ["msmarvel","Ms. Marvel","Series","MCU",2025,2022,"recommended","Introduces Kamala Khan."],
    ["wakanda2","Black Panther: Wakanda Forever","Movie","MCU",2025,2022,"recommended","Continues Wakanda's story."],
    ["quantumania","Ant-Man and the Wasp: Quantumania","Movie","MCU",2026,2023,"recommended","A multiverse-era story."],
    ["gotg3","Guardians of the Galaxy Vol. 3","Movie","MCU",2026,2023,"recommended","The Guardians face a personal mission."],
    ["marvels","The Marvels","Movie","MCU",2026,2023,"recommended","Carol, Monica and Kamala team up."],
    ["bravenewworld","Captain America: Brave New World","Movie","MCU",2027,2025,"essential","Sam Wilson's Captain America story."],
    ["thunderbolts","Thunderbolts*","Movie","MCU",2027,2025,"essential","A new team of antiheroes."],
    ["loki1","Loki — Season 1","Series","MCU",null,2021,"essential","The TVA story takes place outside ordinary time."],
    ["loki2","Loki — Season 2","Series","MCU",null,2023,"essential","Continues the TVA story."],
    ["whatif","What If...?","Animated Series","MCU",null,2021,"recommended","Animated alternate-reality stories."],
    ["marvelzombies","Marvel Zombies","Animated Series","MCU",null,2025,"extra","An animated undead multiverse story."],
    ["xmenorigins","X-Men Origins: Wolverine","Movie","X-Men",1845,2009,"extra","Wolverine's story begins in the 19th century."],
    ["firstclass","X-Men: First Class","Movie","X-Men",1962,2011,"recommended","A key origin story for the Fox X-Men."],
    ["daysfuture","X-Men: Days of Future Past","Movie","X-Men",1973,2014,"recommended","Moves between 1973 and a dystopian future."],
    ["apocalypse","X-Men: Apocalypse","Movie","X-Men",1983,2016,"extra","The younger X-Men face Apocalypse."],
    ["darkphoenix","Dark Phoenix","Movie","X-Men",1992,2019,"extra","Jean Grey's power changes everything."],
    ["xmen1","X-Men","Movie","X-Men",2000,2000,"recommended","The original Fox X-Men team."],
    ["xmen2","X2: X-Men United","Movie","X-Men",2003,2003,"recommended","Continues the original X-Men story."],
    ["laststand","X-Men: The Last Stand","Movie","X-Men",2006,2006,"extra","The original trilogy continues."],
    ["wolverine","The Wolverine","Movie","X-Men",2013,2013,"extra","Logan travels to Japan."],
    ["logan","Logan","Movie","X-Men",2029,2017,"recommended","A future Wolverine story."],
    ["deadpool1","Deadpool","Movie","Deadpool",2016,2016,"recommended","Introduces Wade Wilson."],
    ["deadpool2","Deadpool 2","Movie","Deadpool",2018,2018,"recommended","Continues Wade's story."],
    ["deadpoolwolverine","Deadpool & Wolverine","Movie","Deadpool",null,2024,"essential","A TVA and multiverse crossover."],
    ["fantasticfour","The Fantastic Four: First Steps","Movie","Fantastic Four",1965,2025,"essential","A separate retro-futurist universe."],
    ["spiderman1","Spider-Man (Raimi)","Movie","Sony Spider-Man",2002,2002,"extra","The Raimi Spider-Man universe."],
    ["spiderman2","Spider-Man 2 (Raimi)","Movie","Sony Spider-Man",2004,2004,"extra","Continues the Raimi trilogy."],
    ["spiderman3","Spider-Man 3 (Raimi)","Movie","Sony Spider-Man",2007,2007,"extra","Completes the Raimi trilogy."],
    ["amazing1","The Amazing Spider-Man","Movie","Sony Spider-Man",2012,2012,"extra","A separate Spider-Man universe."],
    ["amazing2","The Amazing Spider-Man 2","Movie","Sony Spider-Man",2014,2014,"extra","Continues Andrew Garfield's story."],
    ["spiderverse","Spider-Man: Into the Spider-Verse","Animated Movie","Sony Spider-Man",2018,2018,"essential","Miles Morales enters the Spider-Verse."],
    ["spiderverse2","Spider-Man: Across the Spider-Verse","Animated Movie","Sony Spider-Man",2018,2023,"essential","Miles travels across Spider-people's worlds."],
    ["venom1","Venom","Movie","Sony Spider-Man",2018,2018,"recommended","Eddie Brock bonds with a symbiote."],
    ["venom2","Venom: Let There Be Carnage","Movie","Sony Spider-Man",2021,2021,"recommended","Venom faces Carnage."],
    ["blade98","Blade","Movie","Other Marvel",1998,1998,"recommended","The vampire hunter's first film."],
    ["blade2","Blade II","Movie","Other Marvel",2002,2002,"extra","Blade returns."],
    ["daredevil03","Daredevil","Movie","Other Marvel",2003,2003,"extra","Matt Murdock's early film adaptation."],
    ["hulk03","Hulk","Movie","Other Marvel",2003,2003,"extra","A standalone Hulk interpretation."],
    ["ff05","Fantastic Four","Movie","Other Marvel",2005,2005,"extra","The 2000s team origin film."],
    ["xmen97","X-Men '97","Animated Series","X-Men",1997,2024,"essential","Continuation of the classic animated X-Men."],
    ["spiderman90","Spider-Man: The Animated Series","Animated Series","Other Marvel",1994,1994,"recommended","The 1990s animated Spider-Man series."]
  ];   const characters = [
    ["Tony Stark","Iron Man","Genius inventor and armored Avenger.","MCU","Technology, powered armor","Avengers"],
    ["Steve Rogers","Captain America","Super-soldier and wartime hero.","MCU","Enhanced strength, shield mastery","Avengers"],
    ["Thor Odinson","Thor","Asgardian thunder god.","MCU","Thunder, superhuman strength","Avengers"],
    ["Natasha Romanoff","Black Widow","Former spy and elite operative.","MCU","Espionage, combat, strategy","Avengers"],
    ["Bruce Banner","Hulk","Scientist who transforms into the Hulk.","MCU","Gamma-powered strength and regeneration","Avengers"],
    ["Clint Barton","Hawkeye","Master archer and longtime Avenger.","MCU","Archery, tactics","Avengers"],
    ["Carol Danvers","Captain Marvel","Cosmic-powered hero and former pilot.","MCU","Energy projection, flight","Avengers"],
    ["T'Challa","Black Panther","King of Wakanda and protector.","MCU","Enhanced abilities, vibranium suit","Wakanda"],
    ["Shuri","Black Panther","Inventor and Wakandan leader.","MCU","Technology, tactical combat","Wakanda"],
    ["Peter Parker","Spider-Man","Queens teenager with spider-like abilities.","MCU","Wall-crawling, spider-sense, strength","Avengers"],
    ["Stephen Strange","Doctor Strange","Master of the mystic arts.","MCU","Sorcery, portals, astral projection","Midnight Sons"],
    ["Wanda Maximoff","Scarlet Witch","Powerful wielder of chaos magic.","MCU","Chaos magic, reality alteration","Avengers"],
    ["Loki Laufeyson","Loki","God of Mischief whose story spans timelines.","MCU","Illusions, sorcery","Asgard"],
    ["Sam Wilson","Captain America","Avenger who takes up the shield.","MCU","Flight technology, leadership","Avengers"],
    ["Bucky Barnes","Winter Soldier","Former assassin and ally of Steve.","MCU","Enhanced strength, cybernetic arm","Thunderbolts"],
    ["Scott Lang","Ant-Man","Former thief turned size-changing hero.","MCU","Size manipulation","Avengers"],
    ["Wade Wilson","Deadpool","Wisecracking mercenary with a healing factor.","Deadpool","Regeneration, combat","X-Force"],
    ["Logan","Wolverine","Mutant with claws and a healing factor.","X-Men","Healing, adamantium claws","X-Men"],
    ["Charles Xavier","Professor X","Telepath and founder of the X-Men.","X-Men","Telepathy","X-Men"],
    ["Erik Lehnsherr","Magneto","Mutant who controls magnetic fields.","X-Men","Magnetism","X-Men"],
    ["Jean Grey","Jean Grey / Phoenix","Powerful telepath and telekinetic.","X-Men","Telepathy, telekinesis","X-Men"],
    ["Ororo Munroe","Storm","Weather-controlling X-Men leader.","X-Men","Weather manipulation","X-Men"],
    ["Reed Richards","Mister Fantastic","Brilliant scientist and Fantastic Four leader.","Fantastic Four","Elasticity, intellect","Fantastic Four"],
    ["Sue Storm","Invisible Woman","Founding member of the Fantastic Four.","Fantastic Four","Invisibility, force fields","Fantastic Four"],
    ["Johnny Storm","Human Torch","Hero who can ignite into flame.","Fantastic Four","Pyrokinesis, flight","Fantastic Four"],
    ["Ben Grimm","The Thing","Pilot transformed into a rocky powerhouse.","Fantastic Four","Super strength, durability","Fantastic Four"],
    ["Eddie Brock","Venom","Journalist bonded with an alien symbiote.","Sony Spider-Man","Symbiote abilities, regeneration","Symbiotes"],
    ["Miles Morales","Spider-Man","Brooklyn teen who becomes Spider-Man.","Sony Spider-Man","Spider abilities, camouflage","Spider-Verse"],
    ["Wilson Fisk","Kingpin","Powerful crime boss.","MCU","Strategy, strength","Street-level"],
    ["Thanos","Thanos","Titan seeking to impose his vision on existence.","MCU","Strength, strategy, Infinity Stones","Black Order"]
  ];

  const teams = [
    ["Avengers","Earth's mightiest heroes","Iron Man, Captain America, Thor, Hulk, Black Widow, Hawkeye and allies."],
    ["X-Men","Mutant superhero team","Professor X, Cyclops, Jean Grey, Storm, Wolverine and many more."],
    ["Fantastic Four","Marvel's first family","Reed Richards, Sue Storm, Johnny Storm and Ben Grimm."],
    ["Guardians of the Galaxy","Cosmic misfits turned heroes","Star-Lord, Gamora, Drax, Rocket, Groot and their allies."],
    ["Defenders","Street-level alliance","Daredevil, Jessica Jones, Luke Cage and Iron Fist."],
    ["Thunderbolts","Unconventional team","A changing roster of antiheroes and operatives."],
    ["Young Avengers","Next-generation heroes","A developing group of younger heroes across Marvel stories."],
    ["Midnight Sons","Supernatural heroes","Doctor Strange and other dark defenders."],
    ["Sinister Six","Spider-Man villains","A rotating alliance of Spider-Man's greatest enemies."],
    ["X-Force","Mutant black-ops team","A covert and aggressive mutant team."]
  ];

  let watched = new Set();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(saved)) watched = new Set(saved);
  } catch (_) { watched = new Set(); }

  let currentMode = "all";
  let currentView = "home";

  function updateStats() {
    const count = watched.size;
    const pct = Math.round(count / catalog.length * 100);
    if ($("progressPct")) $("progressPct").textContent = pct + "%";
    if ($("progressFill")) $("progressFill").style.width = pct + "%";
    if ($("progressText")) $("progressText").textContent = `${count} of ${catalog.length} watched`;
    if ($("watchCount")) $("watchCount").textContent = `${count} completed`;
  }

  function saveProgress() {
    try { localStorage.setItem(KEY, JSON.stringify([...watched])); } catch (_) {}
    updateStats();
    renderWatchlist();
  }

  function setView(view) {
    if (!$(view)) return;
    currentView = view;
    document.querySelectorAll(".view").forEach(el => el.classList.toggle("active", el.id === view));
    document.querySelectorAll("[data-view]").forEach(el => el.classList.toggle("active", el.dataset.view === view));
    if (view === "library") renderItems();
    if (view === "timeline") renderTimeline();
    if (view === "watchlist") renderWatchlist();
    if (view === "characters") renderCharacters();
    if (view === "teams") renderTeams();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function sortList(list, order) {
    return list.sort((a,b) => order === "release"
      ? a[5] - b[5]
      : (a[4] === null ? 1 : b[4] === null ? -1 : a[4] - b[4]));
  }

  function makeItem(item, compact = false) {
    const row = document.createElement("div");
    row.className = "item" + (watched.has(item[0]) ? " done" : "");
    const poster = document.createElement("div");
    poster.className = "poster";
    poster.textContent = symbols[item[3]] || "🎬";
    const main = document.createElement("div");
    main.className = "item-main";
    const title = document.createElement("div");
    title.className = "item-title";
    title.textContent = item[1];
    const meta = document.createElement("div");
    meta.className = "item-meta";
    meta.textContent = `${item[3]} · ${item[2]} · ${item[4] === null ? "Outside normal time" : "Story setting " + item[4]}`;
    main.append(title, meta);
    if (!compact) {
      const note = document.createElement("div");
      note.className = "item-note";
      note.textContent = item[7];
      main.append(note);
    }
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item[6] === "essential" ? "Essential" : item[6] === "recommended" ? "Recommended" : "Extra";
    const details = document.createElement("button");
    details.className = "btn";
    details.type = "button";
    details.textContent = "Trailer";
    details.addEventListener("click", () => {
      const url = "https://www.youtube.com/results?search_query=" + encodeURIComponent(item[1] + " official trailer");
      window.open(url, "_blank", "noopener");
    });
    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check";
    check.checked = watched.has(item[0]);
    check.setAttribute("aria-label", "Mark " + item[1] + " watched");
    check.addEventListener("change", () => {
      if (check.checked) watched.add(item[0]); else watched.delete(item[0]);
      saveProgress();
      if (currentView === "library") renderItems();
      if (currentView === "timeline") renderTimeline();
    });
    row.append(poster, main, chip, details, check);
    return row;
  }   function renderItems() {
    if (!$("items")) return;
    const query = ($("search")?.value || "").toLowerCase().trim();
    const universe = $("filterUniverse")?.value || "all";
    const order = $("sort")?.value || "story";
    const list = catalog.filter(item =>
      (currentMode === "all" ||
       (currentMode === "essential" && item[6] === "essential") ||
       (currentMode === "unwatched" && !watched.has(item[0]))) &&
      (universe === "all" || item[3] === universe) &&
      (!query || item[1].toLowerCase().includes(query))
    );
    sortList(list, order);
    $("resultCount").textContent = `${list.length} titles`;
    $("items").replaceChildren();
    if (!list.length) { $("items").textContent = "No titles found."; return; }
    list.forEach(item => $("items").append(makeItem(item)));
  }

  function renderTimeline() {
    if (!$("timelineItems")) return;
    const universe = $("timelineUniverse")?.value || "all";
    const order = $("timelineSort")?.value || "story";
    const list = catalog.filter(item => universe === "all" || item[3] === universe);
    sortList(list, order);
    $("timelineItems").replaceChildren();
    list.forEach(item => $("timelineItems").append(makeItem(item, true)));
  }

  function renderWatchlist() {
    if (!$("watchItems")) return;
    const list = catalog.filter(item => watched.has(item[0]));
    $("watchCount").textContent = `${list.length} completed`;
    $("watchItems").replaceChildren();
    if (!list.length) {
      const empty = document.createElement("div");
      empty.className = "note";
      empty.style.padding = "20px";
      empty.textContent = "You have not marked anything watched yet. Explore the library to get started.";
      $("watchItems").append(empty);
      return;
    }
    list.forEach(item => $("watchItems").append(makeItem(item, true)));
  }

  function renderCharacters() {
    if (!$("characterItems")) return;
    const query = ($("characterSearch")?.value || "").toLowerCase().trim();
    const universe = $("characterUniverse")?.value || "all";
    const list = characters.filter(c =>
      (universe === "all" || c[3] === universe) && c.join(" ").toLowerCase().includes(query)
    );
    $("characterCount").textContent = `${list.length} characters`;
    $("characterItems").replaceChildren();
    list.forEach(c => {
      const card = document.createElement("article");
      card.className = "character-card";
      const heading = document.createElement("h3");
      heading.textContent = c[0] + " ";
      const alias = document.createElement("span");
      alias.className = "chip";
      alias.textContent = c[1];
      heading.append(alias);
      const bio = document.createElement("p");
      bio.textContent = c[2];
      const info = document.createElement("p");
      info.textContent = `Universe: ${c[3]} · Powers / skills: ${c[4]}`;
      const affiliation = document.createElement("p");
      affiliation.textContent = `Affiliation: ${c[5]}`;
      card.append(heading, bio, info, affiliation);
      $("characterItems").append(card);
    });
  }

  function renderTeams() {
    if (!$("teamItems")) return;
    $("teamItems").replaceChildren();
    teams.forEach(team => {
      const card = document.createElement("article");
      card.className = "card";
      const emoji = document.createElement("div");
      emoji.className = "emoji";
      emoji.textContent = "✦";
      const title = document.createElement("h3");
      title.textContent = team[0];
      const description = document.createElement("p");
      description.textContent = team[1];
      const members = document.createElement("p");
      members.style.marginTop = "8px";
      members.textContent = team[2];
      card.append(emoji, title, description, members);
      $("teamItems").append(card);
    });
  }

  function buildUniverseCards() {
    universes.forEach(universe => {
      const count = catalog.filter(item => item[3] === universe).length;
      const done = catalog.filter(item => item[3] === universe && watched.has(item[0])).length;
      const homeCard = document.createElement("button");
      homeCard.type = "button";
      homeCard.className = "card";
      const emoji = document.createElement("div");
      emoji.className = "emoji";
      emoji.textContent = symbols[universe];
      const title = document.createElement("h3");
      title.textContent = universe;
      const info = document.createElement("p");
      info.textContent = `${done}/${count} watched · Explore titles`;
      homeCard.append(emoji, title, info);
      homeCard.addEventListener("click", () => {
        setView("library");
        $("filterUniverse").value = universe;
        currentMode = "all";
        renderItems();
      });
      $("homeUniverses")?.append(homeCard);

      const universeCard = document.createElement("button");
      universeCard.type = "button";
      universeCard.className = "universe";
      const uEmoji = document.createElement("span");
      uEmoji.style.fontSize = "25px";
      uEmoji.textContent = symbols[universe];
      const uTitle = document.createElement("b");
      uTitle.textContent = universe;
      const uInfo = document.createElement("small");
      uInfo.textContent = `${count} movies and shows`;
      universeCard.append(uEmoji, uTitle, uInfo);
      universeCard.addEventListener("click", () => {
        setView("library");
        $("filterUniverse").value = universe;
        currentMode = "all";
        renderItems();
      });
      $("universeGrid")?.append(universeCard);
    });
  }

  function countdown() {
    const target = new Date("2026-12-17T00:00:00+11:00");
    const diff = Math.max(0, target - new Date());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff % 86400000 / 3600000);
    const minutes = Math.floor(diff % 3600000 / 60000);
    if ($("countdown")) {
      $("countdown").innerHTML =
        `<div class="countbox"><strong>${days}</strong><span>DAYS</span></div>` +
        `<div class="countbox"><strong>${hours}</strong><span>HOURS</span></div>` +
        `<div class="countbox"><strong>${minutes}</strong><span>MINUTES</span></div>`;
    }
  }

  function bindEvents() {
    document.querySelectorAll("[data-view]").forEach(button =>
      button.addEventListener("click", () => setView(button.dataset.view))
    );
    document.querySelectorAll("[data-goto]").forEach(button =>
      button.addEventListener("click", () => setView(button.dataset.goto))
    );
    document.querySelectorAll("[data-mode]").forEach(button =>
      button.addEventListener("click", () => {
        currentMode = button.dataset.mode;
        document.querySelectorAll("[data-mode]").forEach(other =>
          other.classList.toggle("primary", other === button)
        );
        renderItems();
      })
    );
    ["search", "sort", "filterUniverse"].forEach(id =>
      $(id)?.addEventListener(id === "search" ? "input" : "change", renderItems)
    );
    ["timelineSort", "timelineUniverse"].forEach(id =>
      $(id)?.addEventListener("change", renderTimeline)
    );
    $("characterSearch")?.addEventListener("input", renderCharacters);
    $("characterUniverse")?.addEventListener("change", renderCharacters);

    $("exportBtn")?.addEventListener("click", () => {
      const blob = new Blob([
        JSON.stringify({ watched: [...watched], exportedAt: new Date().toISOString() }, null, 2)
      ], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "marvel-marathon-progress.json";
      link.click();
      URL.revokeObjectURL(url);
    });

    $("resetBtn")?.addEventListener("click", () => {
      if (window.confirm("Reset all watch progress on this device?")) {
        watched.clear();
        saveProgress();
        renderItems();
      }
    });
  }

  function init() {
    bindEvents();
    buildUniverseCards();
    countdown();
    window.setInterval(countdown, 60000);
    updateStats();
    renderItems();
    renderTimeline();
    renderWatchlist();
    renderCharacters();
    renderTeams();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
