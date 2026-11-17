
/* ==========================================================
   MARVEL MARATHON — COMPLETE APP REPLACEMENT
   Version: November 2026
   ========================================================== */

(() => {
'use strict';

const $ = id => document.getElementById(id);
const KEY = 'marvelMarathonCompanionProgress';

const universes = [
  'MCU',
  'X-Men',
  'Deadpool',
  'Fantastic Four',
  'Sony Spider-Man',
  'Animated Marvel',
  'Other Marvel'
];

/* ----------------------------------------------------------
   RELEASED MARVEL SCREEN PRODUCTIONS

   Format:
   [id, title, format, universe, storyYear, releaseYear,
    essential, description, extra]
   ---------------------------------------------------------- */

const titles = [
['captain-america-1944','Captain America','Serial','Other Marvel',1944,1944,0,'The original live-action Captain America serial.','15 chapters'],
['howard-duck','Howard the Duck','Movie','Other Marvel',1986,1986,0,'Howard arrives on Earth.',''],
['punisher-1989','The Punisher','Movie','Other Marvel',1989,1989,0,'Frank Castle wages war on crime.',''],
['captain-america-1990','Captain America','Movie','Other Marvel',1990,1990,0,'An early live-action Captain America adaptation.',''],
['generation-x','Generation X','TV Movie','X-Men',1996,1996,0,'A group of young mutants attend a special school.','TV pilot'],
['nick-fury','Nick Fury: Agent of S.H.I.E.L.D.','TV Movie','Other Marvel',1998,1998,0,'Nick Fury confronts HYDRA.',''],
['blade','Blade','Movie','Other Marvel',1998,1998,0,'A half-vampire hunter fights the undead.',''],
['blade-2','Blade II','Movie','Other Marvel',2002,2002,0,'Blade faces a new vampire threat.',''],
['blade-3','Blade: Trinity','Movie','Other Marvel',2004,2004,0,'Blade faces Dracula.',''],
['xmen','X-Men','Movie','X-Men',2000,2000,0,'The X-Men confront a world that fears mutants.',''],
['x2','X2','Movie','X-Men',2003,2003,0,'The mutants face a military threat.',''],
['last-stand','X-Men: The Last Stand','Movie','X-Men',2006,2006,0,'The mutant cure divides the X-Men.',''],
['origins','X-Men Origins: Wolverine','Movie','X-Men',1979,2009,0,'Logan discovers his past.',''],
['first-class','X-Men: First Class','Movie','X-Men',1962,2011,0,'Charles Xavier and Erik Lehnsherr meet.',''],
['wolverine','The Wolverine','Movie','X-Men',2013,2013,0,'Logan travels to Japan.',''],
['days-future','X-Men: Days of Future Past','Movie','X-Men',1973,2014,0,'The X-Men attempt to change history.',''],
['apocalypse','X-Men: Apocalypse','Movie','X-Men',1983,2016,0,'An ancient mutant awakens.',''],
['logan','Logan','Movie','X-Men',2029,2017,0,'An older Logan protects a young mutant.',''],
['dark-phoenix','Dark Phoenix','Movie','X-Men',1992,2019,0,'Jean Grey struggles with the Phoenix Force.',''],
['new-mutants','The New Mutants','Movie','X-Men',2020,2020,0,'Young mutants are held in a mysterious facility.',''],
['deadpool','Deadpool','Movie','Deadpool',2016,2016,0,'Wade Wilson becomes Deadpool.',''],
['deadpool-2','Deadpool 2','Movie','Deadpool',2018,2018,0,'Deadpool assembles a team.',''],
['deadpool-wolverine','Deadpool & Wolverine','Movie','Deadpool',2024,2024,0,'Deadpool crosses paths with Wolverine.',''],
['spider-2002','Spider-Man','Movie','Sony Spider-Man',2002,2002,0,'Peter Parker becomes Spider-Man.',''],
['spider-2','Spider-Man 2','Movie','Sony Spider-Man',2004,2004,0,'Peter faces Doctor Octopus.',''],
['spider-3','Spider-Man 3','Movie','Sony Spider-Man',2007,2007,0,'Peter faces several new enemies.',''],
['amazing-spider','The Amazing Spider-Man','Movie','Sony Spider-Man',2012,2012,0,'Peter Parker discovers his origins.',''],
['amazing-spider-2','The Amazing Spider-Man 2','Movie','Sony Spider-Man',2014,2014,0,'Peter faces Electro and the Green Goblin.',''],
['venom','Venom','Movie','Sony Spider-Man',2018,2018,0,'Eddie Brock bonds with a symbiote.',''],
['venom-2','Venom: Let There Be Carnage','Movie','Sony Spider-Man',2021,2021,0,'Venom faces Carnage.',''],
['morbius','Morbius','Movie','Sony Spider-Man',2022,2022,0,'A scientist becomes a living vampire.',''],
['madame-web','Madame Web','Movie','Sony Spider-Man',2024,2024,0,'A paramedic discovers psychic abilities.',''],
['venom-3','Venom: The Last Dance','Movie','Sony Spider-Man',2024,2024,0,'Eddie and Venom face a new threat.',''],
['kraven','Kraven the Hunter','Movie','Sony Spider-Man',2024,2024,0,'Sergei Kravinoff becomes Kraven.',''],
['spider-verse','Spider-Man: Into the Spider-Verse','Animated Movie','Sony Spider-Man',2018,2018,0,'Miles Morales discovers the multiverse.',''],
['spider-verse-2','Spider-Man: Across the Spider-Verse','Animated Movie','Sony Spider-Man',2023,2023,0,'Miles meets the Spider Society.',''],

/* MCU FEATURE FILMS */

['iron-man','Iron Man','Movie','MCU',2008,2008,1,'Tony Stark builds the first Iron Man suit.',''],
['hulk','The Incredible Hulk','Movie','MCU',2010,2008,0,'Bruce Banner searches for a cure.',''],
['iron-man-2','Iron Man 2','Movie','MCU',2010,2010,1,'Tony faces new enemies.',''],
['thor','Thor','Movie','MCU',2011,2011,1,'Thor is exiled to Earth.',''],
['first-avenger','Captain America: The First Avenger','Movie','MCU',1943,2011,1,'Steve Rogers becomes Captain America.',''],
['avengers','The Avengers','Movie','MCU',2012,2012,1,'Earth’s heroes unite against Loki.',''],
['iron-man-3','Iron Man 3','Movie','MCU',2012,2013,0,'Tony Stark faces the Mandarin threat.',''],
['dark-world','Thor: The Dark World','Movie','MCU',2013,2013,0,'Thor confronts the Dark Elves.',''],
['winter-soldier','Captain America: The Winter Soldier','Movie','MCU',2014,2014,1,'Steve uncovers a conspiracy.',''],
['guardians','Guardians of the Galaxy','Movie','MCU',2014,2014,1,'A group of misfits protect the galaxy.',''],
['guardians-2','Guardians of the Galaxy Vol. 2','Movie','MCU',2014,2017,0,'The Guardians uncover Peter Quill’s origins.',''],
['ultron','Avengers: Age of Ultron','Movie','MCU',2015,2015,1,'The Avengers face an artificial intelligence.',''],
['ant-man','Ant-Man','Movie','MCU',2015,2015,0,'Scott Lang becomes Ant-Man.',''],
['civil-war','Captain America: Civil War','Movie','MCU',2016,2016,1,'The Avengers split over government oversight.',''],
['black-widow','Black Widow','Movie','MCU',2016,2021,1,'Natasha confronts her past.',''],
['black-panther','Black Panther','Movie','MCU',2016,2018,1,'T’Challa returns to Wakanda.',''],
['homecoming','Spider-Man: Homecoming','Movie','MCU',2016,2017,1,'Peter balances school and heroism.',''],
['doctor-strange','Doctor Strange','Movie','MCU',2016,2016,1,'Stephen Strange discovers the mystic arts.',''],
['ragnarok','Thor: Ragnarok','Movie','MCU',2017,2017,1,'Thor fights to save Asgard.',''],
['antman-wasp','Ant-Man and the Wasp','Movie','MCU',2018,2018,0,'Scott and Hope explore the Quantum Realm.',''],
['infinity-war','Avengers: Infinity War','Movie','MCU',2018,2018,1,'Thanos begins his quest for the stones.',''],
['endgame','Avengers: Endgame','Movie','MCU',2023,2019,1,'The Avengers attempt to undo the Snap.',''],
['far-from-home','Spider-Man: Far From Home','Movie','MCU',2024,2019,1,'Peter faces a new threat after Endgame.',''],
['shang-chi','Shang-Chi and the Legend of the Ten Rings','Movie','MCU',2024,2021,1,'Shang-Chi confronts his family history.',''],
['eternals','Eternals','Movie','MCU',2024,2021,0,'Ancient beings emerge from the shadows.',''],
['no-way-home','Spider-Man: No Way Home','Movie','MCU',2024,2021,1,'Peter’s identity crisis opens the multiverse.',''],
['multiverse-madness','Doctor Strange in the Multiverse of Madness','Movie','MCU',2025,2022,1,'Strange travels through alternate realities.',''],
['wakanda-forever','Black Panther: Wakanda Forever','Movie','MCU',2025,2022,1,'Wakanda faces a global challenge.',''],
['love-thunder','Thor: Love and Thunder','Movie','MCU',2025,2022,0,'Thor faces Gorr the God Butcher.',''],
['quantumania','Ant-Man and the Wasp: Quantumania','Movie','MCU',2026,2023,1,'The Ant-Family enters the Quantum Realm.',''],
['guardians-3','Guardians of the Galaxy Vol. 3','Movie','MCU',2026,2023,1,'The Guardians protect Rocket.',''],
['marvels','The Marvels','Movie','MCU',2026,2023,0,'Carol, Monica and Kamala team up.',''],
['captain-america-brave','Captain America: Brave New World','Movie','MCU',2026,2025,1,'Sam Wilson takes on a new threat.',''],
['thunderbolts','Thunderbolts*','Movie','MCU',2026,2025,1,'A team of antiheroes takes on a mission.',''],
['fantastic-four-first','The Fantastic Four: First Steps','Movie','MCU',1960,2025,1,'Marvel’s First Family enters the multiverse.',''],
['spider-brand-new-day','Spider-Man: Brand New Day','Movie','MCU',2026,2026,1,'Peter Parker returns.','Released July 31, 2026'],

/* MCU SERIES AND SPECIALS */

['agent-carter-short','Agent Carter (One-Shot)','Short','MCU',1946,2013,0,'Peggy Carter takes on a covert mission.',''],
['agent-carter-s1','Agent Carter — Season 1','Series','MCU',1946,2015,0,'Peggy Carter works for the SSR.','8 episodes'],
['agent-carter-s2','Agent Carter — Season 2','Series','MCU',1947,2016,0,'Peggy investigates a new threat in Los Angeles.','10 episodes · cancelled'],
['agents-shield','Agents of S.H.I.E.L.D.','Series','MCU',2013,2013,0,'Agent Coulson leads a team of agents.','7 seasons'],
['daredevil','Daredevil','Series','MCU',2015,2015,0,'Matt Murdock protects Hell’s Kitchen.','3 seasons'],
['jessica-jones','Jessica Jones','Series','MCU',2015,2015,0,'A private investigator with superpowers.','3 seasons'],
['luke-cage','Luke Cage','Series','MCU',2016,2016,0,'A Harlem hero with unbreakable skin.','2 seasons'],
['iron-fist','Iron Fist','Series','MCU',2017,2017,0,'Danny Rand returns to New York.','2 seasons'],
['defenders','The Defenders','Series','MCU',2017,2017,0,'Four street-level heroes unite.','Limited series'],
['punisher-series','The Punisher','Series','MCU',2017,2017,0,'Frank Castle wages war on crime.','2 seasons'],
['inhumans','Marvel’s Inhumans','Series','MCU',2017,2017,0,'The Inhuman royal family is divided.','1 season · cancelled'],
['wandavision','WandaVision','Series','MCU',2023,2021,1,'Wanda and Vision live through changing realities.','9 episodes'],
['falcon-winter','The Falcon and the Winter Soldier','Series','MCU',2024,2021,1,'Sam and Bucky face a changing world.','6 episodes'],
['loki-1','Loki — Season 1','Series','MCU',2023,2021,1,'Loki encounters the TVA.','6 episodes'],
['loki-2','Loki — Season 2','Series','MCU',2023,2023,1,'Loki fights to save the multiverse.','6 episodes'],
['what-if-1','What If...? — Season 1','Animated Series','MCU',2021,2021,0,'Alternate versions of MCU stories.','9 episodes'],
['what-if-2','What If...? — Season 2','Animated Series','MCU',2023,2023,0,'More alternate Marvel realities.','9 episodes'],
['what-if-3','What If...? — Season 3','Animated Series','MCU',2024,2024,0,'The animated multiverse anthology concludes.','8 episodes'],
['hawkeye','Hawkeye','Series','MCU',2024,2021,0,'Clint teams up with Kate Bishop.','6 episodes'],
['moon-knight','Moon Knight','Series','MCU',2025,2022,0,'Marc Spector encounters an Egyptian god.','6 episodes'],
['ms-marvel','Ms. Marvel','Series','MCU',2025,2022,1,'Kamala Khan discovers her abilities.','6 episodes'],
['she-hulk','She-Hulk: Attorney at Law','Series','MCU',2025,2022,0,'Jennifer Walters balances law and superpowers.','9 episodes'],
['secret-invasion','Secret Invasion','Series','MCU',2026,2023,0,'Nick Fury faces a Skrull conspiracy.','6 episodes'],
['echo','Echo','Series','MCU',2025,2024,0,'Maya Lopez returns home.','5 episodes'],
['agatha','Agatha All Along','Series','MCU',2026,2024,0,'Agatha seeks a new path.','9 episodes'],
['daredevil-born-again-s1','Daredevil: Born Again — Season 1','Series','MCU',2026,2025,1,'Matt Murdock faces Wilson Fisk.','9 episodes'],
['wonder-man','Wonder Man','Series','MCU',2026,2026,0,'Simon Williams pursues an acting career.','Released January 2026'],
['born-again-s2','Daredevil: Born Again — Season 2','Series','MCU',2026,2026,1,'Matt Murdock continues his fight.','Released March 2026'],
['visionquest','VisionQuest','Series','MCU',2026,2026,0,'Vision searches for meaning after his reboot.','8 episodes · released October 2026'],
['werewolf','Werewolf by Night','Special','MCU',2025,2022,0,'Monster hunters gather.','Special'],
['guardians-holiday','The Guardians of the Galaxy Holiday Special','Special','MCU',2025,2022,0,'The Guardians plan a holiday surprise.','Special'],
['one-shot-consultant','The Consultant','Short','MCU',2011,2011,0,'Marvel One-Shot.',''],
['one-shot-thor','A Funny Thing Happened on the Way to Thor’s Hammer','Short','MCU',2011,2011,0,'Marvel One-Shot.',''],
['one-shot-item47','Item 47','Short','MCU',2012,2012,0,'A couple find alien technology.',''],
['one-shot-agent','Agent Carter','Short','MCU',1946,2013,0,'Peggy Carter takes on a mission.',''],
['one-shot-allhail','All Hail the King','Short','MCU',2014,2014,0,'Trevor Slattery faces the consequences.',''],

/* X-MEN, SPIDER-MAN AND OTHER ANIMATION */

['xmen-animated','X-Men: The Animated Series','Animated Series','X-Men',1992,1992,0,'The classic animated X-Men series.','5 seasons'],
['xmen-97','X-Men ’97 — Season 1','Animated Series','X-Men',1997,2024,0,'The X-Men continue their animated adventures.','10 episodes'],
['spider-animated','Spider-Man: The Animated Series','Animated Series','Animated Marvel',1994,1994,0,'Peter Parker protects New York.','5 seasons'],
['spectacular-spider','The Spectacular Spider-Man','Animated Series','Animated Marvel',2008,2008,0,'Peter Parker navigates school and heroism.','2 seasons'],
['ultimate-spider','Ultimate Spider-Man','Animated Series','Animated Marvel',2012,2012,0,'Spider-Man trains with S.H.I.E.L.D.','4 seasons'],
['spidey-friends','Spider-Man and His Amazing Friends','Animated Series','Animated Marvel',1981,1981,0,'Spider-Man teams up with Firestar and Iceman.','3 seasons'],
['avengers-earth','The Avengers: Earth’s Mightiest Heroes','Animated Series','Animated Marvel',2010,2010,0,'The Avengers defend Earth.','2 seasons'],
['avengers-assemble','Avengers Assemble','Animated Series','Animated Marvel',2013,2013,0,'The Avengers face new threats.','5 seasons'],
['iron-man-animated','Iron Man','Animated Series','Animated Marvel',1994,1994,0,'Tony Stark protects the world.','2 seasons'],
['fantastic-four-animated','Fantastic Four','Animated Series','Animated Marvel',1994,1994,0,'The Fantastic Four face their enemies.','2 seasons'],
['hulk-animated','The Incredible Hulk','Animated Series','Animated Marvel',1996,1996,0,'Bruce Banner struggles with the Hulk.','2 seasons'],
['super-heroes','The Marvel Super Heroes','Animated Series','Animated Marvel',1966,1966,0,'Early animated Marvel heroes.',''],
['disk-wars','Marvel Disk Wars: The Avengers','Animated Series','Animated Marvel',2014,2014,0,'Japanese animated Avengers series.',''],
['moon-girl','Moon Girl and Devil Dinosaur','Animated Series','Animated Marvel',2023,2023,0,'Lunella Lafayette teams up with Devil Dinosaur.','2 seasons'],
['hit-monkey','Hit-Monkey','Animated Series','Animated Marvel',2021,2021,0,'A Japanese macaque becomes an assassin.','2 seasons'],
['modok','M.O.D.O.K.','Animated Series','Animated Marvel',2021,2021,0,'M.O.D.O.K. faces family life.','1 season'],
['iron-armored','Iron Man: Armored Adventures','Animated Series','Animated Marvel',2009,2009,0,'Teenage Tony Stark becomes Iron Man.','2 seasons'],
['wolverine-anime','Marvel Anime: Wolverine','Animated Series','Animated Marvel',2011,2011,0,'Wolverine travels to Japan.',''],
['blade-anime','Marvel Anime: Blade','Animated Series','Animated Marvel',2011,2011,0,'Blade hunts vampires in Japan.',''],
['xmen-anime','Marvel Anime: X-Men','Animated Series','Animated Marvel',2011,2011,0,'The X-Men reunite.',''],
['iron-anime','Marvel Anime: Iron Man','Animated Series','Animated Marvel',2010,2010,0,'Tony Stark travels to Japan.',''],
['ultimate-avengers','Ultimate Avengers','Animated Movie','Animated Marvel',2006,2006,0,'The Avengers unite against an alien threat.',''],
['ultimate-avengers-2','Ultimate Avengers 2','Animated Movie','Animated Marvel',2006,2006,0,'The Avengers face a new invasion.',''],
['invincible-iron','The Invincible Iron Man','Animated Movie','Animated Marvel',2007,2007,0,'Tony Stark confronts an ancient threat.',''],
['doctor-strange-animated','Doctor Strange: The Sorcerer Supreme','Animated Movie','Animated Marvel',2007,2007,0,'Stephen Strange discovers magic.',''],
['hulk-versus','Hulk Versus','Animated Movie','Animated Marvel',2009,2009,0,'Hulk faces Wolverine and Thor.',''],
['thor-asgard','Thor: Tales of Asgard','Animated Movie','Animated Marvel',2011,2011,0,'Young Thor embarks on an adventure.',''],
['avengers-confidential','Avengers Confidential: Black Widow & Punisher','Animated Movie','Animated Marvel',2014,2014,0,'Black Widow and Punisher work together.',''],
['hulk-monsters','Hulk: Where Monsters Dwell','Animated Movie','Animated Marvel',2016,2016,0,'Hulk enters a nightmare dimension.',''],
['big-hero-six','Big Hero 6','Animated Movie','Other Marvel',2014,2014,0,'A young inventor forms a superhero team.',''],
['amazing-spider-tv','The Amazing Spider-Man','Series','Other Marvel',1977,1977,0,'Live-action Spider-Man television series.','2 seasons'],
['hulk-tv','The Incredible Hulk','Series','Other Marvel',1977,1977,0,'David Banner wanders in search of a cure.','5 seasons'],
['spidey-super','Spidey Super Stories','Series','Other Marvel',1974,1974,0,'Spider-Man appears in the educational series.',''],
['mutant-x','Mutant X','Series','Other Marvel',2001,2001,0,'A team of genetically altered people.','3 seasons'],
['blade-series','Blade: The Series','Series','Other Marvel',2006,2006,0,'Blade hunts vampires.','1 season · cancelled'],
['runaways','Runaways','Series','Other Marvel',2017,2017,0,'Teenagers discover their parents’ secrets.','3 seasons'],
['cloak-dagger','Cloak & Dagger','Series','Other Marvel',2018,2018,0,'Two teenagers discover connected powers.','2 seasons'],
['legion','Legion','Series','X-Men',2017,2017,0,'David Haller questions reality.','3 seasons'],
['gifted','The Gifted','Series','X-Men',2017,2017,0,'Mutants fight for survival.','2 seasons']
];

/* ----------------------------------------------------------
   UPCOMING MCU
   Released titles are not shown here.
   ---------------------------------------------------------- */

const upcoming = [
['Avengers: Doomsday','Movie','17 December 2026 — Australia','Officially dated'],
['Avengers: Secret Wars','Movie','17 December 2027','Officially dated'],
['Ghost Rider','Movie','2028','Officially announced · Ryan Gosling'],
['Black Panther 3','Movie','15 December 2028','Officially dated'],
['X-Men','Movie','5 May 2028','Officially dated'],
['Your Friendly Neighborhood Spider-Man — Season 2','Animated Series','13 January 2027','Reported date · verify platform listing'],
['X-Men ’97 — Season 2','Animated Series','2026','Check current release status'],
['X-Men ’97 — Season 3','Animated Series','TBA','In development'],
['Daredevil: Born Again — Season 3','Series','2027','Reported / in production'],
['Marvel Zombies: The Winter Soldier','Animated Special','Halloween 2027','Announced'],
['Nova','Series','TBA','In development'],
['Shang-Chi 2','Movie','TBA','In development'],
['Armor Wars','Movie','TBA','In development'],
['Deadpool 4','Movie','TBA','Reported / unconfirmed']
];

/* ----------------------------------------------------------
   CANCELLED AND ABANDONED PROJECTS
   Unreleased projects remain separate from the released
   catalog. Status descriptions distinguish cancellation
   from development changes and abandoned proposals.
   ---------------------------------------------------------- */

const cancelled = [
['Marvel’s Most Wanted','Series','Cancelled','Agents of S.H.I.E.L.D. spin-off starring Bobbi Morse and Lance Hunter.'],
['New Warriors','Series','Cancelled','Planned Marvel comedy series.'],
['Damage Control','Series','Abandoned','Proposed workplace comedy about superhero clean-up crews.'],
['Ghost Rider — Robbie Reyes spin-off','Series','Cancelled','Planned spin-off starring Gabriel Luna.'],
['Howard the Duck','Animated Series','Cancelled','Planned Hulu animated series.'],
['Tigra & Dazzler','Animated Series','Cancelled','Planned Hulu animated series.'],
['The Offenders','Animated Crossover','Cancelled','Planned animated crossover special.'],
['Silver & Black','Movie','Abandoned','Planned Black Cat and Silver Sable film.'],
['Sinister Six','Movie','Abandoned','Planned Sony Spider-Man spin-off.'],
['Gambit','Movie','Cancelled','Planned solo X-Men film.'],
['X-Force','Movie','Abandoned','Planned X-Men spin-off.'],
['Multiple Man','Movie','Abandoned','Planned Jamie Madrox film.'],
['Kitty Pryde','Movie','Abandoned','Planned solo X-Men project.'],
['Fantastic Four — 1994 film','Movie','Unreleased','Completed production but never officially released.'],
['Inhumans — original film','Movie','Abandoned','Original film plans became a television series.'],
['Avengers: The Kang Dynasty','Movie','Reworked','Replaced by Avengers: Doomsday.'],
['Runaways — original film','Movie','Abandoned','Earlier film concept became a television series.'],
['Spider-Man: The Animated Series — planned revival','Series','Unconfirmed','Do not treat as officially cancelled without stronger evidence.'],
['Blade — MCU film','Movie','Removed from slate / status unclear','No confirmed release date; distinguish removal from an official cancellation.']
];

/* ----------------------------------------------------------
   CHARACTERS
   ---------------------------------------------------------- */

const characters = [
['Tony Stark','Iron Man','Genius inventor and founding Avenger.','MCU','Powered armor, intelligence','Avengers','Steve Rogers, Pepper Potts','Thanos, Obadiah Stane','Iron Man films; Avengers films','Iron Man Marvel Comics'],
['Steve Rogers','Captain America','A super-soldier who fights for justice.','MCU','Super strength, shield combat','Avengers','Bucky Barnes, Sam Wilson','Red Skull, HYDRA','Captain America films; Avengers films','Captain America Marvel Comics'],
['Thor','Thor','Asgardian god of thunder.','MCU','Lightning, strength, longevity','Avengers','Loki, Jane Foster','Hela, Gorr','Thor films; Avengers films','Thor Marvel Comics'],
['Bruce Banner','Hulk','Scientist who transforms into the Hulk.','MCU','Super strength, regeneration','Avengers','Tony Stark, Natasha Romanoff','Abomination','Hulk; Avengers films','Hulk Marvel Comics'],
['Natasha Romanoff','Black Widow','Former spy and Avenger.','MCU','Espionage, martial arts','Avengers','Clint Barton, Yelena Belova','Dreykov','Black Widow; Avengers films','Black Widow Marvel Comics'],
['Clint Barton','Hawkeye','Master archer and Avenger.','MCU','Archery, tactics','Avengers','Natasha Romanoff, Kate Bishop','Various enemies','Avengers; Hawkeye','Hawkeye Marvel Comics'],
['Peter Parker','Spider-Man','Young hero with spider-like abilities.','MCU','Spider-sense, strength, agility','Avengers','Ned Leeds, MJ','Green Goblin, Vulture','Spider-Man films','Spider-Man Marvel Comics'],
['Stephen Strange','Doctor Strange','A surgeon who becomes a master of magic.','MCU','Mystic arts, portals','Masters of the Mystic Arts','Wong, Clea','Dormammu','Doctor Strange films','Doctor Strange Marvel Comics'],
['T’Challa','Black Panther','King and protector of Wakanda.','MCU','Enhanced abilities, vibranium suit','Wakandan royal family','Shuri, Okoye','Killmonger','Black Panther','Black Panther Marvel Comics'],
['Carol Danvers','Captain Marvel','A powerful cosmic hero.','MCU','Energy projection, flight','Avengers','Monica Rambeau, Kamala Khan','Kree enemies','Captain Marvel; The Marvels','Captain Marvel Marvel Comics'],
['Wanda Maximoff','Scarlet Witch','A powerful wielder of chaos magic.','MCU','Chaos magic, telekinesis','Avengers (former)','Vision, Pietro','Agatha, various threats','WandaVision; Doctor Strange 2','Scarlet Witch Marvel Comics'],
['Loki','Loki','God of Mischief and Asgardian prince.','MCU','Illusions, magic','Independent','Thor, Mobius','Kang variants','Thor; Avengers; Loki','Loki Marvel Comics'],
['Wade Wilson','Deadpool','Wisecracking mercenary with a healing factor.','Deadpool','Regeneration, combat','X-Force','Wolverine, Colossus','Ajax','Deadpool films','Deadpool Marvel Comics'],
['Logan','Wolverine','Mutant with claws and accelerated healing.','X-Men','Healing, claws, senses','X-Men','Charles Xavier','Sabretooth, Weapon X','X-Men films','Wolverine Marvel Comics'],
['Charles Xavier','Professor X','Founder of the X-Men.','X-Men','Telepathy','X-Men','Jean Grey, Magneto','Sentinels','X-Men films','Professor X Marvel Comics'],
['Erik Lehnsherr','Magneto','Mutant with control over magnetism.','X-Men','Magnetism','Brotherhood / X-Men','Charles Xavier','Human supremacists','X-Men films','Magneto Marvel Comics'],
['Jean Grey','Phoenix','Powerful mutant connected to the Phoenix Force.','X-Men','Telepathy, telekinesis','X-Men','Cyclops, Storm','Sentinels, Phoenix threats','X-Men films','Jean Grey Marvel Comics'],
['Miles Morales','Spider-Man','Brooklyn teenager who becomes Spider-Man.','Sony Spider-Man','Camouflage, venom blast, spider-sense','Spider Society','Gwen Stacy, Peter B. Parker','Spot','Spider-Verse films','Miles Morales Marvel Comics'],
['Eddie Brock','Venom','Journalist bonded with an alien symbiote.','Sony Spider-Man','Symbiote powers','Venom','Venom','Carnage','Venom films','Venom Marvel Comics'],
['Reed Richards','Mister Fantastic','Brilliant scientist and leader of the Fantastic Four.','Fantastic Four','Elasticity, intelligence','Fantastic Four','Sue Storm, Johnny Storm, Ben Grimm','Doctor Doom','Fantastic Four films','Mister Fantastic Marvel Comics'],
['Sue Storm','Invisible Woman','Founding member of the Fantastic Four.','Fantastic Four','Invisibility, force fields','Fantastic Four','Reed Richards, Johnny Storm','Doctor Doom','Fantastic Four films','Invisible Woman Marvel Comics'],
['Johnny Storm','Human Torch','Daring member of the Fantastic Four.','Fantastic Four','Flame generation, flight','Fantastic Four','Reed Richards, Sue Storm','Doctor Doom','Fantastic Four films','Human Torch Marvel Comics'],
['Ben Grimm','The Thing','Pilot transformed into a rocky powerhouse.','Fantastic Four','Strength, durability','Fantastic Four','Reed Richards, Sue Storm','Doctor Doom','Fantastic Four films','The Thing Marvel Comics'],
['Matt Murdock','Daredevil','Blind lawyer who protects Hell’s Kitchen.','MCU','Enhanced senses, martial arts','Defenders','Foggy Nelson, Karen Page','Wilson Fisk, Bullseye','Daredevil; Defenders','Daredevil Marvel Comics'],
['Frank Castle','The Punisher','Former soldier waging war on crime.','MCU','Military training, tactics','Independent','Karen Page, Micro','Criminal organizations','Daredevil; The Punisher','Punisher Marvel Comics'],
['Jessica Jones','Jessica Jones','Private investigator with superhuman strength.','MCU','Strength, durability','Defenders','Trish Walker, Luke Cage','Kilgrave','Jessica Jones; Defenders','Jessica Jones Marvel Comics'],
['Luke Cage','Luke Cage','Harlem hero with unbreakable skin.','MCU','Super strength, durability','Defenders','Jessica Jones, Misty Knight','Diamondback','Luke Cage; Defenders','Luke Cage Marvel Comics'],
['Kamala Khan','Ms. Marvel','Young hero inspired by Captain Marvel.','MCU','Hard-light constructs','Young Avengers (potential)','Carol Danvers, Monica Rambeau','The Clandestines','Ms. Marvel; The Marvels','Ms Marvel Marvel Comics'],
['Yelena Belova','Black Widow','Highly trained operative and Natasha’s sister figure.','MCU','Espionage, combat','Thunderbolts','Natasha Romanoff, Kate Bishop','Various threats','Black Widow; Hawkeye; Thunderbolts*','Yelena Belova Marvel Comics']
];

/* ----------------------------------------------------------
   TEAMS
   ---------------------------------------------------------- */

const teams = [
['Avengers','Earth’s premier superhero team.','Formed to face threats no hero could handle alone.','Iron Man, Captain America, Thor, Hulk, Black Widow, Hawkeye','Thanos, Ultron, Loki','The Avengers; Age of Ultron; Infinity War; Endgame','Avengers Marvel Comics'],
['Guardians of the Galaxy','A band of cosmic misfits.','A group of outsiders become a family.','Star-Lord, Gamora, Drax, Rocket, Groot, Mantis, Nebula','Ronan, Ego, High Evolutionary','Guardians trilogy; Avengers films','Guardians of the Galaxy Marvel Comics'],
['X-Men','Mutants fighting for a world that fears them.','Founded by Charles Xavier.','Professor X, Cyclops, Jean Grey, Storm, Wolverine','Magneto, Sentinels','X-Men films; animated series','X-Men Marvel Comics'],
['Fantastic Four','A family of explorers and superheroes.','Four adventurers gain powers after a scientific mission.','Reed Richards, Sue Storm, Johnny Storm, Ben Grimm','Doctor Doom, Mole Man','Fantastic Four films','Fantastic Four Marvel Comics'],
['Defenders','Street-level heroes protecting New York.','A reluctant alliance forms against the Hand.','Daredevil, Jessica Jones, Luke Cage, Iron Fist','The Hand','The Defenders','Defenders Marvel Comics'],
['S.H.I.E.L.D.','An intelligence and peacekeeping organization.','Coordinates responses to extraordinary threats.','Nick Fury, Phil Coulson, Maria Hill, Melinda May','HYDRA','Agents of S.H.I.E.L.D.; MCU films','S.H.I.E.L.D. Marvel Comics'],
['HYDRA','A secretive organization.','An enemy network that infiltrates institutions.','Red Skull, Arnim Zola','S.H.I.E.L.D.','Captain America films','HYDRA Marvel Comics'],
['Thunderbolts','A team of dangerous operatives.','A group of antiheroes brought together for missions.','Yelena, Bucky, Red Guardian, Ghost, U.S. Agent','Internal conflicts','Thunderbolts*','Thunderbolts Marvel Comics'],
['Sinister Six','A rotating alliance of Spider-Man villains.','Villains unite to defeat Spider-Man.','Doctor Octopus, Vulture, Electro, Sandman, Mysterio','Spider-Man','Spider-Man adaptations','Sinister Six Marvel Comics'],
['Midnight Sons','A supernatural alliance against dark forces.','A rotating group of heroes confronts mystical threats.','Blade, Ghost Rider, Moon Knight, Doctor Strange','Mephisto, Lilith','Screen roster varies','Midnight Sons Marvel Comics']
];

/* ----------------------------------------------------------
   PROGRESS — preserves old array format and new object format
   ---------------------------------------------------------- */

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');

    if (Array.isArray(saved)) {
      return { watched:saved, watchlist:[] };
    }

    return {
      watched:Array.isArray(saved.watched) ? saved.watched : [],
      watchlist:Array.isArray(saved.watchlist) ? saved.watchlist : []
    };
  } catch {
    return { watched:[], watchlist:[] };
  }
}

let progress = readProgress();
let libraryMode = 'all';

function saveProgress() {
  localStorage.setItem(KEY,JSON.stringify(progress));
  renderAll();
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[c]);
}

/* ----------------------------------------------------------
   NAVIGATION
   ---------------------------------------------------------- */

const extraTabs = [
  ['all-marvel','All Marvel'],
  ['mcu-only','MCU'],
  ['upcoming-mcu','Upcoming MCU'],
  ['cancelled','Cancelled']
];

function setView(view) {
  if (!$ (view)) return;

  document.querySelectorAll('.view').forEach(section=>{
    section.classList.toggle('active',section.id===view);
  });

  document.querySelectorAll('[data-view]').forEach(button=>{
    button.classList.toggle('active',button.dataset.view===view);
  });

  document.querySelectorAll('[data-extra-view]').forEach(button=>{
    button.classList.toggle('active',button.dataset.extraView===view);
  });

  window.scrollTo({top:0,behavior:'smooth'});
}

document.querySelectorAll('[data-view]').forEach(button=>{
  button.addEventListener('click',()=>setView(button.dataset.view));
});

document.querySelectorAll('[data-goto]').forEach(button=>{
  button.addEventListener('click',()=>setView(button.dataset.goto));
});

/* ----------------------------------------------------------
   CREATE THE FOUR NEW TABS
   ---------------------------------------------------------- */

const mainNav = document.querySelector('nav.tabs');
const bottomNav = document.querySelector('footer.bottom');
const main = document.querySelector('main');

extraTabs.forEach(([id,label])=>{
  if ($(id)) return;

  const top = document.createElement('button');
  top.className='tab';
  top.dataset.extraView=id;
  top.textContent=label;
  mainNav?.appendChild(top);

  const bottom = document.createElement('button');
  bottom.dataset.extraView=id;
  bottom.textContent=label;
  bottomNav?.appendChild(bottom);

  const section=document.createElement('section');
  section.id=id;
  section.className='view';
  section.innerHTML=`
    <div class="section-title">
      <h2>${label}</h2>
      <span class="muted" id="${id}-count"></span>
    </div>
    <div class="controls">
      <label class="field search">Search
        <input id="${id}-search" type="search" placeholder="Search ${label}...">
      </label>
      <label class="field">Format
        <select id="${id}-format">
          <option value="all">All formats</option>
          <option>Movie</option>
          <option>Series</option>
          <option>Animated Series</option>
          <option>Animated Movie</option>
          <option>Special</option>
          <option>Short</option>
          <option>TV Movie</option>
          <option>Serial</option>
        </select>
      </label>
      <label class="field">Order
        <select id="${id}-sort">
          <option value="release">Release order</option>
          <option value="story">Story order</option>
          <option value="title">Title order</option>
        </select>
      </label>
    </div>
    <div id="${id}-items"></div>
  `;
  main?.appendChild(section);
});

document.addEventListener('click',event=>{
  const button=event.target.closest('[data-extra-view]');
  if (!button) return;

  const id=button.dataset.extraView;
  setView(id);
  renderExtraTab(id);
});

/* ----------------------------------------------------------
   IMAGE LOADING
   Wikipedia page summaries provide image thumbnails.
   If no image is available, the card remains usable.
   ---------------------------------------------------------- */

const imageCache=new Map();

async function getImage(searchTitle) {
  if (!searchTitle) return '';
  if (imageCache.has(searchTitle)) return imageCache.get(searchTitle);

  try {
    const url='https://en.wikipedia.org/api/rest_v1/page/summary/'+
      encodeURIComponent(searchTitle.replaceAll(' ','_'));

    const response=await fetch(url);
    if (!response.ok) throw new Error('Image unavailable');

    const data=await response.json();
    const image=data.thumbnail?.source || '';
    imageCache.set(searchTitle,image);
    return image;
  } catch {
    imageCache.set(searchTitle,'');
    return '';
  }
}

function loadImage(element,searchTitle) {
  if (!element || !searchTitle) return;

  getImage(searchTitle).then(url=>{
    if (!url || !element.isConnected) return;

    const image=document.createElement('img');
    image.src=url;
    image.alt=searchTitle;
    image.loading='lazy';
    image.style.cssText='width:100%;max-height:230px;object-fit:cover;border-radius:12px;margin-bottom:10px;background:#1b2738;';
    image.onerror=()=>image.remove();
    element.prepend(image);
  });
}

/* ----------------------------------------------------------
   COUNTDOWN
   Australian release date: 17 December 2026
   ---------------------------------------------------------- */

function renderCountdown() {
  const target=new Date('2026-12-17T00:00:00+11:00').getTime();
  const remaining=Math.max(0,target-Date.now());

  const values=[
    [Math.floor(remaining/86400000),'DAYS'],
    [Math.floor(remaining%86400000/3600000),'HOURS'],
    [Math.floor(remaining%3600000/60000),'MINUTES'],
    [Math.floor(remaining%60000/1000),'SECONDS']
  ];

  if ($('countdown')) {
    $('countdown').innerHTML=values.map(([number,label])=>`
      <div class="countbox">
        <strong>${number}</strong>
        <span>${label}</span>
      </div>
    `).join('');
  }
}

/* ----------------------------------------------------------
   TITLE SORTING AND DISPLAY
   ---------------------------------------------------------- */

function sortedTitles(list,mode) {
  const copy=[...list];

  if (mode==='release') return copy.sort((a,b)=>a[5]-b[5]);
  if (mode==='title') return copy.sort((a,b)=>a[1].localeCompare(b[1]));

  return copy.sort((a,b)=>a[4]-b[4]);
}

function titleRow(item) {
  const [id,title,type,universe,story,release,essential,description,extra]=item;

  const watched=progress.watched.includes(id);
  const saved=progress.watchlist.includes(id);

  return `
  <article class="item ${watched?'done':''}">
    <div class="poster">${type.toLowerCase().includes('series')?'📺':type==='Short'||type==='Special'?'✨':'🎬'}</div>
    <div class="item-main">
      <div class="item-title">${escapeHTML(title)}</div>
      <div class="item-meta">${escapeHTML(type)} · ${escapeHTML(universe)} · Story: ${story||'Unknown'} · Released: ${release}</div>
      <div class="item-note">${escapeHTML(description)}</div>
      ${extra?`<div class="item-meta">${escapeHTML(extra)}</div>`:''}
      ${essential?'<span class="chip">Doomsday essential</span>':''}
      <div class="actions" style="margin-top:7px">
        <button class="btn" data-watch="${id}">${watched?'Mark unwatched':'Mark watched'}</button>
        <button class="btn" data-save="${id}">${saved?'Remove from watchlist':'Add to watchlist'}</button>
      </div>
    </div>
  </article>`;
}

/* ----------------------------------------------------------
   MAIN LIBRARY
   ---------------------------------------------------------- */

function renderLibrary() {
  if (!$('items')) return;

  const search=($('search')?.value||'').toLowerCase();
  const universe=$('filterUniverse')?.value||'all';

  let list=titles.filter(item=>{
    const matches=item.join(' ').toLowerCase().includes(search);
    const matchesUniverse=universe==='all'||item[3]===universe;

    const matchesMode=
      libraryMode==='all' ||
      (libraryMode==='essential'&&item[6]) ||
      (libraryMode==='unwatched'&&!progress.watched.includes(item[0]));

    return matches&&matchesUniverse&&matchesMode;
  });

  list=sortedTitles(list,$('sort')?.value||'story');

  $('resultCount').textContent=`${list.length} titles`;
  $('items').innerHTML=list.length
    ? list.map(titleRow).join('')
    : '<p class="note">No titles found.</p>';
}

/* ----------------------------------------------------------
   ALL MARVEL AND MCU COLLECTIONS
   ---------------------------------------------------------- */

function renderCollection(id,source) {
  const search=($(id+'-search')?.value||'').toLowerCase();
  const format=$(id+'-format')?.value||'all';
  const sort=$(id+'-sort')?.value||'release';

  let list=source.filter(item=>
    item.join(' ').toLowerCase().includes(search) &&
    (format==='all'||item[2]===format)
  );

  list=sortedTitles(list,sort);

  $(id+'-count').textContent=`${list.length} titles`;

  $(id+'-items').innerHTML=list.length
    ? list.map(titleRow).join('')
    : '<p class="note">No matching titles found.</p>';
}

function renderAllMarvel() {
  renderCollection('all-marvel',titles);
}

function renderMCU() {
  renderCollection('mcu-only',titles.filter(item=>item[3]==='MCU'));
}

/* ----------------------------------------------------------
   UPCOMING MCU
   ---------------------------------------------------------- */

function renderUpcoming() {
  const search=($('upcoming-mcu-search')?.value||'').toLowerCase();
  const list=upcoming.filter(item=>item.join(' ').toLowerCase().includes(search));

  $('upcoming-mcu-count').textContent=`${list.length} projects`;

  $('upcoming-mcu-items').innerHTML=`
    <p class="note">Release dates and project status can change. Reported dates are identified separately from official announcements.</p>
    ${list.map(item=>`
      <article class="character-card">
        <h3>${escapeHTML(item[0])}</h3>
        <p><b>${escapeHTML(item[1])}</b></p>
        <p><b>Release:</b> ${escapeHTML(item[2])}</p>
        <p>${escapeHTML(item[3])}</p>
      </article>
    `).join('')}
  `;
}

/* ----------------------------------------------------------
   CANCELLED PROJECTS
   ---------------------------------------------------------- */

function renderCancelled() {
  const search=($('cancelled-search')?.value||'').toLowerCase();
  const list=cancelled.filter(item=>item.join(' ').toLowerCase().includes(search));

  $('cancelled-count').textContent=`${list.length} projects`;

  $('cancelled-items').innerHTML=`
    <p class="note">This collection distinguishes officially cancelled projects from abandoned proposals and projects whose status is uncertain.</p>
    ${list.map(item=>`
      <article class="character-card">
        <h3>${escapeHTML(item[0])}</h3>
        <p><b>${escapeHTML(item[1])}</b> · ${escapeHTML(item[2])}</p>
        <p>${escapeHTML(item[3])}</p>
      </article>
    `).join('')}
  `;
}

function renderExtraTab(id) {
  if (id==='all-marvel') renderAllMarvel();
  if (id==='mcu-only') renderMCU();
  if (id==='upcoming-mcu') renderUpcoming();
  if (id==='cancelled') renderCancelled();
}

/* ----------------------------------------------------------
   UNIVERSES
   ---------------------------------------------------------- */

function renderUniverses() {
  if (!$('universeGrid')) return;

  $('universeGrid').innerHTML=universes.map(universe=>`
    <button class="universe" data-universe="${escapeHTML(universe)}">
      <span style="font-size:24px">🌌</span>
      <b>${escapeHTML(universe)}</b>
      <small>${titles.filter(item=>item[3]===universe).length} titles</small>
    </button>
  `).join('');

  if ($('homeUniverses')) {
    $('homeUniverses').innerHTML=universes.map(universe=>`
      <button class="card" data-universe="${escapeHTML(universe)}">
        <div class="emoji">🌠</div>
        <h3>${escapeHTML(universe)}</h3>
        <p>${titles.filter(item=>item[3]===universe).length} titles</p>
      </button>
    `).join('');
  }
}

/* ----------------------------------------------------------
   CHARACTER ENCYCLOPEDIA AND IMAGES
   ---------------------------------------------------------- */

function renderCharacters() {
  if (!$('characterItems')) return;

  const search=($('characterSearch')?.value||'').toLowerCase();
  const universe=$('characterUniverse')?.value||'all';

  const list=characters.filter(character=>
    character.join(' ').toLowerCase().includes(search) &&
    (universe==='all'||character[3]===universe)
  );

  $('characterCount').textContent=`${list.length} characters`;

  $('characterItems').innerHTML=list.map((character,index)=>`
    <article class="character-card">
      <h3>${escapeHTML(character[1])}</h3>
      <p><b>Real name:</b> ${escapeHTML(character[0])}</p>
      <p>${escapeHTML(character[2])}</p>
      <p><b>Universe:</b> ${escapeHTML(character[3])}</p>
      <p><b>Powers:</b> ${escapeHTML(character[4])}</p>
      <p><b>Affiliations:</b> ${escapeHTML(character[5])}</p>
      <p><b>Allies:</b> ${escapeHTML(character[6])}</p>
      <p><b>Enemies:</b> ${escapeHTML(character[7])}</p>
      <p><b>Screen appearances:</b> ${escapeHTML(character[8])}</p>
      <div class="image-slot" id="character-image-${index}"></div>
    </article>
  `).join('');

  list.forEach((character,index)=>{
    loadImage($('character-image-'+index),character[9]);
  });
}

/* ----------------------------------------------------------
   TEAM ENCYCLOPEDIA AND IMAGES
   ---------------------------------------------------------- */

function renderTeams() {
  if (!$('teamItems')) return;

  $('teamItems').innerHTML=teams.map((team,index)=>`
    <article class="character-card">
      <h3>${escapeHTML(team[0])}</h3>
      <p>${escapeHTML(team[1])}</p>
      <p><b>History:</b> ${escapeHTML(team[2])}</p>
      <p><b>Roster:</b> ${escapeHTML(team[3])}</p>
      <p><b>Rivals:</b> ${escapeHTML(team[4])}</p>
      <p><b>Screen appearances:</b> ${escapeHTML(team[5])}</p>
      <div class="image-slot" id="team-image-${index}"></div>
    </article>
  `).join('');

  teams.forEach((team,index)=>{
    loadImage($('team-image-'+index),team[6]);
  });
}

/* ----------------------------------------------------------
   TIMELINE
   ---------------------------------------------------------- */

function renderTimeline() {
  if (!$('timelineItems')) return;

  const mode=$('timelineSort')?.value||'story';
  const universe=$('timelineUniverse')?.value||'all';

  let list=titles.filter(item=>universe==='all'||item[3]===universe);
  list=sortedTitles(list,mode);

  $('timelineItems').innerHTML=list.map(item=>`
    <article class="item">
      <div class="poster">◷</div>
      <div class="item-main">
        <div class="item-title">${escapeHTML(item[1])}</div>
        <div class="item-meta">${escapeHTML(item[3])} · ${escapeHTML(item[2])}</div>
        <div class="item-note">${mode==='release'?'Release year':'Approximate story year'}: ${mode==='release'?item[5]:item[4]}</div>
      </div>
    </article>
  `).join('');
}

/* ----------------------------------------------------------
   WATCHLIST AND PROGRESS
   ---------------------------------------------------------- */

function renderWatchlist() {
  if (!$('watchItems')) return;

  const list=titles.filter(item=>progress.watchlist.includes(item[0]));

  $('watchCount').textContent=`${list.length} saved titles`;

  $('watchItems').innerHTML=list.length
    ? list.map(titleRow).join('')
    : '<p class="note">Your watchlist is empty. Add titles from the library.</p>';
}

function renderHomeProgress() {
  const watched=progress.watched.length;
  const percent=Math.round(watched/Math.max(titles.length,1)*100);

  if ($('progressPct')) $('progressPct').textContent=`${percent}%`;
  if ($('progressText')) $('progressText').textContent=`${watched} of ${titles.length} titles watched`;
  if ($('progressFill')) $('progressFill').style.width=`${percent}%`;
}

/* ----------------------------------------------------------
   MAIN RENDER
   ---------------------------------------------------------- */

function renderAll() {
  renderLibrary();
  renderUniverses();
  renderCharacters();
  renderTeams();
  renderTimeline();
  renderWatchlist();
  renderHomeProgress();
  renderAllMarvel();
  renderMCU();
  renderUpcoming();
  renderCancelled();
}

/* ----------------------------------------------------------
   WATCHED AND WATCHLIST BUTTONS
   ---------------------------------------------------------- */

document.addEventListener('click',event=>{
  const watchButton=event.target.closest('[data-watch]');

  if (watchButton) {
    const id=watchButton.dataset.watch;

    progress.watched=progress.watched.includes(id)
      ? progress.watched.filter(value=>value!==id)
      : [...progress.watched,id];

    saveProgress();
    return;
  }

  const saveButton=event.target.closest('[data-save]');

  if (saveButton) {
    const id=saveButton.dataset.save;

    progress.watchlist=progress.watchlist.includes(id)
      ? progress.watchlist.filter(value=>value!==id)
      : [...progress.watchlist,id];

    saveProgress();
    return;
  }

  const universeButton=event.target.closest('[data-universe]');

  if (universeButton) {
    const universe=universeButton.dataset.universe;

    if ($('filterUniverse')) $('filterUniverse').value=universe;
    if ($('timelineUniverse')) $('timelineUniverse').value=universe;

    setView('library');
    renderLibrary();
  }
});

/* ----------------------------------------------------------
   LIBRARY FILTER BUTTONS
   ---------------------------------------------------------- */

document.querySelectorAll('[data-mode]').forEach(button=>{
  button.addEventListener('click',()=>{
    libraryMode=button.dataset.mode;

    document.querySelectorAll('[data-mode]').forEach(item=>{
      item.classList.toggle('primary',item===button);
    });

    renderLibrary();
  });
});

/* ----------------------------------------------------------
   SEARCH AND FILTER EVENTS
   ---------------------------------------------------------- */

['search','sort','filterUniverse'].forEach(id=>{
  $(id)?.addEventListener('input',renderLibrary);
  $(id)?.addEventListener('change',renderLibrary);
});

['characterSearch','characterUniverse'].forEach(id=>{
  $(id)?.addEventListener('input',renderCharacters);
  $(id)?.addEventListener('change',renderCharacters);
});

['timelineSort','timelineUniverse'].forEach(id=>{
  $(id)?.addEventListener('change',renderTimeline);
});

['all-marvel','mcu-only'].forEach(id=>{
  [id+'-search',id+'-format',id+'-sort'].forEach(control=>{
    $(control)?.addEventListener('input',()=>{
      id==='all-marvel'?renderAllMarvel():renderMCU();
    });
    $(control)?.addEventListener('change',()=>{
      id==='all-marvel'?renderAllMarvel():renderMCU();
    });
  });
});

$('upcoming-mcu-search')?.addEventListener('input',renderUpcoming);
$('cancelled-search')?.addEventListener('input',renderCancelled);

/* ----------------------------------------------------------
   EXPORT PROGRESS
   ---------------------------------------------------------- */

$('exportBtn')?.addEventListener('click',()=>{
  const file=new Blob(
    [JSON.stringify(progress,null,2)],
    {type:'application/json'}
  );

  const url=URL.createObjectURL(file);
  const link=document.createElement('a');

  link.href=url;
  link.download='marvel-marathon-progress.json';
  link.click();

  URL.revokeObjectURL(url);
});

/* ----------------------------------------------------------
   RESET PROGRESS
   ---------------------------------------------------------- */

$('resetBtn')?.addEventListener('click',()=>{
  if (!confirm('Reset all watched titles and saved watchlist items?')) return;

  progress={watched:[],watchlist:[]};
  saveProgress();
});

/* ----------------------------------------------------------
   INITIALIZE
   ---------------------------------------------------------- */
/* FANTASTIC FOUR COLLECTION */

titles.push(
  ['fantastic-four-2005', 'Fantastic Four', 'Movie', 'Fantastic Four', 2005, 2005, 0, 'Reed Richards and his team gain extraordinary powers.', 'Starring Ioan Gruffudd, Jessica Alba, Chris Evans and Michael Chiklis'],
  ['fantastic-four-2007', 'Fantastic Four: Rise of the Silver Surfer', 'Movie', 'Fantastic Four', 2007, 2007, 0, 'The Fantastic Four face the Silver Surfer.', ''],
  ['fantastic-four-2015', 'Fantastic Four', 'Movie', 'Fantastic Four', 2015, 2015, 0, 'A new team discovers extraordinary abilities.', ''],
  ['fantastic-four-first-collection', 'The Fantastic Four: First Steps', 'Movie', 'Fantastic Four', 1960, 2025, 1, 'Marvel’s First Family enters the multiverse.', 'Also listed in the MCU collection']
);



/* ==========================================================
   DOOMSDAY PREP — DEDICATED PAGE + BOTTOM NAVIGATION
   ========================================================== */

const doomsdayNav = document.querySelector('nav.tabs');
const doomsdayBottom = document.querySelector('footer.bottom');

function addDoomsdayButton(nav, isTop) {
  if (!nav || nav.querySelector('[data-doomsday-tab]')) return;

  const button = document.createElement('button');
  button.dataset.doomsdayTab = 'true';
  button.textContent = 'Doomsday Prep';

  if (isTop) {
    button.className = 'tab';
  }

  nav.appendChild(button);
}

addDoomsdayButton(doomsdayNav, true);
addDoomsdayButton(doomsdayBottom, false);

/* CREATE DOOMSDAY PAGE */

if (!$('doomsday-prep')) {
  const section = document.createElement('section');

  section.id = 'doomsday-prep';
  section.className = 'view';

  section.innerHTML = `
    <div class="section-title">
      <h2>Avengers: Doomsday Prep</h2>
      <span class="muted" id="doomsday-count"></span>
    </div>

    <div class="feature">
      <div class="muted">THE ROAD TO DOOMSDAY</div>
      <h3>Prepare for the next Avengers event</h3>
      <p class="note">
        Follow the essential Marvel movies and series
        leading into Avengers: Doomsday.
      </p>
    </div>

    <div class="controls">
      <label class="field search">
        Search
        <input id="doomsday-search"
          type="search"
          placeholder="Search essential titles...">
      </label>

      <label class="field">
        Order
        <select id="doomsday-sort">
          <option value="story">Story order</option>
          <option value="release">Release order</option>
          <option value="title">Title order</option>
        </select>
      </label>
    </div>

    <div id="doomsday-items"></div>
  `;

  document.querySelector('main')?.appendChild(section);
}

/* DISPLAY ESSENTIAL TITLES */

function renderDoomsdayPrep() {
  const search = ($('doomsday-search')?.value || '').toLowerCase();

  let list = titles.filter(item =>
    item[6] === 1 &&
    item.join(' ').toLowerCase().includes(search)
  );

  list = sortedTitles(
    list,
    $('doomsday-sort')?.value || 'story'
  );

  const watched = list.filter(item =>
    progress.watched.includes(item[0])
  ).length;

  $('doomsday-count').textContent =
    `${watched} of ${list.length} watched`;

  $('doomsday-items').innerHTML = list.length
    ? list.map(titleRow).join('')
    : '<p class="note">No matching titles found.</p>';
}

/* NAVIGATION */

document.addEventListener('click', event => {
  const button = event.target.closest('[data-doomsday-tab]');
  if (!button) return;

  setView('doomsday-prep');
  renderDoomsdayPrep();
});

/* SEARCH AND SORT */

$('doomsday-search')?.addEventListener(
  'input',
  renderDoomsdayPrep
);

$('doomsday-sort')?.addEventListener(
  'change',
  renderDoomsdayPrep
);

/* ==========================================================
   END DOOMSDAY PREP
   ========================================================== */


renderAll();


renderAll();
renderCountdown();
setInterval(renderCountdown,1000);

console.log('MARVEL MARATHON initialized.');

})();


/* DOOMSDAY PREP — FORCE NAVIGATION BUTTONS */
(() => {
  const topNav = document.querySelector('nav.tabs');
  const bottomNav = document.querySelector('footer.bottom');

  function addButton(nav, isTop) {
    if (!nav) return;

    let button = nav.querySelector('[data-doomsday-tab]');

    if (!button) {
      button = document.createElement('button');
      button.dataset.doomsdayTab = 'true';
      button.textContent = 'Doomsday Prep';

      if (isTop) button.className = 'tab';

      nav.appendChild(button);
    }

    const libraryButton = nav.querySelector('[data-view="library"]');

    if (libraryButton) {
      libraryButton.after(button);
    }
  }

  addButton(topNav, true);
  addButton(bottomNav, false);
})();

/* ======================================================
   CHARACTER IMAGE UPGRADE — MCU ACTORS + COMIC ART
   ====================================================== */
(() => {
  const characterImages = {
    "Iron Man": ["Robert Downey Jr.", "Iron Man (character)"],
    "Captain America": ["Chris Evans (actor)", "Captain America(comic book character"],
    "Thor": ["Chris Hemsworth", "Thor (Marvel Comics)"],
    "Hulk": ["Mark Ruffalo", "Hulk (comics)"],
    "Black Widow": ["Scarlett Johansson", "Black Widow (Natasha Romanova)"],
    "Hawkeye": ["Jeremy Renner", "Hawkeye (Clint Barton)"],
    "Spider-Man": ["Tom Holland (actor)", "Spider-Man"],
    "Doctor Strange": ["Benedict Cumberbatch", "Doctor Strange"],
    "Black Panther": ["Chadwick Boseman", "Black Panther (character)"],
    "Captain Marvel": ["Brie Larson", "Captain Marvel (Carol Danvers)"],
    "Scarlet Witch": ["Elizabeth Olsen", "Scarlet Witch"],
    "Loki": ["Tom Hiddleston", "Loki (Marvel Comics)"],
    "Deadpool": ["Ryan Reynolds", "Deadpool"],
    "Wolverine": ["Hugh Jackman", "Wolverine (character)"],
    "Professor X": ["Patrick Stewart", "Professor X"],
    "Magneto": ["Ian McKellen", "Magneto (Marvel Comics)"],
    "Phoenix": ["Sophie Turner", "Jean Grey"],
    "Miles Morales": ["Shameik Moore", "Miles Morales"],
    "Venom": ["Tom Hardy", "Venom (character)"],
    "Mister Fantastic": ["Pedro Pascal", "Mister Fantastic"],
    "Invisible Woman": ["Vanessa Kirby", "Invisible Woman"],
    "Human Torch": ["Joseph Quinn (actor)", "Human Torch"],
    "The Thing": ["Ebon Moss-Bachrach", "Thing (comics)"],
    "Daredevil": ["Charlie Cox (actor)", "Daredevil(Marvel Comics character)"],
    "The Punisher": ["Jon Bernthal", "Punisher"],
    "Jessica Jones": ["Krysten Ritter", "Jessica Jones"],
    "Luke Cage": ["Mike Colter", "Luke Cage"],
    "Ms. Marvel": ["Iman Vellani", "Kamala Khan"],
    "Yelena Belova": ["Florence Pugh", "Yelena Belova"]
  };

  const imageCache = new Map();

  async function getPicture(page) {
    if (imageCache.has(page)) return imageCache.get(page);

    try {
      const response = await fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        encodeURIComponent(page.replaceAll(" ", "_"))
      );

      if (!response.ok) return "";

      const data = await response.json();
      const url = data.thumbnail?.source || "";
      imageCache.set(page, url);
      return url;
    } catch {
      return "";
    }
  }

  async function addPictures(card) {
    const heading = card.querySelector("h3");
    const slot = card.querySelector(".image-slot");
    if (!heading || !slot || slot.dataset.upgraded) return;

    const names = characterImages[heading.textContent.trim()];
    if (!names) return;

    slot.dataset.upgraded = "true";
    slot.innerHTML = "";

    const labels = ["MCU ACTOR", "COMIC ARTWORK"];

    for (let i = 0; i < names.length; i++) {
      const figure = document.createElement("figure");
      figure.style.cssText = "margin:10px 0;";

      const caption = document.createElement("figcaption");
      caption.textContent = labels[i];
      caption.style.cssText =
        "font-weight:bold;font-size:12px;color:#9db8ff;margin-bottom:6px;";

      const img = document.createElement("img");
      img.alt = heading.textContent + " - " + labels[i];
      img.loading = "lazy";
      img.style.cssText =
        "width:100%;max-height:240px;object-fit:contain;" +
        "border-radius:12px;background:#1b2738;";

      figure.append(caption, img);
      slot.appendChild(figure);

      const url = await getPicture(names[i]);
      if (url) {
        img.src = url;
      } else {
        caption.textContent += " — image unavailable";
      }
    }
  }

  function upgradeCharacters() {
    document.querySelectorAll("#characterItems .character-card")
      .forEach(addPictures);
  }

  upgradeCharacters();

  new MutationObserver(upgradeCharacters).observe(
    document.getElementById("characterItems") || document.body,
    { childList: true, subtree: true }
  );
})();


/* =========================================================
   MARVEL POSTER UPGRADE — FIXED FOR EXISTING APP
   Works with the existing .item and .poster elements
   ========================================================= */

(() => {
  "use strict";

  const cache = new Map();

  const style = document.createElement("style");
  style.textContent = `
    .item .poster {
      width: 82px !important;
      height: 118px !important;
      min-width: 82px;
      flex: 0 0 82px !important;
      overflow: hidden;
      padding: 0;
      border-radius: 9px;
      background: linear-gradient(145deg,#17243b,#8d172d);
      display: grid;
      place-items: center;
    }

    .item .poster img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .item .poster.poster-loading {
      color: white;
      font-size: 17px;
      font-weight: 900;
      letter-spacing: 2px;
    }

    @media(max-width:480px) {
      .item .poster {
        width: 75px !important;
        height: 108px !important;
        min-width: 75px;
        flex-basis: 75px !important;
      }
    }
  `;
  document.head.appendChild(style);

  function getTitle(card) {
    return card.querySelector(".item-title")?.textContent.trim() || "";
  }

  async function findPoster(title) {
    if (cache.has(title)) return cache.get(title);

    let image = "";

    try {
      // First attempt: exact Wikipedia article.
      const exactURL =
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
        encodeURIComponent(title.replaceAll(" ", "_"));

      const exactResponse = await fetch(exactURL);

      if (exactResponse.ok) {
        const data = await exactResponse.json();
        image = data.thumbnail?.source || "";
      }

      // Second attempt: search Wikipedia for a matching article.
      if (!image) {
        const searchURL =
          "https://en.wikipedia.org/w/api.php?" +
          new URLSearchParams({
            action: "query",
            generator: "search",
            gsrsearch: title + " film",
            gsrnamespace: "0",
            gsrlimit: "5",
            prop: "pageimages",
            piprop: "thumbnail",
            pithumbsize: "500",
            format: "json",
            origin: "*"
          });

        const response = await fetch(searchURL);

        if (response.ok) {
          const data = await response.json();
          const pages = Object.values(data.query?.pages || {});
          const match = pages.find(page => page.thumbnail?.source);
          image = match?.thumbnail?.source || "";
        }
      }
    } catch (error) {
      console.warn("Poster unavailable:", title, error);
    }

    cache.set(title, image);
    return image;
  }

  async function upgradeCard(card) {
    const poster = card.querySelector(".poster");
    const title = getTitle(card);

    if (!poster || !title || poster.dataset.posterDone === "true") {
      return;
    }

    poster.dataset.posterDone = "true";
    poster.classList.add("poster-loading");
    poster.textContent = "MARVEL";

    const imageURL = await findPoster(title);

    if (!imageURL || !poster.isConnected) {
      poster.textContent = "MARVEL";
      return;
    }

    const img = document.createElement("img");
    img.src = imageURL;
    img.alt = title + " poster";
    img.loading = "lazy";

    img.onerror = () => {
      img.remove();
      poster.textContent = "MARVEL";
    };

    poster.classList.remove("poster-loading");
    poster.replaceChildren(img);
  }

  function upgradeAllPosters() {
    document.querySelectorAll(".item").forEach(upgradeCard);
  }

  // Upgrade titles already displayed.
  upgradeAllPosters();

  // Upgrade titles whenever the app redraws a list.
  const observer = new MutationObserver(() => {
    upgradeAllPosters();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  window.MarvelPosterUpgrade = {
    refresh: upgradeAllPosters,
    findPoster
  };

  console.log("Marvel poster upgrade active.");
})();
