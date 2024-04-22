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
