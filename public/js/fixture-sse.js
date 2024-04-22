// Format timestamp function
function formatTimestampAsTime(timestamp) {
  if (timestamp === undefined) return '';

  // Convert the Unix timestamp from seconds to milliseconds
  const date = new Date(timestamp * 1000);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleTimeString('nl-NL', timeOptions);
}

function formatFixtureDate(starting_at) {
  if (!starting_at) return '';

  const dateString = starting_at;
  const date = new Date(dateString);
  const monthNames = [
    'januari',
    'februari',
    'maart',
    'april',
    'mei',
    'juni',
    'juli',
    'augustus',
    'september',
    'oktober',
    'november',
    'december',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear().toString().slice(-2);
  const month = monthNames[monthIndex];
  const result = `${day} ${month} '${year}`;
  return result; // Output: "14 augustus '10"
}

const evtSource = new EventSource(`/fixture-stream`);
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);

  // console.log(data);

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

  function getTotalMinutes(event) {
    const totalMinutes = event.minute + (event.extra_minute || 0);
    return totalMinutes;
  }

  const filteredEvents = data.events.filter(
    (event) =>
      event.type.code === 'goal' ||
      event.type.code === 'owngoal' ||
      event.type.code === 'penalty' ||
      event.type.code === 'yellowcard' ||
      event.type.code === 'redcard' ||
      event.type.code === 'substitution'
  );

  // Get home team stats
  const homeStats = data.statistics.filter(
    (statistic) => statistic.location === 'home'
  );

  // Get Away team stats
  const awayStats = data.statistics.filter(
    (statistic) => statistic.location === 'away'
  );

  function getHomeStats(type_id) {
    const stat = homeStats.find((stat) => stat.type_id === type_id);
    return stat?.data.value ?? 0; // Return 0 if stat is undefined
  }

  function getAwayStats(type_id) {
    const stat = awayStats.find((stat) => stat.type_id === type_id);
    return stat?.data.value ?? 0; // Return 0 if stat is undefined
  }

  const sortedEvents = filteredEvents.sort((a, b) => {
    const aTotalMinutes = getTotalMinutes(a);
    const bTotalMinutes = getTotalMinutes(b);
    return bTotalMinutes - aTotalMinutes;
  });

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
      substitution: '/img/substitution.svg',
      // Add more event codes and their corresponding icon file names here
    };

    return eventIcons[eventCode] || 'default.png'; // Return default icon if event code is not found
  }

  // Create the fixture_row HTML
  // prettier-ignore
  const fixtureHTML = /*html*/ `
    <section class="breadcrumb">
      <div><a href="/">Live Scores</a></div>
      <b>></b>
      <div><img src="${
        data.league.country.image_path
      }" alt="country-flag" width="24"></div>
      <a href="#">${data.league?.name || ''} ${
    data.round !== null ? `| Round ${data.round.name}` : ''
  }</a>
    </section>
    <section class="h2h-wrapper">
      <div class="team-logo">
        <img src="${homeTeamImagePath}" alt="home team logo">
        <p>${homeTeamName}</p>
      </div>
      <div class="fixture-score-wrappper">
        <p class="fixture-date">${formatTimestampAsTime(
          data.starting_at_timestamp
        )} - ${formatFixtureDate(data.starting_at)}</p>
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
              <span class="event-info">${event.player_name}</span>
              ${event.related_player_name !== null ? `<span class="event-info related">(${event.related_player_name})</span>` : ''}
              ${event.type.code === 'yellowcard' || event.type.code === 'redcard' ? `<span class="event-info related">(${event.info})</span>` : ''} 
            </div>
          </div>
        `
        ).join('')}
      </div>
    </section>
    <section class="fixture-nav">
      <p class="nav-btn">Statistics</p>
    </section>
    <section class="stats-section">
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(45)}%</div>
        <div class="stats-info">Ball Possession</div>
        <div class="away-stats">${getAwayStats(45)}%</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(42)}</div>
        <div class="stats-info">Shots</div>
        <div class="away-stats">${getAwayStats(42)}</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(86)}</div>
        <div class="stats-info">Shots on target</div>
        <div class="away-stats">${getAwayStats(86)}</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(80)}</div>
        <div class="stats-info">Passes</div>
        <div class="away-stats">${getAwayStats(80)}</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(82)}%</div>
        <div class="stats-info">Pass accuracy</div>
        <div class="away-stats">${getAwayStats(82)}%</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(56)}</div>
        <div class="stats-info">Fouls</div>
        <div class="away-stats">${getAwayStats(56)}</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(84)}</div>
        <div class="stats-info">Yellow Cards</div>
        <div class="away-stats">${getAwayStats(84)}</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(83)}</div>
        <div class="stats-info">Red Cards</div>
        <div class="away-stats">${getAwayStats(83)}</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(51)}</div>
        <div class="stats-info">Offsides</div>
        <div class="away-stats">${getAwayStats(51)}</div>
      </div>
      <div class="stats-row">
        <div class="home-stats">${getHomeStats(34)}</div>
        <div class="stats-info">Corner Kicks</div>
        <div class="away-stats">${getAwayStats(34)}</div>
      </div>
    </section>
    
   `;

  // Insert the fixtureRowHTML inside table_wrapper
  contentWrapper.innerHTML += fixtureHTML;
};
