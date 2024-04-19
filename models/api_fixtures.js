require('dotenv').config();
const { todayDate } = require('../utils/dateFormats');

// Get livescores
async function requestLivescores() {
  try {
    const getDate = todayDate();
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/livescores?&include=round;league.country;scores;events;participants;periods;state.type&timezone=Europe/Amsterdam`,
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
};
