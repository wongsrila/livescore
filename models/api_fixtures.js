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
