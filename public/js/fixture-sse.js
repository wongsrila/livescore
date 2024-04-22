import {
  formatTimestampAsTime,
  formatFixtureDate,
  stateNames,
} from '/js/utils.js';

let prevHomeScore = 0;
let prevAwayScore = 0;
let audioElement = null;
let scoresInitialized = false;

function playGoalSound() {
  if (audioElement) {
    // If an audio element already exists, stop it and remove it
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.removeEventListener('ended', handleAudioEnded);
    document.body.removeChild(audioElement);
  }

  audioElement = document.createElement('audio');
  audioElement.src = '/audio/goal.mp3'; // Replace with the path to your goal sound file
  audioElement.autoplay = true;
  document.body.appendChild(audioElement);

  // Add an event listener to remove the audio element after it finishes playing
  audioElement.addEventListener('ended', handleAudioEnded);
}

function handleAudioEnded() {
  document.body.removeChild(audioElement);
  audioElement = null;
}

const evtSource = new EventSource(`/fixture-stream`);
evtSource.onmessage = function (event) {
  const data = JSON.parse(event.data);

  const contentWrapper = document.getElementsByClassName('content-wrapper')[0];

  // Clear the existing content
  contentWrapper.innerHTML = '';

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

  if (!scoresInitialized) {
    prevHomeScore = homeScore;
    prevAwayScore = awayScore;
    scoresInitialized = true;
  }

  if (prevHomeScore !== homeScore) {
    playGoalSound();
    prevHomeScore = homeScore;
  }

  if (prevAwayScore !== awayScore) {
    playGoalSound();
    prevAwayScore = awayScore;
  }

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
    };

    return eventIcons[eventCode];
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
              <span class="event-info">${event.player_name !== null ? event.player_name : ''}</span>
              ${event.related_player_name !== null ? `<span class="event-info related">(${event.related_player_name})</span>` : ''}
              ${event.type.code === 'yellowcard' || event.type.code === 'redcard' ? `<span class="event-info related">${event.info !== null ? `(${event.info})` : ''}</span>` : ''} 
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
