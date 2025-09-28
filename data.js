const parties = [
  {
    "id": 1,
    "name": "Halloween: The Walking Dead Party",
    "city": "Düsseldorf",
    "venue": "Hammer Blick im KCD",
    "price": 15,
    "genre": "Party & House",
    "image": "https://eventfrog.de/upload/rm/ha/ll/halloween-dusseldorf-2025-WO7607US.webp?_=1744413746000",
    "ticketLink": "https://eventfrog.de/en/p/party/halloween/halloween-duesseldorf-2025-7298288029222877055.html"
  },
  {
    "id": 2,
    "name": "Sweet HELL of COOKIES & Scream",
    "city": "Düsseldorf",
    "venue": "Rheinturm & Nachtresidenz",
    "price": 15,
    "genre": "Mixed (House, Charts, Party)",
    "image": "https://ticketstars.de/wp-content/themes/yootheme/cache/3d/halloween-Facebook-Event-Titelbild-3d781b38.webp",
    "ticketLink": "https://ticketstars.de/sweet-hell-of-cookies-scream-2025"
  },
  {
    "id": 3,
    "name": "Halloween im Stahlwerk",
    "city": "Düsseldorf",
    "venue": "Stahlwerk",
    "price": 18,
    "genre": "80s, 90s, Partyhits",
    "image": "https://stahlwerk.de/fileadmin/_processed_/e/c/csm_20151207_55610754_394e32c4e7.jpg",
    "ticketLink": "https://stahlwerk.de/event/halloween"
  },
  {
    "id": 4,
    "name": "Hawā Halloween am Flughafen",
    "city": "Düsseldorf",
    "venue": "Flughafen Düsseldorf",
    "price": 39,
    "genre": "International, Dance",
    "image": "https://cdn.ticket.io/companies/aSK8VzE4/img/holder-1080.jpg?3660af56",
    "ticketLink": "https://hawa.love/tickets/"
  },
  {
    "id": 8,
    "name": "Halloween Party on the Rhine",
    "city": "Düsseldorf",
    "venue": "MS RheinGalaxie (Ghost Ship)",
    "price": 34,
    "genre": "Dance, EDM",
    "image": "https://www.k-d.com/wp-content/webp-express/webp-images/uploads/2024/11/KD_GhostShip_Header.jpg.webp",
    "ticketLink": "https://www.k-d.com/produkt/ghost-ship/"
  },
  {
    "id": 9,
    "name": "Retro Clash Halloweenparty",
    "city": "Köln",
    "venue": "Gloria",
    "price": 15,
    "genre": "80s, 90s, 2000s, Pop, Rock, Hip-Hop, Dance",
    "image": "https://kulturika.de/wp-content/uploads/2025/05/Retro-Clash-Halloweenparty-Koeln-2025-Gloria-31.10.2025-Kulturika-90er-Party-Koeln.webp",
    "ticketLink": "https://kulturika.de/produkt/retro-clash-halloween-party-koeln-31-10-2025/"
  },
  {
    "id": 10,
    "name": "Halloween Party 2025 | DIE HALLE Tor 2",
    "city": "Köln",
    "venue": "Die Halle Tor 2",
    "price": 29,
    "genre": "Dancehall, Hip Hop, House, Karaoke",
    "image": "https://cdn.ticket.io/companies/e0vQDeQ0/events/xthxj388/img/holder-1080.jpg?918707f7",
    "ticketLink": "https://diehalletor2.ticket.io/xthxj388/"
  },
  {
    "id": 12,
    "name": "Loonyland Halloween!",
    "city": "Köln",
    "venue": "Bootshaus",
    "price": 35,
    "genre": "Techno, Dance",
    "image": "https://s3.eu-central-1.amazonaws.com/cdn.pixend.de/CQYDNRZ9Q8QSS8D/events/7418775207131602052186294_4667299601581501619084014.jpeg",
    "ticketLink": "https://bootshaus.tv/events/loonyland-halloween/"
  },
  {
    "id": 82,
    "name": "GLAM BANG! HALLOWEEN EDITION",
    "city": "Düsseldorf",
    "venue": "RATINGER HOF",
    "price": 8,
    "genre": "Techno, Dance",
    "image": "https://cdn.ticket.io/companies/6bbzzntu/events/nYpChmLM/img/holder-1080.jpg?aad48fea",
    "ticketLink": "https://nbk.ticket.io/nYpChmLM/"
  },
  {
    "id": 21,
    "name": "Halloween Düsseldorf - CANDY Party",
    "city": "Düsseldorf",
    "venue": "Rudas Studios",
    "price": 14,
    "genre": "Melodic House, RnB, Party Classics",
    "image": "https://tickets.candy-event.de/media/image/6f/6b/54/candy-rudas-halloween-311022-so.jpg",
    "ticketLink": "https://www.candy-event.de/events/halloween-duesseldorf/"
  },
  {
    "id": 22,
    "name": "zakk vs. Zombies – Halloween Party",
    "city": "Düsseldorf",
    "venue": "zakk (Halle & Club)",
    "price": 11,
    "genre": "Rock, Hits, Classics, Wave, Gothic, Electro",
    "image": "https://www.zakk.de/images/quadrat/15273.jpg",
    "ticketLink": "https://www.zakk.de/event-detail?event=15273"
  },
  {
    "id": 32,
    "name": "Halloween Party Club Elitär",
    "city": "Düsseldorf",
    "venue": "Club Elitär",
    "price": 15,
    "genre": "Dance, House, Party",
    "image": "https://www.club-elitaer.de/wp-content/uploads/2025/02/Halloween-2025-Banner.jpg",
    "ticketLink": "https://www.club-elitaer.de/events/halloween-party-duesseldorf/"
  },
  {
    "id": 24,
    "name": "Halloween Party by Eventim Light",
    "city": "Düsseldorf",
    "venue": "Alter Bahnhof Oberkassel",
    "price": 11,
    "genre": "Party, Mixed",
    "image": "https://www.eventim-light.com/de/api/image/68c7fa80a5c93f571d9b9862/shop_cover_v3/webp",
    "ticketLink": "https://www.eventim-light.com/de/a/64eda40a5d779b04b11f5f46/e/68c7fc4ca5c93f571d9b995c"
  }
];