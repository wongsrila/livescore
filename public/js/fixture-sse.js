const evtSource = new EventSource(`/fixture-stream`);
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);

  console.log(data);

  const contentWrapper = document.getElementsByClassName('content-wrapper')[0];

  // Clear the existing content
  contentWrapper.innerHTML = '';

  const stateNames = {
    1: 'Not Started',
    2: '1st Half',
    3: 'Half Time',
    4: 'Break',
    5: 'Full Time',
    6: 'Extra Time',
    7: 'After Extra Time',
    8: 'After Penalties',
    9: 'Penalties',
    10: 'Postponed',
    11: 'Suspended',
    12: 'Cancelled',
    13: 'To Be Announced',
    14: 'Walk Over',
    15: 'Abandoned',
    16: 'Delayed',
    17: 'Awarded',
    18: 'Interrupted',
    19: 'Awaiting Updates',
    20: 'Deleted',
    21: 'Extra Time - Break',
    22: '2nd Half',
    23: 'ET - 2nd Half',
    25: 'Penalties - Break',
    26: 'Pending',
  };

  let currentTimeOrState;
  let liveTicker = '';
  let addedTime = '';
  let homeTeamName = '';
  let homeTeamImagePath = '';
  let awayTeamName = '';
  let awayTeamImagePath = '';
  let homeScore = 0;
  let awayScore = 0;
  let homeTeamId = null;
  let awayTeamId = null;

  // Get current time or state name
  const tickingPeriod = data.periods.find((period) => period.ticking === true);

  const filteredEvents = data.events.filter(
    (event) =>
      event.type.code === 'goal' ||
      event.type.code === 'owngoal' ||
      event.type.code === 'penalty' ||
      event.type.code === 'yellowcard' ||
      event.type.code === 'redcard'
  );

  const sortedEvents = filteredEvents.sort((a, b) => b.minute - a.minute);

  // Get home and away team details
  data.participants.forEach((participant) => {
    if (participant.meta.location === 'home') {
      homeTeamName = participant.name;
      homeTeamId = participant.id;
      homeTeamImagePath = participant.image_path;
    } else if (participant.meta.location === 'away') {
      awayTeamName = participant.name;
      awayTeamId = participant.id;
      awayTeamImagePath = participant.image_path;
    }
  });

  data.scores.forEach((score) => {
    if (score.score.participant === 'home') {
      homeScore = score.score.goals;
    } else {
      awayScore = score.score.goals;
    }
  });

  if (data.state.id === 3) {
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
      currentTimeOrState = stateNames[data.state.id] || '';
    }
  }

  // Check if the tickingPeriod exists and set the liveTicker accordingly
  if (tickingPeriod) {
    liveTicker = `<span class="live-data">'</span>`;
  }

  function getEventIcon(eventCode) {
    const eventIcons = {
      yellowcard: '/img/yellow_card.svg',
      redcard: '/img/red_card.svg',
      goal: '/img/goal.svg',
      owngoal: '/img/goal.svg',
      penalty: '/img/goal.svg',
      // Add more event codes and their corresponding icon file names here
    };

    return eventIcons[eventCode] || 'default.png'; // Return default icon if event code is not found
  }

  // Create the fixture_row HTML
  const fixtureHTML = /*html*/ `
    <section class="breadcrumb">
      <div><a href="/">Live Scores</a></div>
      <div><b>></b></div>
      <div><img src="${
        data.league.country.image_path
      }" alt="country-flag" width="24"></div>
      <div>${data.league?.name || ''} ${
    data.round !== null ? `| Round ${data.round.name}` : ''
  }</div>
    </section>
    <section class="h2h-wrapper">
      <div class="team-logo">
        <img src="${homeTeamImagePath}" alt="home team logo">
        <p>${homeTeamName}</p>
      </div>
      <div class="fixture-score-wrappper">
        <p class="fixture-date">23:30 - 20 april '24</p>
        <p class="fixture-score">${homeScore}-${awayScore}</p>
        <p class="fixture-state">${currentTimeOrState}${liveTicker}${addedTime}</p>
      </div>
      <div class="team-logo">
        <div class="team-logo">
          <img src="${awayTeamImagePath}" alt="away team logo">
          <p>${awayTeamName}</p>
        </div>
      </div>
    </section>
    <section class="fixture-nav">
      <p class="nav-btn active">Summary</p>
      <p class="nav-btn">Stats</p>
      <p class="nav-btn">Lineups</p>
    </section>
    <section class="events-list">
      <div class="events-column">
        ${sortedEvents
          .map(
            (event) => `
            <div class="event-item ${
              event.participant_id === homeTeamId ? 'home-event' : 'away-event'
            }">
              <div class="event-minute">${event.minute}'${
              event.extra_minute
                ? `<span class="added-time"> +${event.extra_minute}</span>`
                : ''
            }</div>
              <div class="event-icon">
                <img src="${getEventIcon(event.type.code)}" alt="${
              event.type.name
            }" width="16">
            ${
              event.result !== null
                ? `<p class="event-icon-text">${event.result}</p>`
                : ''
            }
              </div>
              <div class="event-details ${
                event.participant_id === homeTeamId ? 'home' : 'away'
              }">
                <span class="event-info">${event.player_name}</span>
                ${
                  event.related_player_name !== null
                    ? `<span class="event-info related">(${event.related_player_name})</span>`
                    : ''
                }
                
              </div>
            </div>
          `
          )
          .join('')}
      </div>
    </section>
   `;

  // Insert the fixtureRowHTML inside table_wrapper
  contentWrapper.innerHTML += fixtureHTML;
};
