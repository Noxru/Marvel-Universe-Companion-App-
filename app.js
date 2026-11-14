/* MARVEL MARATHON — complete app.js replacement
   Keeps the existing localStorage key: marvelMarathonCompanionProgress
*/
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const KEY = 'marvelMarathonCompanionProgress';
  const universes = ['MCU', 'X-Men', 'Deadpool', 'Fantastic Four', 'Sony Spider-Man', 'Other Marvel'];

  // [id, title, format, universe, storyYear, releaseYear, essential, description, seasons/status]
  const titles = [
    ['captain-america-first-avenger','Captain America: The First Avenger','Movie','MCU',1943,2011,1,'Steve Rogers becomes the first Avenger.',''],
    ['agent-carter-one-shot','Agent Carter (One-Shot)','Short','MCU',1946,2013,0,'Peggy Carter takes on a covert mission.',''],
    ['agent-carter-s1','Agent Carter — Season 1','Series','MCU',1946,2015,0,'Peggy Carter works for the SSR.','8 episodes · 2 seasons total · cancelled'],
    ['agent-carter-s2','Agent Carter — Season 2','Series','MCU',1947,2016,0,'Peggy investigates a new threat in Los Angeles.','10 episodes · cancelled'],
    ['captain-marvel','Captain Marvel','Movie','MCU',1995,2019,1,'Carol Danvers discovers her past and powers.',''],
    ['iron-man','Iron Man','Movie','MCU',2008,2008,1,'Tony Stark builds the first Iron Man suit.',''],
    ['iron-man-2','Iron Man 2','Movie','MCU',2010,2010,1,'Tony faces new threats and meets Natasha Romanoff.',''],
    ['incredible-hulk','The Incredible Hulk','Movie','MCU',2010,2008,0,'Bruce Banner searches for a cure.',''],
    ['thor','Thor','Movie','MCU',2011,2011,1,'The God of Thunder is exiled to Earth.',''],
    ['avengers','The Avengers','Movie','MCU',2012,2012,1,'Earth’s heroes unite against Loki.',''],
    ['iron-man-3','Iron Man 3','Movie','MCU',2012,2013,0,'Tony Stark faces the Mandarin threat.',''],
    ['thor-dark-world','Thor: The Dark World','Movie','MCU',2013,2013,0,'Thor confronts the Dark Elves.',''],
    ['winter-soldier','Captain America: The Winter Soldier','Movie','MCU',2014,2014,1,'Steve uncovers a conspiracy inside S.H.I.E.L.D.',''],
    ['guardians-1','Guardians of the Galaxy','Movie','MCU',2014,2014,1,'A group of misfits protect the galaxy.',''],
    ['guardians-2','Guardians of the Galaxy Vol. 2','Movie','MCU',2014,2017,0,'The Guardians uncover Peter Quill’s origins.',''],
    ['avengers-ultron','Avengers: Age of Ultron','Movie','MCU',2015,2015,1,'The Avengers face an artificial intelligence.',''],
    ['ant-man','Ant-Man','Movie','MCU',2015,2015,0,'Scott Lang becomes the Ant-Man.',''],
    ['civil-war','Captain America: Civil War','Movie','MCU',2016,2016,1,'The Avengers split over government oversight.',''],
    ['black-widow','Black Widow','Movie','MCU',2016,2021,1,'Natasha confronts her past.',''],
    ['black-panther','Black Panther','Movie','MCU',2016,2018,1,'T’Challa returns to Wakanda.',''],
    ['homecoming','Spider-Man: Homecoming','Movie','MCU',2016,2017,1,'Peter Parker balances school and heroism.',''],
    ['doctor-strange','Doctor Strange','Movie','MCU',2016,2016,1,'Stephen Strange discovers the mystic arts.',''],
    ['thor-ragnarok','Thor: Ragnarok','Movie','MCU',2017,2017,1,'Thor fights to save Asgard.',''],
    ['antman-wasp','Ant-Man and the Wasp','Movie','MCU',2018,2018,0,'Scott and Hope explore the Quantum Realm.',''],
    ['infinity-war','Avengers: Infinity War','Movie','MCU',2018,2018,1,'Thanos begins his quest for the Infinity Stones.',''],
    ['endgame','Avengers: Endgame','Movie','MCU',2023,2019,1,'The Avengers attempt to undo the Snap.',''],
    ['loki-s1','Loki — Season 1','Series','MCU',2023,2021,1,'Loki is drawn into the Time Variance Authority.','6 episodes'],
    ['loki-s2','Loki — Season 2','Series','MCU',2023,2023,1,'Loki fights to save the multiverse.','6 episodes'],
    ['wandavision','WandaVision','Series','MCU',2023,2021,1,'Wanda and Vision live through changing sitcom realities.','9 episodes · limited series'],
    ['falcon-winter','The Falcon and the Winter Soldier','Series','MCU',2024,2021,1,'Sam Wilson and Bucky Barnes face a changing world.','6 episodes'],
    ['shang-chi','Shang-Chi and the Legend of the Ten Rings','Movie','MCU',2024,2021,1,'Shang-Chi confronts his family history.',''],
    ['eternals','Eternals','Movie','MCU',2024,2021,0,'Ancient beings emerge from the shadows.',''],
    ['far-from-home','Spider-Man: Far From Home','Movie','MCU',2024,2019,1,'Peter Parker faces a new threat after Endgame.',''],
    ['no-way-home','Spider-Man: No Way Home','Movie','MCU',2024,2021,1,'Peter’s identity crisis opens the multiverse.',''],
    ['hawkeye','Hawkeye','Series','MCU',2024,2021,0,'Clint Barton teams up with Kate Bishop.','6 episodes'],
    ['moon-knight','Moon Knight','Series','MCU',2025,2022,0,'Marc Spector encounters an Egyptian god.','6 episodes'],
    ['multiverse-madness','Doctor Strange in the Multiverse of Madness','Movie','MCU',2025,2022,1,'Strange travels through alternate realities.',''],
    ['wakanda-forever','Black Panther: Wakanda Forever','Movie','MCU',2025,2022,1,'Wakanda faces a new global challenge.',''],
    ['echo','Echo','Series','MCU',2025,2024,0,'Maya Lopez returns to her hometown.','5 episodes'],
    ['she-hulk','She-Hulk: Attorney at Law','Series','MCU',2025,2022,0,'Jennifer Walters balances law and superpowers.','9 episodes'],
    ['ms-marvel','Ms. Marvel','Series','MCU',2025,2022,1,'Kamala Khan discovers her abilities.','6 episodes'],
    ['thor-love-thunder','Thor: Love and Thunder','Movie','MCU',2025,2022,0,'Thor faces Gorr the God Butcher.',''],
    ['werewolf-night','Werewolf by Night','Special','MCU',2025,2022,0,'A group of monster hunters gather.','TV special'],
    ['guardians-holiday','The Guardians of the Galaxy Holiday Special','Special','MCU',2025,2022,0,'The Guardians plan a holiday surprise.','TV special'],
    ['quantumania','Ant-Man and the Wasp: Quantumania','Movie','MCU',2026,2023,1,'The Ant-Family enters the Quantum Realm.',''],
    ['guardians-3','Guardians of the Galaxy Vol. 3','Movie','MCU',2026,2023,1,'The Guardians face Rocket’s past.',''],
    ['secret-invasion','Secret Invasion','Series','MCU',2026,2023,0,'Nick Fury uncovers a Skrull infiltration.','6 episodes · limited series'],
    ['marvels','The Marvels','Movie','MCU',2026,2023,1,'Carol, Monica and Kamala become entangled.',''],
    ['deadpool-wolverine','Deadpool & Wolverine','Movie','Deadpool',2024,2024,1,'Deadpool enters a wider multiverse adventure.',''],
    ['x-men-1','X-Men','Movie','X-Men',2000,2000,1,'The X-Men face a world that fears mutants.',''],
    ['x2','X2: X-Men United','Movie','X-Men',2003,2003,1,'Mutants confront a threat to their survival.',''],
    ['last-stand','X-Men: The Last Stand','Movie','X-Men',2006,2006,0,'A cure divides the mutant community.',''],
    ['origins-wolverine','X-Men Origins: Wolverine','Movie','X-Men',1979,2009,0,'Wolverine’s origins are explored.',''],
    ['first-class','X-Men: First Class','Movie','X-Men',1962,2011,1,'A young Charles Xavier and Erik Lehnsherr meet.',''],
    ['the-wolverine','The Wolverine','Movie','X-Men',2013,2013,0,'Logan travels to Japan.',''],
    ['days-future-past','X-Men: Days of Future Past','Movie','X-Men',1973,2014,1,'The X-Men attempt to change the future.',''],
    ['apocalypse','X-Men: Apocalypse','Movie','X-Men',1983,2016,0,'The X-Men face an ancient mutant.',''],
    ['logan','Logan','Movie','X-Men',2029,2017,1,'An older Logan protects a young mutant.',''],
    ['dark-phoenix','Dark Phoenix','Movie','X-Men',1992,2019,0,'Jean Grey struggles with a powerful force.',''],
    ['new-mutants','The New Mutants','Movie','X-Men',2020,2020,0,'Young mutants are held in a secret facility.',''],
    ['legion-s1','Legion — Season 1','Series','X-Men',2017,2017,0,'David Haller questions reality.','8 episodes'],
    ['legion-s2','Legion — Season 2','Series','X-Men',2018,2018,0,'David’s story becomes increasingly fractured.','11 episodes'],
    ['legion-s3','Legion — Season 3','Series','X-Men',2019,2019,0,'The final chapter of David Haller’s story.','8 episodes · ended'],
    ['gifted-s1','The Gifted — Season 1','Series','X-Men',2017,2017,0,'A family goes on the run in a world hostile to mutants.','13 episodes'],
    ['gifted-s2','The Gifted — Season 2','Series','X-Men',2018,2018,0,'Mutant factions struggle for their future.','16 episodes · cancelled'],
    ['fantastic-four-2005','Fantastic Four','Movie','Fantastic Four',2005,2005,0,'A team gains extraordinary powers.',''],
    ['rise-silver-surfer','Fantastic Four: Rise of the Silver Surfer','Movie','Fantastic Four',2007,2007,0,'The team faces the Silver Surfer.',''],
    ['fantastic-four-2015','Fantastic Four','Movie','Fantastic Four',2015,2015,0,'A new team develops unstable abilities.',''],
    ['blade','Blade','Movie','Other Marvel',1998,1998,0,'A half-vampire hunter battles the undead.',''],
    ['blade-2','Blade II','Movie','Other Marvel',2002,2002,0,'Blade faces a new vampire threat.',''],
    ['blade-trinity','Blade: Trinity','Movie','Other Marvel',2004,2004,0,'Blade is hunted by humans and vampires.',''],
    ['daredevil-2003','Daredevil','Movie','Other Marvel',2003,2003,0,'Matt Murdock fights crime in Hell’s Kitchen.',''],
    ['elektra','Elektra','Movie','Other Marvel',2005,2005,0,'Elektra is drawn into a dangerous mission.',''],
    ['punisher-2004','The Punisher','Movie','Other Marvel',2004,2004,0,'Frank Castle wages a one-man war.',''],
    ['punisher-warzone','Punisher: War Zone','Movie','Other Marvel',2008,2008,0,'Frank Castle continues his brutal campaign.',''],
    ['hulk-2003','Hulk','Movie','Other Marvel',2003,2003,0,'Bruce Banner’s experiments unleash the Hulk.',''],
    ['spider-man-2002','Spider-Man','Movie','Sony Spider-Man',2002,2002,1,'Peter Parker becomes Spider-Man.',''],
    ['spider-man-2','Spider-Man 2','Movie','Sony Spider-Man',2004,2004,1,'Peter struggles to balance life and heroism.',''],
    ['spider-man-3','Spider-Man 3','Movie','Sony Spider-Man',2007,2007,0,'Peter faces new enemies and inner conflict.',''],
        ['amazing-spider-man','The Amazing Spider-Man','Movie','Sony Spider-Man',2012,2012,0,'Andrew Garfield’s Peter Parker discovers his origins.',''],
    ['amazing-spider-man-2','The Amazing Spider-Man 2','Movie','Sony Spider-Man',2014,2014,0,'Peter faces Electro and a personal tragedy.',''],
    ['venom','Venom','Movie','Sony Spider-Man',2018,2018,0,'Eddie Brock bonds with an alien symbiote.',''],
    ['venom-let-there-be-carnage','Venom: Let There Be Carnage','Movie','Sony Spider-Man',2020,2021,0,'Venom faces the Carnage symbiote.',''],
    ['morbius','Morbius','Movie','Sony Spider-Man',2022,2022,0,'A scientist transforms into a living vampire.',''],
    ['madame-web','Madame Web','Movie','Sony Spider-Man',2024,2024,0,'A paramedic discovers a connection to the future.',''],
    ['venom-last-dance','Venom: The Last Dance','Movie','Sony Spider-Man',2024,2024,0,'Eddie and Venom face a final threat.',''],
    ['kraven','Kraven the Hunter','Movie','Sony Spider-Man',2024,2024,0,'Sergei Kravinoff becomes a feared hunter.',''],
    ['spider-verse','Spider-Man: Into the Spider-Verse','Animated Movie','Sony Spider-Man',2018,2018,1,'Miles Morales discovers a web of Spider-heroes.',''],
    ['across-spider-verse','Spider-Man: Across the Spider-Verse','Animated Movie','Sony Spider-Man',2023,2023,1,'Miles travels across the Spider-Verse.',''],
    ['90s-xmen-s1','X-Men: The Animated Series — Season 1','Animated Series','X-Men',1992,1992,0,'The classic animated mutant team.','5 seasons · ended'],
    ['90s-spider-s1','Spider-Man: The Animated Series — Season 1','Animated Series','Other Marvel',1994,1994,0,'Peter Parker’s classic animated adventures.','5 seasons · ended'],
    ['evolution','X-Men: Evolution','Animated Series','X-Men',2000,2000,0,'Teenage mutants attend school and fight threats.','4 seasons · ended'],
    ['wolverine-and-xmen','Wolverine and the X-Men','Animated Series','X-Men',2008,2009,0,'Wolverine leads a fractured X-Men team.','1 season · cancelled'],
    ['avengers-earth','The Avengers: Earth’s Mightiest Heroes','Animated Series','Other Marvel',2010,2010,0,'Earth’s heroes unite in an acclaimed animated series.','2 seasons · cancelled'],
    ['spectacular-spider','The Spectacular Spider-Man','Animated Series','Other Marvel',2008,2008,0,'Peter Parker’s early hero years.','2 seasons · cancelled'],
    ['ultimate-spider','Ultimate Spider-Man','Animated Series','Other Marvel',2012,2012,0,'Spider-Man trains with a team of young heroes.','4 seasons · ended'],
    ['agents-shield-s1','Agents of S.H.I.E.L.D. — Season 1','Series','MCU',2013,2013,0,'Agent Coulson leads a team of agents.','22 episodes · 7 seasons total'],
    ['agents-shield-s2','Agents of S.H.I.E.L.D. — Season 2','Series','MCU',2014,2014,0,'The team navigates a changing world.','22 episodes'],
    ['agents-shield-s3','Agents of S.H.I.E.L.D. — Season 3','Series','MCU',2015,2015,0,'New threats emerge after the Inhumans appear.','22 episodes'],
    ['agents-shield-s4','Agents of S.H.I.E.L.D. — Season 4','Series','MCU',2016,2016,0,'Ghost Rider and the Framework change everything.','22 episodes'],
    ['agents-shield-s5','Agents of S.H.I.E.L.D. — Season 5','Series','MCU',2017,2017,0,'The team faces a possible end of the world.','22 episodes'],
    ['agents-shield-s6','Agents of S.H.I.E.L.D. — Season 6','Series','MCU',2019,2019,0,'The agents return to a changed Earth.','13 episodes'],
    ['agents-shield-s7','Agents of S.H.I.E.L.D. — Season 7','Series','MCU',2020,2020,0,'The final season sends the team through time.','13 episodes · ended'],
    ['daredevil-s1','Daredevil — Season 1','Series','MCU',2015,2015,1,'Matt Murdock protects Hell’s Kitchen.','13 episodes'],
    ['jessica-jones-s1','Jessica Jones — Season 1','Series','MCU',2015,2015,0,'A private investigator confronts her past.','13 episodes · 3 seasons total'],
    ['luke-cage-s1','Luke Cage — Season 1','Series','MCU',2016,2016,0,'A bulletproof hero protects Harlem.','13 episodes · 2 seasons total · cancelled'],
    ['iron-fist-s1','Iron Fist — Season 1','Series','MCU',2017,2017,0,'Danny Rand returns to New York.','13 episodes · 2 seasons total · cancelled'],
    ['defenders','The Defenders','Series','MCU',2017,2017,0,'Four street-level heroes unite.','8 episodes · limited series'],
    ['punisher-s1','The Punisher — Season 1','Series','MCU',2017,2017,0,'Frank Castle uncovers a conspiracy.','13 episodes · 2 seasons total · cancelled'],
    ['runaways-s1','Runaways — Season 1','Series','Other Marvel',2017,2017,0,'Teenagers discover their parents’ secret lives.','10 episodes · 3 seasons total · ended'],
    ['cloak-dagger-s1','Cloak & Dagger — Season 1','Series','Other Marvel',2018,2018,0,'Two teenagers discover connected powers.','10 episodes · 2 seasons total · cancelled'],
    ['inhumans','Marvel’s Inhumans','Series','Other Marvel',2017,2017,0,'The Inhuman royal family is forced into exile.','8 episodes · cancelled'],
    ['helstrom','Helstrom','Series','Other Marvel',2020,2020,0,'Siblings investigate terrifying supernatural forces.','10 episodes · cancelled'],
    ['what-if-s1','What If...? — Season 1','Animated Series','MCU',2021,2021,0,'Alternate versions of MCU events unfold.','9 episodes'],
    ['what-if-s2','What If...? — Season 2','Animated Series','MCU',2023,2023,0,'More alternate realities are explored.','9 episodes'],
    ['what-if-s3','What If...? — Season 3','Animated Series','MCU',2024,2024,0,'The animated multiverse anthology concludes.','8 episodes · ended'],
    ['xmen-97','X-Men ’97','Animated Series','X-Men',1997,2024,1,'A continuation of the classic animated series.','Season 1 released'],
    ['your-friendly-spider','Your Friendly Neighborhood Spider-Man','Animated Series','MCU',2025,2025,0,'An alternate animated take on Peter Parker.','Season 1 released']
  ];

  // [real name, hero name, bio, universe, powers, affiliations, allies, enemies, appearances, image search title]
  const characters = [
    ['Tony Stark','Iron Man','Genius inventor who turns his technology into a force for good.','MCU','Powered armor, genius-level intellect','Avengers, Stark Industries','Pepper Potts, James Rhodes, Steve Rogers','Thanos, Obadiah Stane','Iron Man trilogy; Avengers films; Civil War; Spider-Man: Homecoming','Iron Man Marvel Comics'],
    ['Steve Rogers','Captain America','A super-soldier who leads by example and conviction.','MCU','Enhanced strength, agility and endurance','Avengers, Howling Commandos','Bucky Barnes, Sam Wilson, Natasha Romanoff','Red Skull, HYDRA','Captain America films; Avengers films; The Falcon and the Winter Soldier','Captain America Marvel Comics'],
    ['Thor Odinson','Thor','Asgardian prince and God of Thunder.','MCU','Lightning, superhuman strength, Mjolnir/Stormbreaker','Avengers, Asgard, Guardians','Loki, Valkyrie, Jane Foster','Hela, Gorr, Thanos','Thor films; Avengers films; What If...?','Thor Marvel Comics'],
    ['Natasha Romanoff','Black Widow','A highly trained spy seeking redemption.','MCU','Espionage, martial arts, marksmanship','Avengers, S.H.I.E.L.D., Red Room','Clint Barton, Yelena Belova, Steve Rogers','Dreykov, Taskmaster','Iron Man 2; Avengers films; Captain America: Civil War; Black Widow','Black Widow Marvel Comics'],
    ['Bruce Banner','Hulk','Scientist whose anger unleashes a powerful alter ego.','MCU','Gamma-powered strength and regeneration','Avengers','Tony Stark, Thor, Natasha Romanoff','Abomination, Thanos','The Incredible Hulk; Avengers films; She-Hulk','Hulk Marvel Comics'],
    ['Peter Parker','Spider-Man','A young hero balancing ordinary life with responsibility.','MCU','Spider-sense, wall-crawling, agility, web-shooters','Avengers (associate)','Ned Leeds, MJ, Tony Stark','Green Goblin, Vulture, Mysterio','Captain America: Civil War; Spider-Man trilogy; Avengers: Infinity War and Endgame','Spider-Man Marvel Comics'],
    ['Stephen Strange','Doctor Strange','A former surgeon who becomes a master of the mystic arts.','MCU','Sorcery, portals, astral projection','Masters of the Mystic Arts, Avengers (ally)','Wong, America Chavez, Christine Palmer','Dormammu, Kaecilius','Doctor Strange films; Thor: Ragnarok; Avengers films; Spider-Man: No Way Home','Doctor Strange Marvel Comics'],
    ['Carol Danvers','Captain Marvel','A cosmic hero with extraordinary energy powers.','MCU','Energy projection, flight, super strength','Avengers','Maria Rambeau, Monica Rambeau, Nick Fury','Yon-Rogg, Supreme Intelligence','Captain Marvel; Avengers: Endgame; The Marvels','Captain Marvel Marvel Comics'],
    ['T’Challa','Black Panther','Wakandan king and protector.','MCU','Enhanced abilities, vibranium suit','Wakanda, Avengers','Shuri, Okoye, Nakia','Killmonger, Klaue','Captain America: Civil War; Black Panther; Avengers films','Black Panther Marvel Comics'],
    ['Wanda Maximoff','Scarlet Witch','A powerful magic user whose grief reshapes reality.','MCU','Chaos magic, telekinesis, reality alteration','Avengers (former)','Vision, Pietro Maximoff','Agatha Harkness, herself','Avengers films; WandaVision; Doctor Strange in the Multiverse of Madness','Scarlet Witch Marvel Comics'],
    ['Loki Laufeyson','Loki','God of Mischief whose loyalties and identity evolve.','MCU','Illusions, sorcery, shapeshifting','Asgard (former), TVA','Thor, Mobius, Sylvie','Thanos, various variants','Thor films; Avengers; Loki','Loki Marvel Comics'],
    ['James Howlett','Wolverine','A mutant with a fierce temper and a healing factor.','X-Men','Healing, claws, enhanced senses','X-Men','Professor X, Storm, Rogue','Sabretooth, William Stryker','X-Men films; Logan; Deadpool & Wolverine','Wolverine Marvel Comics'],
    ['Charles Xavier','Professor X','A powerful telepath and founder of the X-Men.','X-Men','Telepathy','X-Men','Magneto (sometimes), Cyclops, Jean Grey','Sentinels, anti-mutant groups','X-Men films; Legion references; X-Men ’97','Professor X Marvel Comics'],
    ['Erik Lehnsherr','Magneto','A mutant who can control magnetic fields.','X-Men','Magnetism, metal manipulation','Brotherhood of Mutants, X-Men (varies)','Charles Xavier, Mystique','Sentinels, humans who persecute mutants','X-Men films; X-Men animated series','Magneto Marvel Comics'],
    ['Jean Grey','Jean Grey / Phoenix','A powerful mutant connected to the Phoenix Force.','X-Men','Telepathy, telekinesis, Phoenix Force','X-Men','Cyclops, Storm, Wolverine','Dark Phoenix threats','X-Men films; Dark Phoenix; animated X-Men','Jean Grey Phoenix Marvel Comics'],
    ['Wade Wilson','Deadpool','A wisecracking mercenary with an accelerated healing factor.','Deadpool','Regeneration, combat skills, marksmanship','X-Force (various)','Wolverine, Vanessa, Colossus','Ajax, various mercenaries','Deadpool trilogy; X-Men Origins: Wolverine','Deadpool Marvel Comics'],
    ['Reed Richards','Mister Fantastic','A brilliant scientist whose body can stretch.','Fantastic Four','Elasticity, scientific genius','Fantastic Four','Sue Storm, Johnny Storm, Ben Grimm','Doctor Doom, Mole Man','Fantastic Four films','Mister Fantastic Marvel Comics'],
    ['Sue Storm','Invisible Woman','A founding member of the Fantastic Four.','Fantastic Four','Invisibility, force fields','Fantastic Four','Reed Richards, Johnny Storm, Ben Grimm','Doctor Doom','Fantastic Four films','Invisible Woman Marvel Comics'],
    ['Johnny Storm','Human Torch','A daring hero who can ignite and fly.','Fantastic Four','Flame generation, flight','Fantastic Four','Sue Storm, Reed Richards, Ben Grimm','Doctor Doom','Fantastic Four films','Human Torch Marvel Comics'],
    ['Ben Grimm','The Thing','A pilot transformed into a rock-like powerhouse.','Fantastic Four','Super strength, durability','Fantastic Four','Reed Richards, Sue Storm, Johnny Storm','Doctor Doom','Fantastic Four films','The Thing Marvel Comics'],
    ['Miles Morales','Spider-Man','A Brooklyn teenager who becomes a Spider-hero.','Sony Spider-Man','Spider-sense, camouflage, bio-electric venom','Spider-Society (various)','Peter B. Parker, Gwen Stacy','Spot, Miguel O’Hara (conflict)','Into the Spider-Verse; Across the Spider-Verse','Miles Morales Spider-Man Marvel Comics'],
    ['Eddie Brock','Venom','A journalist bonded with an alien symbiote.','Sony Spider-Man','Symbiote strength, tendrils, regeneration','Venom symbiote','Venom, Mrs. Chen','Carnage, Xenophages','Venom trilogy','Venom Marvel Comics'],
    ['Matt Murdock','Daredevil','A blind lawyer who protects Hell’s Kitchen.','MCU','Radar-like senses, martial arts','Defenders, Nelson Murdock & Page','Foggy Nelson, Karen Page, Elektra','Wilson Fisk, Bullseye','Daredevil series; The Defenders; Echo appearances','Daredevil Marvel Comics'],
    ['Frank Castle','The Punisher','A former soldier waging a personal war on crime.','MCU','Military training, tactics, weapons','Independent','Karen Page, Micro','Wilson Fisk, criminal organizations','Daredevil; The Punisher','Punisher Marvel Comics'],
    ['Jessica Jones','Jessica Jones','A private investigator with superhuman strength.','MCU','Super strength, durability','Alias Investigations, Defenders','Trish Walker, Luke Cage','Kilgrave','Jessica Jones; The Defenders','Jessica Jones Marvel Comics'],
    ['Luke Cage','Luke Cage','A Harlem hero with unbreakable skin.','MCU','Super strength, bulletproof skin','Defenders','Jessica Jones, Misty Knight','Cottonmouth, Diamondback','Jessica Jones; Luke Cage; The Defenders','Luke Cage Marvel Comics'],
    ['Kamala Khan','Ms. Marvel','A young hero inspired by Captain Marvel.','MCU','Hard-light constructs, energy powers','Young Avengers (potential)','Carol Danvers, Monica Rambeau, Bruno','The Clandestines','Ms. Marvel; The Marvels','Ms Marvel Marvel Comics'],
    ['Clint Barton','Hawkeye','A master archer and longtime Avenger.','MCU','Archery, tactical skills','Avengers','Natasha Romanoff, Kate Bishop','Tracksuit Mafia, various foes','Thor; Avengers films; Hawkeye','Hawkeye Marvel Comics'],
    ['Yelena Belova','Black Widow','A highly trained operative and Natasha’s sister figure.','MCU','Espionage, combat, marksmanship','Red Room (former), Thunderbolts*','Natasha Romanoff, Kate Bishop','Valentina Allegra de Fontaine (employer)','Black Widow; Hawkeye; Thunderbolts*','Yelena Belova Marvel Comics']
  ];

  // [team, description, history, roster, rivals, screen appearances, image search title]
  const teams = [
    ['Avengers','Earth’s premier superhero team.','Formed to face threats no single hero could handle.','Iron Man, Captain America, Thor, Hulk, Black Widow, Hawkeye','Thanos, Ultron, Loki','The Avengers; Age of Ultron; Infinity War; Endgame','Avengers Marvel Comics'],
    ['Guardians of the Galaxy','A band of cosmic misfits.','Brought together by circumstance, they become a found family.','Star-Lord, Gamora, Drax, Rocket, Groot, Mantis, Nebula','Ronan, Ego, High Evolutionary','Guardians trilogy; Infinity War; Endgame; Holiday Special','Guardians of the Galaxy Marvel Comics'],
    ['X-Men','Mutants fighting for a world that fears them.','Founded by Charles Xavier to protect humans and mutants.','Professor X, Cyclops, Jean Grey, Storm, Wolverine, Beast','Magneto (sometimes), Sentinels, anti-mutant groups','X-Men films; animated series; X-Men ’97','X-Men Marvel Comics team'],
    ['Fantastic Four','A family of explorers and superheroes.','Four adventurers gain powers after a scientific mission.','Mister Fantastic, Invisible Woman, Human Torch, The Thing','Doctor Doom, Mole Man','Fantastic Four film adaptations','Fantastic Four Marvel Comics team'],
    ['Defenders','Street-level heroes protecting New York.','A reluctant alliance forms against the Hand.','Daredevil, Jessica Jones, Luke Cage, Iron Fist','The Hand, Alexandra Reid','The Defenders','Defenders Marvel Comics'],
    ['S.H.I.E.L.D.','An intelligence and peacekeeping organization.','Coordinates responses to extraordinary global threats.','Nick Fury, Phil Coulson, Maria Hill, Melinda May','HYDRA, various hostile groups','Iron Man; Avengers; Agents of S.H.I.E.L.D.','SHIELD Marvel Comics'],
    ['HYDRA','A secretive extremist organization.','An enemy network that infiltrates institutions and governments.','Red Skull, Arnim Zola, assorted agents','S.H.I.E.L.D., Captain America','Captain America films; Agents of S.H.I.E.L.D.','Hydra Marvel Comics'],
    ['Thunderbolts','A government-assembled team of dangerous operatives.','A group of antiheroes brought together for covert missions.','Yelena Belova, Bucky Barnes, Red Guardian, Ghost, U.S. Agent','Political handlers, internal conflicts','Thunderbolts*','Thunderbolts Marvel Comics'],
    ['Midnight Sons','A supernatural alliance against dark forces.','A rotating group of heroes confronts mystical threats.','Doctor Strange, Blade, Ghost Rider, Moon Knight (varies)','Mephisto, Lilith, supernatural threats','Animated and game adaptations; screen roster varies','Midnight Sons Marvel Comics'],
    ['Sinister Six','A rotating alliance of Spider-Man villains.','Villains unite in attempts to defeat Spider-Man.','Doctor Octopus, Vulture, Electro, Sandman, Mysterio, others','Spider-Man','Spider-Man adaptations; references in Sony films','Sinister Six Marvel Comics']
  ];
    const readProgress = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      return {
        watched: Array.isArray(saved.watched) ? saved.watched : [],
        watchlist: Array.isArray(saved.watchlist) ? saved.watchlist : []
      };
    } catch {
      return { watched: [], watchlist: [] };
    }
  };

  let progress = readProgress();
  let libraryMode = 'all';
  let activeUniverse = 'all';

  function saveProgress() {
    localStorage.setItem(KEY, JSON.stringify(progress));
    renderAll();
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }

  function setView(view) {
    if (!$ (view)) return;
    document.querySelectorAll('.view').forEach(section => {
      section.classList.toggle('active', section.id === view);
    });
    document.querySelectorAll('[data-view]').forEach(button => {
      button.classList.toggle('active', button.dataset.view === view);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });

  document.querySelectorAll('[data-goto]').forEach(button => {
    button.addEventListener('click', () => setView(button.dataset.goto));
  });

  // Images are loaded from Wikipedia when available.
  const imageCache = new Map();

  async function getImage(searchTitle) {
    if (!searchTitle) return '';
    if (imageCache.has(searchTitle)) return imageCache.get(searchTitle);

    try {
      const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' +
        encodeURIComponent(searchTitle.replaceAll(' ', '_'));
      const response = await fetch(url);
      if (!response.ok) throw new Error('Image unavailable');
      const data = await response.json();
      const image = data.thumbnail?.source || '';
      imageCache.set(searchTitle, image);
      return image;
    } catch {
      imageCache.set(searchTitle, '');
      return '';
    }
  }

  function loadImage(element, searchTitle) {
    getImage(searchTitle).then(url => {
      if (!url || !element.isConnected) return;
      const image = document.createElement('img');
      image.src = url;
      image.alt = searchTitle;
      image.loading = 'lazy';
      image.style.cssText = 'width:100%;max-height:230px;object-fit:cover;border-radius:12px;margin-bottom:10px;background:#1b2738;';
      image.onerror = () => image.remove();
      element.prepend(image);
    });
  }

  function renderCountdown() {
    const target = new Date('2026-12-17T00:00:00+11:00').getTime();
    const remaining = Math.max(0, target - Date.now());
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    if ($('countdown')) {
      $('countdown').innerHTML = [
        [days, 'DAYS'],
        [hours, 'HOURS'],
        [minutes, 'MINUTES'],
        [seconds, 'SECONDS']
      ].map(([number, label]) =>
        `<div class="countbox"><strong>${number}</strong><span>${label}</span></div>`
      ).join('');
    }
  }

  function sortedTitles(list, mode) {
    const copy = [...list];
    if (mode === 'release') return copy.sort((a, b) => a[5] - b[5]);
    if (mode === 'universe') {
      return copy.sort((a, b) =>
        a[3].localeCompare(b[3]) || a[4] - b[4]
      );
    }
    return copy.sort((a, b) => a[4] - b[4]);
  }

  function titleRow(item) {
    const [id, title, type, universe, storyYear, releaseYear, essential, description, extra] = item;
    const watched = progress.watched.includes(id);
    const saved = progress.watchlist.includes(id);

    return `
      <article class="item ${watched ? 'done' : ''}">
        <div class="poster">${type.includes('Series') ? '📺' : type === 'Short' || type === 'Special' ? '✨' : '🎬'}</div>
        <div class="item-main">
          <div class="item-title">${escapeHTML(title)}</div>
          <div class="item-meta">${escapeHTML(type)} · ${escapeHTML(universe)} · Story: ${storyYear || 'Unknown'} · Released: ${releaseYear}</div>
          <div class="item-note">${escapeHTML(description)}</div>
          ${extra ? `<div class="item-meta">${escapeHTML(extra)}</div>` : ''}
          ${essential ? '<span class="chip">Doomsday essential</span>' : ''}
          <div class="actions" style="margin-top:7px">
            <button class="btn" data-watch="${id}">${watched ? 'Mark unwatched' : 'Mark watched'}</button>
            <button class="btn" data-save="${id}">${saved ? 'Remove from watchlist' : 'Add to watchlist'}</button>
          </div>
        </div>
      </article>`;
  }

  function renderLibrary() {
    if (!$('items')) return;
    const search = ($('search')?.value || '').toLowerCase();
    const universe = $('filterUniverse')?.value || 'all';
    let list = titles.filter(item => {
      const matchesSearch = item.join(' ').toLowerCase().includes(search);
      const matchesUniverse = universe === 'all' || item[3] === universe;
      const matchesMode =
        libraryMode === 'all' ||
        (libraryMode === 'essential' && item[6]) ||
        (libraryMode === 'unwatched' && !progress.watched.includes(item[0]));
      return matchesSearch && matchesUniverse && matchesMode;
    });

    list = sortedTitles(list, $('sort')?.value || 'story');
    $('resultCount').textContent = `${list.length} titles`;
    $('items').innerHTML = list.length
      ? list.map(titleRow).join('')
      : '<p class="note">No titles found. Try another search or filter.</p>';
  }

  function renderUniverses() {
    if (!$('universeGrid')) return;
    $('universeGrid').innerHTML = universes.map(universe => {
      const count = titles.filter(item => item[3] === universe).length;
      return `
        <button class="universe" data-universe="${escapeHTML(universe)}">
          <span style="font-size:24px">🌌</span>
          <b>${escapeHTML(universe)}</b>
          <small>${count} titles in this collection</small>
        </button>`;
    }).join('');

    $('homeUniverses').innerHTML = universes.map(universe => `
      <button class="card" data-universe="${escapeHTML(universe)}">
        <div class="emoji">🌠</div>
        <h3>${escapeHTML(universe)}</h3>
        <p>${titles.filter(item => item[3] === universe).length} titles</p>
      </button>
    `).join('');
  }

  function renderCharacters() {
    if (!$('characterItems')) return;
    const search = ($('characterSearch')?.value || '').toLowerCase();
    const universe = $('characterUniverse')?.value || 'all';
    const list = characters.filter(character =>
      character.join(' ').toLowerCase().includes(search) &&
      (universe === 'all' || character[3] === universe)
    );

    $('characterCount').textContent = `${list.length} characters`;
    $('characterItems').innerHTML = list.map((character, index) => `
      <article class="character-card" data-character="${index}">
        <h3>${escapeHTML(character[1])}</h3>
        <p><b>Real name:</b> ${escapeHTML(character[0])}</p>
        <p>${escapeHTML(character[2])}</p>
        <p><b>Universe:</b> ${escapeHTML(character[3])}</p>
        <p><b>Powers:</b> ${escapeHTML(character[4])}</p>
        <p><b>Affiliations:</b> ${escapeHTML(character[5])}</p>
        <p><b>Allies:</b> ${escapeHTML(character[6])}</p>
        <p><b>Enemies:</b> ${escapeHTML(character[7])}</p>
        <p><b>Screen appearances:</b> ${escapeHTML(character[8])}</p>
        <div class="image-slot"></div>
      </article>
    `).join('');

    document.querySelectorAll('.character-card').forEach((card, index) => {
      const character = list[index];
      const slot = card.querySelector('.image-slot');
      loadImage(slot, character[9]);
    });
  }

  function renderTeams() {
    if (!$('teamItems')) return;
    $('teamItems').innerHTML = teams.map((team, index) => `
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

    teams.forEach((team, index) => {
      loadImage($(`team-image-${index}`), team[6]);
    });
  }

  function renderTimeline() {
    if (!$('timelineItems')) return;
    const mode = $('timelineSort')?.value || 'story';
    const universe = $('timelineUniverse')?.value || 'all';
    let list = titles.filter(item => universe === 'all' || item[3] === universe);
    list = sortedTitles(list, mode);

    $('timelineItems').innerHTML = list.map(item => `
      <article class="item">
        <div class="poster">◷</div>
        <div class="item-main">
          <div class="item-title">${escapeHTML(item[1])}</div>
          <div class="item-meta">${escapeHTML(item[3])} · ${escapeHTML(item[2])}</div>
          <div class="item-note">${mode === 'release' ? 'Release year' : 'Approximate story year'}: ${mode === 'release' ? item[5] : item[4]}</div>
        </div>
      </article>
    `).join('');
  }

  function renderWatchlist() {
    if (!$('watchItems')) return;
    const list = titles.filter(item => progress.watchlist.includes(item[0]));
    $('watchCount').textContent = `${list.length} saved titles`;
    $('watchItems').innerHTML = list.length
      ? list.map(titleRow).join('')
      : '<p class="note">Your watchlist is empty. Add titles from Movies & Shows.</p>';
  }

  function renderHomeProgress() {
    const watched = progress.watched.length;
    const percent = Math.round(watched / titles.length * 100);
    if ($('progressPct')) $('progressPct').textContent = `${percent}%`;
    if ($('progressText')) $('progressText').textContent = `${watched} of ${titles.length} titles watched`;
    if ($('progressFill')) $('progressFill').style.width = `${percent}%`;
  }

  function renderAll() {
    renderLibrary();
    renderUniverses();
    renderCharacters();
    renderTeams();
    renderTimeline();
    renderWatchlist();
    renderHomeProgress();
  }

  document.addEventListener('click', event => {
    const watchButton = event.target.closest('[data-watch]');
    if (watchButton) {
      const id = watchButton.dataset.watch;
      progress.watched = progress.watched.includes(id)
        ? progress.watched.filter(value => value !== id)
        : [...progress.watched, id];
      saveProgress();
      return;
    }

    const saveButton = event.target.closest('[data-save]');
    if (saveButton) {
      const id = saveButton.dataset.save;
      progress.watchlist = progress.watchlist.includes(id)
        ? progress.watchlist.filter(value => value !== id)
        : [...progress.watchlist, id];
      saveProgress();
      return;
    }

    const universeButton = event.target.closest('[data-universe]');
    if (universeButton) {
      const universe = universeButton.dataset.universe;
      $('filterUniverse').value = universe;
      $('timelineUniverse').value = universe;
      setView('library');
      renderLibrary();
    }
  });

  document.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      libraryMode = button.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach(item => {
        item.classList.toggle('primary', item === button);
      });
      renderLibrary();
    });
  });

  ['search', 'sort', 'filterUniverse'].forEach(id => {
    $(id)?.addEventListener('input', renderLibrary);
    $(id)?.addEventListener('change', renderLibrary);
  });

  ['characterSearch', 'characterUniverse'].forEach(id => {
    $(id)?.addEventListener('input', renderCharacters);
    $(id)?.addEventListener('change', renderCharacters);
  });

  ['timelineSort', 'timelineUniverse'].forEach(id => {
    $(id)?.addEventListener('change', renderTimeline);
  });

  $('exportBtn')?.addEventListener('click', () => {
    const data = JSON.stringify(progress, null, 2);
    const file = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'marvel-marathon-progress.json';
    link.click();
    URL.revokeObjectURL(url);
  });

  $('resetBtn')?.addEventListener('click', () => {
    if (!confirm('Are you sure you want to reset all watched titles and your watchlist?')) return;
    progress = { watched: [], watchlist: [] };
    saveProgress();
  });

  // Initial display
  renderAll();
  renderCountdown();
  setInterval(renderCountdown, 1000);

})();