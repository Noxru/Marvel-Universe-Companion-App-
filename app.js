/* MARVEL MARATHON — Complete Companion */
(() => {
  "use strict";

  const $ = id => document.getElementById(id);
  const KEY = "marvelMarathonCompanionProgress";

  const universes = [
    "MCU",
    "X-Men",
    "Deadpool",
    "Fantastic Four",
    "Sony Spider-Man",
    "Other Marvel"
  ];

  const symbols = {
    "MCU": "🛡️",
    "X-Men": "✖️",
    "Deadpool": "💥",
    "Fantastic Four": "🚀",
    "Sony Spider-Man": "🕷️",
    "Other Marvel": "🦸"
  };

  /*
   * CATALOG FORMAT:
   * [id, title, type, universe, storyYear,
   *  releaseYear, priority, description]
   *
   * Separate universes are not one shared timeline.
   * Null story years mean chronology is uncertain
   * or the story exists outside ordinary time.
   */

  const catalog = [
    ["cap1","Captain America: The First Avenger","Movie","MCU",1943,2011,"essential","Steve Rogers becomes Captain America."],
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
    ["hawkeye","Hawkeye","Series","MCU",2024,2021,"extra","Introduces Kate Bishop."],
    ["multiverse","Doctor Strange in the Multiverse of Madness","Movie","MCU",2025,2022,"essential","Explores alternate realities."],
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
    ["xmen97","X-Men '97","Animated Series","X-Men",1997,2024,"essential","Continuation of the classic animated X-Men."],

    ["deadpool1","Deadpool","Movie","Deadpool",2016,2016,"recommended","Introduces Wade Wilson."],
    ["deadpool2","Deadpool 2","Movie","Deadpool",2018,2018,"recommended","Continues Wade's story."],
    ["deadpoolwolverine","Deadpool & Wolverine","Movie","Deadpool",null,2024,"essential","A TVA and multiverse crossover."],

    ["fantasticfour","The Fantastic Four: First Steps","Movie","Fantastic Four",1965,2025,"essential","A separate retro-futurist universe."],

    ["spiderman1","Spider-Man","Movie","Sony Spider-Man",2002,2002,"extra","The Raimi Spider-Man universe."],
    ["spiderman2","Spider-Man 2","Movie","Sony Spider-Man",2004,2004,"extra","Continues the Raimi trilogy."],
    ["spiderman3","Spider-Man 3","Movie","Sony Spider-Man",2007,2007,"extra","Completes the Raimi trilogy."],
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
    ["spiderman90","Spider-Man: The Animated Series","Animated Series","Other Marvel",1994,1994,"recommended","The 1990s animated Spider-Man series."]
  ];   // CHARACTER DATABASE
  // [real name, superhero name, biography, universe,
  //  powers, affiliations, allies, enemies, appearances]

  const characters = [
    ["Tony Stark","Iron Man","Genius inventor, billionaire and founding Avenger.","MCU","Powered armor, engineering, artificial intelligence","Avengers","Pepper Potts, James Rhodes, Steve Rogers","Thanos, Ultron","Iron Man, Avengers films, Civil War, Endgame"],
    ["Steve Rogers","Captain America","A World War II soldier enhanced by the super-soldier serum.","MCU","Enhanced strength, agility, shield mastery","Avengers","Bucky Barnes, Sam Wilson, Peggy Carter","Red Skull, HYDRA","Captain America films, Avengers films"],
    ["Thor Odinson","Thor","Asgardian prince and God of Thunder.","MCU","Thunder, lightning, superhuman strength","Avengers","Loki, Jane Foster, Valkyrie","Hela, Thanos","Thor films, Avengers films"],
    ["Natasha Romanoff","Black Widow","Former Russian spy who became an Avenger.","MCU","Espionage, martial arts, tactical skills","Avengers","Clint Barton, Steve Rogers, Yelena Belova","Dreykov, Taskmaster","Black Widow, Avengers films"],
    ["Bruce Banner","Hulk","Scientist whose exposure to gamma radiation transformed him.","MCU","Gamma-powered strength, regeneration","Avengers","Tony Stark, Thor","Abomination, Thanos","Hulk, Avengers films"],
    ["Clint Barton","Hawkeye","Highly skilled archer and former S.H.I.E.L.D. agent.","MCU","Archery, combat, tactical skills","Avengers","Natasha Romanoff, Kate Bishop","Tracksuit Mafia","Avengers films, Hawkeye"],
    ["Carol Danvers","Captain Marvel","Former Air Force pilot with extraordinary cosmic powers.","MCU","Energy projection, flight, superhuman strength","Avengers","Monica Rambeau, Kamala Khan","Yon-Rogg, Kree forces","Captain Marvel, The Marvels, Avengers films"],
    ["T'Challa","Black Panther","King of Wakanda and protector of its people.","MCU","Enhanced abilities, vibranium technology","Wakanda","Shuri, Nakia, Okoye","Killmonger, Klaue","Black Panther, Civil War, Infinity War, Endgame"],
    ["Shuri","Black Panther","Wakandan scientist, inventor and eventual Black Panther.","MCU","Technology, combat, tactical intelligence","Wakanda","T'Challa, Okoye, Nakia","Namor, Talokan forces","Black Panther films"],
    ["Peter Parker","Spider-Man","A young New Yorker who gains spider-like abilities.","MCU","Wall crawling, spider-sense, enhanced strength","Avengers","Ned Leeds, MJ, Tony Stark","Green Goblin, Vulture, Mysterio","Spider-Man MCU films, Civil War, Infinity War, Endgame"],
    ["Stephen Strange","Doctor Strange","Former surgeon who becomes a Master of the Mystic Arts.","MCU","Sorcery, portals, astral projection","Masters of the Mystic Arts","Wong, America Chavez","Dormammu, Kaecilius","Doctor Strange films, Avengers films"],
    ["Wanda Maximoff","Scarlet Witch","Powerful magic wielder whose abilities reshape reality.","MCU","Chaos magic, telekinesis, reality alteration","Former Avenger","Vision, Pietro Maximoff","Agatha Harkness, herself","Age of Ultron, Civil War, WandaVision, Multiverse of Madness"],
    ["Loki Laufeyson","Loki","God of Mischief whose journey crosses timelines.","MCU","Illusions, sorcery, shapeshifting","Asgard, TVA","Thor, Mobius, Sylvie","Thanos, He Who Remains","Thor films, Avengers films, Loki"],
    ["Sam Wilson","Captain America","Former pararescue airman who becomes Captain America.","MCU","Flight technology, combat, leadership","Avengers","Steve Rogers, Bucky Barnes","Red Hulk, HYDRA","Captain America films, Falcon and Winter Soldier"],
    ["Bucky Barnes","Winter Soldier","Steve Rogers' childhood friend, brainwashed into an assassin.","MCU","Enhanced strength, combat, cybernetic arm","Avengers, Thunderbolts","Steve Rogers, Sam Wilson","HYDRA, Zemo","Captain America films, Avengers films, Thunderbolts"],
    ["Scott Lang","Ant-Man","Former thief who becomes a size-changing superhero.","MCU","Size manipulation, Quantum Realm technology","Avengers","Hope van Dyne, Cassie Lang","Yellowjacket, Kang","Ant-Man films, Avengers films"],
    ["Wade Wilson","Deadpool","Mercenary with an unpredictable personality and healing factor.","Deadpool","Regeneration, combat, weapons expertise","X-Force","Colossus, Negasonic Teenage Warhead, Wolverine","Ajax, various enemies","Deadpool films, Deadpool & Wolverine"],
    ["Logan","Wolverine","Mutant with a powerful healing factor and adamantium claws.","X-Men","Regeneration, enhanced senses, claws","X-Men","Professor X, Storm, Jean Grey","Sabretooth, William Stryker","X-Men films, Wolverine films, Logan, Deadpool & Wolverine"],
    ["Charles Xavier","Professor X","Powerful telepath and founder of the X-Men.","X-Men","Telepathy, mind control","X-Men","Magneto, Jean Grey, Storm","Sentinels, various enemies","X-Men films, X-Men: First Class, Logan"],
    ["Erik Lehnsherr","Magneto","Mutant who believes mutants must protect themselves from humanity.","X-Men","Magnetic field manipulation","Brotherhood of Mutants","Charles Xavier, Mystique","Humans, Sentinels","X-Men films"],
    ["Jean Grey","Jean Grey / Phoenix","Powerful mutant with extraordinary psychic abilities.","X-Men","Telepathy, telekinesis, Phoenix Force","X-Men","Cyclops, Storm, Professor X","Dark Phoenix, Sentinels","X-Men films, Dark Phoenix"],
    ["Ororo Munroe","Storm","Mutant capable of controlling the weather.","X-Men","Weather manipulation, flight","X-Men","Jean Grey, Wolverine, Professor X","Apocalypse, Sentinels","X-Men films, X-Men: The Animated Series"],
    ["Reed Richards","Mister Fantastic","Brilliant scientist and leader of the Fantastic Four.","Fantastic Four","Elasticity, genius-level intelligence","Fantastic Four","Sue Storm, Johnny Storm, Ben Grimm","Doctor Doom","Fantastic Four adaptations"],
    ["Sue Storm","Invisible Woman","Founding member of the Fantastic Four and a powerful hero.","Fantastic Four","Invisibility, force fields","Fantastic Four","Reed Richards, Johnny Storm, Ben Grimm","Doctor Doom","Fantastic Four adaptations"],
    ["Johnny Storm","Human Torch","Reed Richards' brother who can transform into living flame.","Fantastic Four","Pyrokinesis, flight","Fantastic Four","Sue Storm, Reed Richards, Ben Grimm","Doctor Doom","Fantastic Four adaptations"],
    ["Ben Grimm","The Thing","Pilot transformed into a powerful rock-like being.","Fantastic Four","Super strength, durability","Fantastic Four","Reed Richards, Sue Storm, Johnny Storm","Doctor Doom","Fantastic Four adaptations"],
    ["Eddie Brock","Venom","Journalist bonded with an alien symbiote.","Sony Spider-Man","Symbiote abilities, regeneration, superhuman strength","Symbiotes","Venom, Mrs. Chen","Carnage, Riot","Venom films"],
    ["Miles Morales","Spider-Man","Brooklyn teenager who becomes a different kind of Spider-Man.","Sony Spider-Man","Spider abilities, camouflage, bio-electric venom","Spider-Verse","Peter B. Parker, Gwen Stacy","Kingpin, Spot","Spider-Verse films"],
    ["Wilson Fisk","Kingpin","Powerful crime boss who controls criminal networks.","MCU","Strength, strategy, intimidation","Criminal empire","Various criminal associates","Daredevil, Spider-Man","Daredevil, Hawkeye, Echo"],
    ["Thanos","Thanos","Titan who seeks to reshape existence according to his beliefs.","MCU","Superhuman strength, strategy, Infinity Stones","Black Order","Ebony Maw, Black Order","Avengers, Guardians","Guardians of the Galaxy, Avengers films"]
  ];

  // TEAM DATABASE
  // [name, description, history, roster,
  //  rivals, screen appearances]

  const teams = [
    ["Avengers","Earth's Mightiest Heroes","A team assembled to defend Earth from threats no individual hero could face.","Iron Man, Captain America, Thor, Hulk, Black Widow, Hawkeye and many allies.","Thanos, Ultron, Loki","The Avengers, Age of Ultron, Infinity War, Endgame"],
    ["X-Men","Mutant superhero team","Founded by Professor X to protect mutants and humans while fighting prejudice.","Professor X, Cyclops, Jean Grey, Storm, Wolverine, Beast and others.","Brotherhood of Mutants, Sentinels, Apocalypse","X-Men films, animated series, X-Men '97"],
    ["Fantastic Four","Marvel's First Family","A group of explorers transformed by cosmic radiation who become superheroes.","Reed Richards, Sue Storm, Johnny Storm and Ben Grimm.","Doctor Doom, Galactus","Fantastic Four films and adaptations"],
    ["Guardians of the Galaxy","Cosmic misfits turned heroes","A group of unlikely allies who protect the galaxy from powerful threats.","Star-Lord, Gamora, Drax, Rocket, Groot and Mantis.","Ronan, Ego, High Evolutionary","Guardians of the Galaxy trilogy, Avengers films"],
    ["Defenders","Street-level alliance","A group of New York heroes who join forces against threats to their city.","Daredevil, Jessica Jones, Luke Cage and Iron Fist.","The Hand, Kingpin","The Defenders, Daredevil, Jessica Jones, Luke Cage, Iron Fist"],
    ["Thunderbolts","Unconventional team","A changing group of antiheroes and operatives brought together for dangerous missions.","Yelena Belova, Bucky Barnes, Red Guardian, Ghost, U.S. Agent and others.","Various criminal and government threats","Thunderbolts*"],
    ["Young Avengers","Next generation of heroes","A younger generation of heroes inspired by the original Avengers.","Kate Bishop, Cassie Lang, America Chavez, Wiccan and others.","Various villains","Marvel screen introductions and related appearances"],
    ["Midnight Sons","Supernatural defenders","Heroes who confront supernatural and mystical threats.","Doctor Strange, Blade, Ghost Rider, Moon Knight and others.","Demons, vampires and supernatural enemies","Various Marvel adaptations"],
    ["Sinister Six","Spider-Man's enemies","A rotating alliance of villains united against Spider-Man.","Doctor Octopus, Vulture, Electro, Mysterio, Sandman and others.","Spider-Man","Spider-Man adaptations"],
    ["X-Force","Mutant black-ops team","A covert mutant team that often uses more aggressive tactics.","Deadpool, Cable, Domino and other mutants.","Various mutant enemies","Deadpool 2"]
  ];

  // END OF CHARACTER AND TEAM DATA   // WATCH PROGRESS
  // CHARACTER IMAGE LOADER
const characterImageCache = new Map();

async function getCharacterImage(name) {
  if (characterImageCache.has(name)) {
    return characterImageCache.get(name);
  }

  const request = fetch(
    "https://en.wikipedia.org/api/rest_v1/page/summary/" +
    encodeURIComponent(name.replaceAll(" ", "_"))
  )
    .then(response => {
      if (!response.ok) return null;
      return response.json();
    })
    .then(data => data.thumbnail?.source || null)
    .catch(() => null);

  characterImageCache.set(name, request);
  return request;
}

function addProfileImage(container, name, alt) {
  const image = document.createElement("img");

  image.alt = alt;
  image.loading = "lazy";
  image.style.width = "100%";
  image.style.maxHeight = "260px";
  image.style.objectFit = "contain";
  image.style.borderRadius = "14px";
  image.style.marginBottom = "15px";

  container.prepend(image);

  getCharacterImage(name).then(source => {
    if (source) {
      image.src = source;
    } else {
      image.remove();
  let watched = new Set();

  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(saved)) watched = new Set(saved);
  } catch (error) {
    watched = new Set();
  }

  let currentMode = "all";
  let currentView = "home";

  // UPDATE PROGRESS DISPLAY
  function updateStats() {
    const count = watched.size;
    const percentage = Math.round((count / catalog.length) * 100);

    if ($("progressPct")) {
      $("progressPct").textContent = percentage + "%";
    }

    if ($("progressFill")) {
      $("progressFill").style.width = percentage + "%";
    }

    if ($("progressText")) {
      $("progressText").textContent =
        `${count} of ${catalog.length} watched`;
    }

    if ($("watchCount")) {
      $("watchCount").textContent = `${count} completed`;
    }
  }

  // SAVE WATCH PROGRESS
  function saveProgress() {
    try {
      localStorage.setItem(KEY, JSON.stringify([...watched]));
    } catch (error) {
      console.warn("Could not save progress.", error);
    }

    updateStats();
    renderWatchlist();
  }

  // CHANGE APP SECTION
  function setView(view) {
    if (!$(view)) return;

    currentView = view;

    document.querySelectorAll(".view").forEach(section => {
      section.classList.toggle("active", section.id === view);
    });

    document.querySelectorAll("[data-view]").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.view === view
      );
    });

    if (view === "library") renderItems();
    if (view === "timeline") renderTimeline();
    if (view === "watchlist") renderWatchlist();
    if (view === "characters") renderCharacters();
    if (view === "teams") renderTeams();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // SORT TITLES
  function sortList(list, order) {
    const universeOrder = [
      "MCU",
      "X-Men",
      "Deadpool",
      "Fantastic Four",
      "Sony Spider-Man",
      "Other Marvel"
    ];

    return list.sort((a, b) => {
      if (order === "universe") {
        const aUniverse = universeOrder.indexOf(a[3]);
        const bUniverse = universeOrder.indexOf(b[3]);

        if (aUniverse !== bUniverse) {
          return aUniverse - bUniverse;
        }
      }

      if (order === "release") {
        return a[5] - b[5];
      }

      if (a[4] === null && b[4] !== null) return 1;
      if (b[4] === null && a[4] !== null) return -1;

      return (a[4] ?? 0) - (b[4] ?? 0);
    });
  }

  // CREATE A MOVIE OR SERIES CARD
  function makeItem(item, compact = false) {
    const row = document.createElement("div");

    row.className =
      "item" + (watched.has(item[0]) ? " done" : "");

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

    meta.textContent =
      `${item[3]} · ${item[2]} · ` +
      (item[4] === null
        ? "Outside normal time / uncertain"
        : "Story setting " + item[4]);

    main.append(title, meta);

    if (!compact) {
      const description = document.createElement("div");
      description.className = "item-note";
      description.textContent = item[7];
      main.append(description);
    }

    const chip = document.createElement("span");
    chip.className = "chip";

    chip.textContent =
      item[6] === "essential"
        ? "Essential"
        : item[6] === "recommended"
        ? "Recommended"
        : "Extra";

    const trailer = document.createElement("button");
    trailer.className = "btn";
    trailer.type = "button";
    trailer.textContent = "Trailer";

    trailer.addEventListener("click", () => {
      const url =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(item[1] + " official trailer");

      window.open(url, "_blank", "noopener");
    });

    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "check";
    check.checked = watched.has(item[0]);

    check.setAttribute(
      "aria-label",
      "Mark " + item[1] + " watched"
    );

    check.addEventListener("change", () => {
      if (check.checked) {
        watched.add(item[0]);
      } else {
        watched.delete(item[0]);
      }

      saveProgress();

      if (currentView === "library") renderItems();
      if (currentView === "timeline") renderTimeline();
    });

    row.append(poster, main, chip, trailer, check);

    return row;
  }

  // FILTER AND DISPLAY MOVIES AND SERIES
  function renderItems() {
    if (!$("items")) return;

    const query =
      ($("search")?.value || "").toLowerCase().trim();

    const universe =
      $("filterUniverse")?.value || "all";

    const order =
      $("sort")?.value || "story";

    const list = catalog.filter(item => {
      const matchesMode =
        currentMode === "all" ||
        (currentMode === "essential" && item[6] === "essential") ||
        (currentMode === "unwatched" && !watched.has(item[0]));

      const matchesUniverse =
        universe === "all" || item[3] === universe;

      const matchesSearch =
        !query || item.join(" ").toLowerCase().includes(query);

      return matchesMode && matchesUniverse && matchesSearch;
    });

    sortList(list, order);

    if ($("resultCount")) {
      $("resultCount").textContent = `${list.length} titles`;
    }

    $("items").replaceChildren();

    if (!list.length) {
      $("items").textContent = "No titles found.";
      return;
    }

    list.forEach(item => {
      $("items").append(makeItem(item));
    });
  }

  // DISPLAY TIMELINE
  function renderTimeline() {
    if (!$("timelineItems")) return;

    const universe =
      $("timelineUniverse")?.value || "all";

    const order =
      $("timelineSort")?.value || "story";

    const list = catalog.filter(item =>
      universe === "all" || item[3] === universe
    );

    sortList(list, order);

    $("timelineItems").replaceChildren();

    list.forEach(item => {
      $("timelineItems").append(makeItem(item, true));
    });
  }

  // DISPLAY WATCHLIST
  function renderWatchlist() {
    if (!$("watchItems")) return;

    const list = catalog.filter(item =>
      watched.has(item[0])
    );

    if ($("watchCount")) {
      $("watchCount").textContent =
        `${list.length} completed`;
    }

    $("watchItems").replaceChildren();

    if (!list.length) {
      const empty = document.createElement("div");

      empty.className = "note";
      empty.style.padding = "20px";

      empty.textContent =
        "You have not marked anything watched yet. " +
        "Explore the library to get started.";

      $("watchItems").append(empty);
      return;
    }

    list.forEach(item => {
      $("watchItems").append(makeItem(item, true));
    });


    }
  });
}

  }   // CHARACTER PROFILES
  
function renderCharacters() {
  if (!$("characterItems")) return;

  const query =
    ($("characterSearch")?.value || "").toLowerCase().trim();

  const universe =
    $("characterUniverse")?.value || "all";

  const list = characters.filter(character => {
    const matchesUniverse =
      universe === "all" || character[3] === universe;

    const matchesSearch =
      !query || character.join(" ").toLowerCase().includes(query);

    return matchesUniverse && matchesSearch;
  });

  if ($("characterCount")) {
    $("characterCount").textContent =
      `${list.length} characters`;
  }

  $("characterItems").replaceChildren();

  list.forEach(character => {
    const card = document.createElement("article");
    card.className = "character-card";
    card.style.cursor = "pointer";

    const image = document.createElement("img");
    image.alt = character[1];
    image.loading = "lazy";
    image.style.width = "100%";
    image.style.height = "220px";
    image.style.objectFit = "contain";
    image.style.borderRadius = "12px";

    card.append(image);

    getCharacterImage(character[1]).then(source => {
      if (source) image.src = source;
      else image.alt = "Image unavailable for " + character[1];
    });

    const heading = document.createElement("h3");
    heading.textContent = character[0];

    const alias = document.createElement("span");
    alias.className = "chip";
    alias.textContent = character[1];

    const description = document.createElement("p");
    description.textContent = character[2];

    const universeText = document.createElement("p");
    universeText.textContent = "Universe: " + character[3];

    const more = document.createElement("p");
    more.textContent = "Tap to view full profile →";

    heading.append(alias);
    card.append(heading, description, universeText, more);

    card.addEventListener("click", () => {
      showDetail(
        character[1],
        character[2],
        [
          ["Real name", character[0]],
          ["Superhero name", character[1]],
          ["Universe", character[3]],
          ["Powers and abilities", character[4]],
          ["Affiliations", character[5]],
          ["Allies", character[6]],
          ["Enemies", character[7]],
          ["Screen appearances", character[8]]
        ]
      );
    });

    $("characterItems").append(card);
  });
}
  // TEAM PROFILES
  function renderTeams() {
    if (!$("teamItems")) return;

    $("teamItems").replaceChildren();

    teams.forEach(team => {
      const card = document.createElement("article");
      card.className = "card";
      card.style.cursor = "pointer";

      const symbol = document.createElement("div");
      symbol.className = "emoji";
      symbol.textContent = "✦";

      const title = document.createElement("h3");
      title.textContent = team[0];

      const description = document.createElement("p");
      description.textContent = team[1];

      const prompt = document.createElement("p");
      prompt.textContent = "Tap to view team profile →";

      card.append(symbol, title, description, prompt);

      card.addEventListener("click", () => {
        showDetail(
          team[0],
          team[1],
          [
            ["History and purpose", team[2]],
            ["Roster", team[3]],
            ["Rivals and enemies", team[4]],
            ["Screen appearances", team[5]]
          ]
        );
      });

      $("teamItems").append(card);
    });
  }

  // REUSABLE DETAIL WINDOW
  function showDetail(title, description, fields) {
    let modal = $("marvelDetailModal");

    if (!modal) {
      modal = document.createElement("div");
      modal.id = "marvelDetailModal";

      Object.assign(modal.style, {
        position: "fixed",
        inset: "0",
        zIndex: "1000",
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px"
      });

      document.body.append(modal);
    }

    modal.replaceChildren();

    const panel = document.createElement("div");

    Object.assign(panel.style, {
      background: "#141c2a",
      border: "1px solid #39485e",
      borderRadius: "18px",
      padding: "22px",
      width: "100%",
      maxWidth: "520px",
      maxHeight: "85vh",
      overflowY: "auto"
    });

    const close = document.createElement("button");
    close.className = "btn";
    close.textContent = "✕ Close";
    close.style.float = "right";

    close.addEventListener("click", () => {
      modal.remove();
    });

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.style.marginTop = "35px";

    const intro = document.createElement("p");
    intro.textContent = description;
    intro.style.color = "#aab5c7";

    panel.append(close);

if (characters.some(character => character[1] === title)) {
  const profileImage = document.createElement("img");
  profileImage.alt = title;
  profileImage.style.width = "100%";
  profileImage.style.maxHeight = "320px";
  profileImage.style.objectFit = "contain";
  profileImage.style.borderRadius = "14px";

  panel.append(profileImage);

  getCharacterImage(title).then(source => {
    if (source) profileImage.src = source;
  });
}

panel.append(heading, intro);

    fields.forEach(field => {
      const section = document.createElement("div");
      section.style.marginTop = "17px";

      const label = document.createElement("strong");
      label.textContent = field[0];
      label.style.display = "block";

      const value = document.createElement("p");
      value.textContent = field[1];
      value.style.color = "#c5cfdd";
      value.style.fontSize = "13px";

      section.append(label, value);
      panel.append(section);
    });

    modal.append(panel);

    modal.addEventListener("click", event => {
      if (event.target === modal) modal.remove();
    });

    const escapeHandler = event => {
      if (event.key === "Escape") {
        modal.remove();
        document.removeEventListener("keydown", escapeHandler);
      }
    };

    document.addEventListener("keydown", escapeHandler);
  }

  // UNIVERSE CARDS
  function buildUniverseCards() {
    universes.forEach(universe => {
      const count = catalog.filter(
        item => item[3] === universe
      ).length;

      const done = catalog.filter(
        item => item[3] === universe && watched.has(item[0])
      ).length;

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

      const icon = document.createElement("span");
      icon.style.fontSize = "25px";
      icon.textContent = symbols[universe];

      const name = document.createElement("b");
      name.textContent = universe;

      const total = document.createElement("small");
      total.textContent = `${count} titles`;

      universeCard.append(icon, name, total);

      universeCard.addEventListener("click", () => {
        setView("library");
        $("filterUniverse").value = universe;
        currentMode = "all";
        renderItems();
      });

      $("universeGrid")?.append(universeCard);
    });
  }

  // LIVE DOOMSDAY COUNTDOWN
  function countdown() {
    const target = new Date("2026-12-17T00:00:00+11:00");
    const difference = Math.max(0, target - new Date());

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor(
      (difference % 86400000) / 3600000
    );
    const minutes = Math.floor(
      (difference % 3600000) / 60000
    );
    const seconds = Math.floor(
      (difference % 60000) / 1000
    );

    if ($("countdown")) {
      $("countdown").innerHTML =
        `<div class="countbox"><strong>${days}</strong><span>DAYS</span></div>` +
        `<div class="countbox"><strong>${hours}</strong><span>HOURS</span></div>` +
        `<div class="countbox"><strong>${minutes}</strong><span>MINUTES</span></div>` +
        `<div class="countbox"><strong>${seconds}</strong><span>SECONDS</span></div>`;
    }
  }

  // APP EVENTS
  function bindEvents() {
    document.querySelectorAll("[data-view]").forEach(button => {
      button.addEventListener("click", () => {
        setView(button.dataset.view);
      });
    });

    document.querySelectorAll("[data-goto]").forEach(button => {
      button.addEventListener("click", () => {
        setView(button.dataset.goto);
      });
    });

    document.querySelectorAll("[data-mode]").forEach(button => {
      button.addEventListener("click", () => {
        currentMode = button.dataset.mode;

        document.querySelectorAll("[data-mode]").forEach(other => {
          other.classList.toggle("primary", other === button);
        });

        renderItems();
      });
    });

    ["search", "sort", "filterUniverse"].forEach(id => {
      $(id)?.addEventListener(
        id === "search" ? "input" : "change",
        renderItems
      );
    });

    ["timelineSort", "timelineUniverse"].forEach(id => {
      $(id)?.addEventListener("change", renderTimeline);
    });

    $("characterSearch")?.addEventListener(
      "input",
      renderCharacters
    );

    $("characterUniverse")?.addEventListener(
      "change",
      renderCharacters
    );

    $("exportBtn")?.addEventListener("click", () => {
      const blob = new Blob([
        JSON.stringify({
          watched: [...watched],
          exportedAt: new Date().toISOString()
        }, null, 2)
      ], { type: "application/json" });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "marvel-marathon-progress.json";
      link.click();

      URL.revokeObjectURL(url);
    });

    $("resetBtn")?.addEventListener("click", () => {
      if (window.confirm(
        "Reset all watch progress on this device?"
      )) {
        watched.clear();
        saveProgress();
        renderItems();
      }
    });
  }

  // START THE APP
  function init() {
    bindEvents();
    buildUniverseCards();

    countdown();
    window.setInterval(countdown, 1000);

    updateStats();
    renderItems();
    renderTimeline();
    renderWatchlist();
    renderCharacters();
    renderTeams();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
