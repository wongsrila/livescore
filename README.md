# livescore App
Get Live Football Scores and Real-Time Football Results with LiveScore! Ik heb als project gekozen om een voetbal app te maken waarbij je live scores van populaire voetbal competities kan zien. Een belangrijk onderdeel van mijn app is dat de data van de voetbal wedstrijden live worden weergegegevn. Het herlaad de data om de tien seconden. zodat je altijd up-to-date blijft van de laatste events.

## Functionaliteiten
- List view van alle live wedstrijden
- Detail pagina voor de wedstrijd zelf
- Alle twee de pagina's worden de data live gestreamed met behulp van Server Send Events (elke 10 sec.)
- De standings data die niet vaak veranderd wordt gewoon normaal serverside gerendered
- De website kan je ook downloaden als een webapp
- Je kan de detail pagina (fixture page) delen met je vrienden.
- goal geluid als er live wordt gescoord

## Bestandenstructuur
Ik ben gaan werken aan de hand van de structuur MVC. MVC (Model-View-Controller) is een software ontwerppatroon dat wordt gebruikt om de structuur van een webapplicatie te organiseren. Het scheidt de applicatie in drie componenten: de model (gegevens), de view (presentatie) en de controller (logica).

In Node.js wordt MVC vaak gebruikt in combinatie met Express.js. In dit patroon wordt de routing en logica van de applicatie behandeld door de controller, de data wordt beheerd door de model en de presentatie van de gegevens wordt gedaan door de view. Ik heb zelf ook the routing weer opgesplitst.

Het gebruik van MVC in Node.js maakt de code beter georganiseerd, gemakkelijker te onderhouden en meer schaalbaar, waardoor het een populaire keuze is voor de ontwikkeling van webapplicaties.

## Serverside rendering
Serverside rendering (SSR) is een techniek waarbij webpagina's worden gerenderd op de server in plaats van op de client (browser). Serverside rendering (SSR) met Express.js is een manier om de prestaties van webapplicaties te verbeteren door de HTML-pagina's op de server te genereren en deze vervolgens naar de browser te sturen. Dit kan de laadtijd van de pagina verkorten en de gebruikerservaring verbeteren. Bovendien kan SSR de zoekmachineoptimalisatie (SEO) verbeteren omdat zoekmachines beter in staat zijn om inhoud op de pagina te indexeren.

Als view template gebruik ik .ejs Dit is makkelijk te begrijpen en je behoud de layout van HTML.
``` javascript
const getFixture = async (req, res) => {
  try {
    fixtureId = req.params.id;
    const fixtureData = await requestFixture(fixtureId);
    const leagueStandings = await requestLeagueStandings(fixtureData.league_id);

    const orderedStandings = leagueStandings.sort(
      (a, b) => a.position - b.position
    );
    res.render('fixture', { orderedStandings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
```

## Server Send Events
Server Sent Events (SSE) is een standaard die gebruikt wordt om efficiënt data van een server naar een web-browser te sturen met behulp van HTTP. Het maakt gebruik van een enkele, lange-levende HTTP-verbinding waardoor de server continu data kan pushen naar de client zodra dit beschikbaar is. Dit staat in tegenstelling tot de traditionele manier van verversende webpagina's of polling vanaf de client. Ik heb SSE gebruikt om live events en data zoals goals, gele kaarten en doelpunten te pushen naar de frontend zonder dat de gebruiker elke hoeft te refreshen. Mijn data refreshed om de 10 seconden. Mijn meeste logica zit in de SSE bestand aan de client-side.
``` javascript
import {
  formatTimestampAsTime,
  formatFixtureDate,
  stateNames,
} from '/js/utils.js';

const evtSource = new EventSource(`/livescore-stream`);
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);
  // console.log(data);
  const tableWrapper = document.getElementsByClassName('table_wrapper')[0];

  // Clear the existing content
  tableWrapper.innerHTML = '';

  data.forEach((fixture) => {
    // Get current time or state name
    const tickingPeriod = fixture.periods?.find(
      (period) => period.ticking === true
    );
    let currentTimeOrState;
    let liveTicker = '';
    let addedTime = '';
    let homeTeamName = '';
    let homeTeamImagePath = '';
    let awayTeamName = '';
    let awayTeamImagePath = '';
    let homeScore = 0;
    let awayScore = 0;

    homeScore =
      fixture.scores.find(
        (score) =>
          score.description === 'CURRENT' && score.score.participant === 'home'
      )?.score.goals ?? 0;

    awayScore =
      fixture.scores.find(
        (score) =>
          score.description === 'CURRENT' && score.score.participant === 'away'
      )?.score.goals ?? 0;

    // Get home and away team details
    fixture.participants.forEach((participant) => {
      if (participant.meta.location === 'home') {
        homeTeamName = participant.name;
        homeTeamImagePath = participant.image_path;
      } else if (participant.meta.location === 'away') {
        awayTeamName = participant.name;
        awayTeamImagePath = participant.image_path;
      }
    });

    if (fixture.state.id === 3) {
      currentTimeOrState = 'Half Time';
    } else {
      // Check if tickingPeriod is not undefined before accessing its properties
      if (tickingPeriod) {
        currentTimeOrState = tickingPeriod.minutes;
        // Check if time_added is available and set the addedTime accordingly
        if (tickingPeriod.time_added !== null) {
          addedTime = `<span class="added-time"> +${tickingPeriod.time_added}</span>`;
        }
      } else {
        currentTimeOrState = stateNames[fixture.state.id] || '';
      }
    }
    if (tickingPeriod) {
      liveTicker = `<span class="live-data">'</span>`;
    }

    // Create the fixture_row HTML
    // prettier-ignore
    const fixtureRowHTML = /*html*/ `
    <div class="fixture_row">
      <div class="row_top">
        <div class="league_info">
          <div class="league_info-country">
            <div class="circle-mask">${fixture.league?.country?.image_path ? `<img src="${fixture.league.country.image_path}" alt="logo" height="20" />` : ''}</div>
            <p class="fixture_date">${fixture.league?.country?.name || ''}</p>
          </div>
          <div class="league_info-league fixture_date">${fixture.league?.name || ''} ${fixture.round !== null ? `| Round ${fixture.round.name}` : ''}</div>
        </div>
        <div class="league_info-time">
          <div class="fixture_date"><b>${formatTimestampAsTime(fixture.starting_at_timestamp)}</b> - ${formatFixtureDate(fixture.starting_at)}</div>
        </div>
      </div>
      <div class="row_bottom">
        <div class="state_wrapper"><p class="state">${currentTimeOrState}${liveTicker}${addedTime}</p></div>
        <div class="fixture_h2h">
          <div class="team home">
            <p>${homeTeamName}</p>
            <img src="${homeTeamImagePath}" alt="team-logo" height="24" />
          </div>
          <div class="fixture-score">${homeScore}-${awayScore}</div>
          <div class="team away">
            <img src="${awayTeamImagePath}" alt="team-logo" height="24" />
            <p>${awayTeamName}</p>
          </div>
        </div>
        <div class="fixture_details"><a href="/fixture/${fixture.id}">details</a></div>
      </div>
    </div>
    `;

    // Insert the fixtureRowHTML inside table_wrapper
    tableWrapper.innerHTML += fixtureRowHTML;
  });
};

```

## Routing
Om mijn routing zo overzichtelijk mogelijk te maken heb ik die ook opgesplitst van de controller. Zo kan ik op 1 plek alle routes aanpassen die nodig zijn. Vervolgens exporteer in de router naar de server.js en importeer ik de controllers naar deze routes. In dit geval zijn de routes minimaal maar toch handig om dit opgesplitst te hebben.
``` javascript
const express = require('express');
const livescoreController = require('../controllers/livescoreController');
const fixtureController = require('../controllers/fixtureController');

const router = express.Router();

router.get('/', livescoreController.getIndex);
router.get('/fixture/:id', fixtureController.getFixture);

module.exports = router;

```

## Process
Ik ben eerst van start gegaan met de API-Football op Rapidapi. Het gebruik maken van de api was redelijk makkelijk, en de data die werdt gegeven was ook vrij simpel te gebruiken. Hier zie je bijvoorbeeld hoe ik de leagueStandings oproep.
``` javascript
// Get League standings
async function getLeagueStandings(league_id) {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=${league_id}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.API}`,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      }
    );
    const data = await response.json();
    return data.response[0].league;
  } catch (err) {
    console.error(err);
    return [];
  }
}
```
En hier haal in alle live wedstrijden op.
``` javascript
// Get live games
async function liveGames() {
  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${process.env.API}`,
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
      }
    );
    const data = await response.json();
    return data.response;
  } catch (err) {
    console.error(err);
    return [];
  }
}
```
Toen ik goed bezig was met de functionaliteiten kwam ik er toch achter dat het te minimaal was voor wat ik wilde doen. En het koste me veel geld omdat de api niet gratis was om te gebruiken. Daarom ben ik veranderd van API nadat ik de belangrijkste functionaliteiten werkend heb gekregen. Dit heeft mij geholpen om nu met de nieuwe API een stuk sneller te werken omdat ik al de basis structuur en logica werkend had gekregen. De nieuwe API die ik heb gebruikt is van https://www.sportmonks.com/football-api/. Dit is ook een betaalde API die €100 per maand kost, maar heb een trial kunnen krijgen.

De API is een stuk ingewikkelder maar ook uitgebreider met veel meer data. De API werkt voornamlijk met includes in de url zodat dit modulair blijft. Zo kan je alleen de dat die je echt nodig hebt includen om data bloating te voorkomen.
``` javascript
require('dotenv').config();
const { todayDate } = require('../utils/dateFormats');

// Get livescores
async function requestLivescores() {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/livescores?&include=round;league.country;scores;events;participants;periods;state.type&timezone=Europe/Amsterdam&per_page=50`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.API,
        },
      }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Get livescores
async function requestTodayFixtures() {
  try {
    const getDate = todayDate();
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/date/20${getDate}?&include=round;league.country;scores;events;participants;periods;state.type&timezone=Europe/Amsterdam&per_page=50`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.API,
        },
      }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Get todays fixtures
async function requestFixture(id) {
  try {
    const getDate = todayDate();
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/${id}
      ?&include=round;league.country;scores;events.type;participants;periods;state.type;statistics.type&timezone=Europe/Amsterdam`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.API,
        },
      }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// Get todays fixtures
async function requestLeagueStandings(league_id) {
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/standings/live/leagues/${league_id}?&include=participant;details.type`,
      {
        method: 'GET',
        headers: {
          Authorization: process.env.API,
        },
      }
    );

    const data = await response.json();

    return data.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

module.exports = {
  requestLivescores,
  requestTodayFixtures,
  requestFixture,
  requestLeagueStandings,
};
```

Hier kan je goed zien welke includes ik heb gebruikt om meer data te krijgen per categorie.

Waar ik het meest problemen had was het samenvoegen van data die SSR was en data die met SSE verstuurd werden. Dit moest ik in 1 controller werkend te zien krijgen. Al deze code zit in mijn controllers.
``` javascript
const {
  requestFixture,
  requestLeagueStandings,
} = require('../models/api_fixtures');

let fixtureId = null;

const getFixture = async (req, res) => {
  try {
    fixtureId = req.params.id;
    const fixtureData = await requestFixture(fixtureId);
    const leagueStandings = await requestLeagueStandings(fixtureData.league_id);

    const orderedStandings = leagueStandings.sort(
      (a, b) => a.position - b.position
    );
    res.render('fixture', { orderedStandings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const fixtureStream = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const getFixture = async () => {
    const fixtureDataStream = await requestFixture(fixtureId);
    res.write(`data: ${JSON.stringify(fixtureDataStream)}\n\n`);
  };

  getFixture();

  const intervalId = setInterval(getFixture, 10000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = {
  getFixture,
  fixtureStream,
};
```
Als laatst moest ik nu deze SSE data verwerken aan de client-side. Dit was ook 1 van de moeilijkste taken die ik had. Het nam vooral veel tijd in om alle data te testen en valideren om ```null``` bugs. Ik moet de data vaak manipuleren om mijn gewenste uitkomt te krijgen. Een voorbeeld hiervan is het laten zien van de scores:
``` javascript
  homeScore =
    data.scores.find(
      (score) =>
        score.description === 'CURRENT' && score.score.participant === 'home'
    )?.score.goals ?? 0;

  awayScore =
    data.scores.find(
      (score) =>
        score.description === 'CURRENT' && score.score.participant === 'away'
    )?.score.goals ?? 0;
```
De grootste deel van het uitvogelen van hoe ik de events moest laten zien. Met veel if statements heb ik dit gemaakt.
``` javascript
<section class="fixture-nav">
  <p class="nav-btn">Summary</p>
</section>
<section class="events-list">
  <div class="events-column">
    ${sortedEvents.map((event) => `
      <div class="event-item ${event.participant_id === homeTeamId ? 'home-event' : 'away-event'}">
        <div class="event-minute">${event.minute}'${event.extra_minute ? `<span class="added-time"> +${event.extra_minute}</span>` : ''}</div>
        <div class="event-icon">
          <img src="${getEventIcon(event.type.code)}" alt="${event.type.name}" width="16">
          ${event.result !== null ? `<p class="event-icon-text">${event.result}</p>` : ''}
        </div>
        <div class="event-details ${event.participant_id === homeTeamId ? 'home' : 'away'}">
          <span class="event-info">${event.player_name !== null ? event.player_name : ''}</span>
          ${event.related_player_name !== null ? `<span class="event-info related">(${event.related_player_name})</span>` : ''}
          ${event.type.code === 'yellowcard' || event.type.code === 'redcard' ? `<span class="event-info related">${event.info !== null ? `(${event.info})` : ''}</span>` : ''} 
        </div>
      </div>
    `
    ).join('')}
  </div>
</section>
```

## Conclusie
Bij de ontwikkeling van het Voetbal Live Score Project heb ik veel nieuwe dingen geleerd en mijn programmeervaardigheden flink kunnen verbeteren. Een van de belangrijkste dingen die ik heb geleerd, was hoe je Server-Sent Events (SSE) gebruikt. SSE stelde me in staat om te begrijpen hoe de server real-time updates naar de website kan sturen zonder dat de website hier eerst om hoeft te vragen. Dit was cruciaal voor het tonen van live scores in het project.
Ik heb ook veel geleerd over hoe je API's (Application Programming Interfaces) kunt gebruiken. Door externe API's te gebruiken om live voetbalscores en -details op te halen, leerde ik over authenticatie, hoe je API-responses verwerkt en hoe je deze gegevens efficiënt in je applicatie kunt gebruiken. Dit heeft niet alleen mijn back-end programmeervaardigheden verbeterd, maar ook mijn begrip van hoe je externe services kunt integreren voor een soepele gebruikerservaring.
Daarnaast was dit project een goede gelegenheid om mijn algemene JavaScript-vaardigheden te oefenen en te verbeteren. Van het aanpassen van de website (DOM manipulatie) tot het werken met asynchrone operaties met Promises en Async/Await, elke stap hielp me JavaScript als programmeertaal beter te begrijpen.
