const {
  requestLivescores,
  requestTodayFixtures,
} = require('../models/api_fixtures');

testData = [
  {
    id: 19055197,
    sport_id: 1,
    league_id: 672,
    season_id: 23000,
    stage_id: 77469089,
    group_id: null,
    aggregate_id: null,
    round_id: 329813,
    state_id: 22,
    venue_id: 232245,
    name: 'Fortaleza CEIF vs Atlético Bucaramanga',
    starting_at: '2024-04-22 23:00:00',
    result_info: null,
    leg: '1/1',
    details: null,
    length: 90,
    placeholder: false,
    has_odds: true,
    starting_at_timestamp: 1713819600,
    round: {
      id: 329813,
      sport_id: 1,
      league_id: 672,
      season_id: 23000,
      stage_id: 77469089,
      name: '18',
      finished: false,
      is_current: true,
      starting_at: '2024-04-20',
      ending_at: '2024-04-23',
      games_in_current_week: true,
    },
    league: {
      id: 672,
      sport_id: 1,
      country_id: 353,
      name: 'Liga BetPlay',
      active: true,
      short_code: 'COL PA',
      image_path: 'https://cdn.sportmonks.com/images/soccer/leagues/0/672.png',
      type: 'league',
      sub_type: 'domestic',
      last_played_at: '2024-04-22 01:30:00',
      category: 4,
      has_jerseys: false,
      country: {
        id: 353,
        continent_id: 7,
        name: 'Colombia',
        official_name: 'Republic of Colombia',
        fifa_name: 'COL',
        iso2: 'CO',
        iso3: 'COL',
        latitude: '3.9976072311401367',
        longitude: '-73.27796936035156',
        borders: ['BRA', 'ECU', 'PAN', 'PER', 'VEN'],
        image_path:
          'https://cdn.sportmonks.com/images/countries/png/short/co.png',
      },
    },
    scores: [
      {
        id: 14287240,
        fixture_id: 19055197,
        type_id: 1525,
        participant_id: 8238,
        score: {
          goals: 2,
          participant: 'away',
        },
        description: 'CURRENT',
      },
      {
        id: 14287238,
        fixture_id: 19055197,
        type_id: 1,
        participant_id: 8238,
        score: {
          goals: 1,
          participant: 'away',
        },
        description: '1ST_HALF',
      },
      {
        id: 14287239,
        fixture_id: 19055197,
        type_id: 1,
        participant_id: 6272,
        score: {
          goals: 0,
          participant: 'home',
        },
        description: '1ST_HALF',
      },
      {
        id: 14287241,
        fixture_id: 19055197,
        type_id: 1525,
        participant_id: 6272,
        score: {
          goals: 0,
          participant: 'home',
        },
        description: 'CURRENT',
      },
      {
        id: 14287500,
        fixture_id: 19055197,
        type_id: 2,
        participant_id: 8238,
        score: {
          goals: 2,
          participant: 'away',
        },
        description: '2ND_HALF',
      },
      {
        id: 14287501,
        fixture_id: 19055197,
        type_id: 2,
        participant_id: 6272,
        score: {
          goals: 0,
          participant: 'home',
        },
        description: '2ND_HALF',
      },
    ],
    events: [
      {
        id: 111826499,
        fixture_id: 19055197,
        period_id: 5374225,
        participant_id: 6272,
        type_id: 19,
        section: 'event',
        player_id: 37261435,
        related_player_id: null,
        player_name: 'Alejandro Moralez',
        related_player_name: null,
        result: null,
        info: 'Foul',
        addition: null,
        minute: 45,
        extra_minute: null,
        injured: null,
        on_bench: false,
        coach_id: null,
        sub_type_id: 1496,
      },
      {
        id: 111826501,
        fixture_id: 19055197,
        period_id: 5374225,
        participant_id: 8238,
        type_id: 15,
        section: 'event',
        player_id: 37422969,
        related_player_id: null,
        player_name: 'Juan Camilo Castillo',
        related_player_name: null,
        result: '0-1',
        info: null,
        addition: '1st Goal',
        minute: 45,
        extra_minute: 2,
        injured: null,
        on_bench: false,
        coach_id: null,
        sub_type_id: null,
      },
      {
        id: 111826549,
        fixture_id: 19055197,
        period_id: 5374286,
        participant_id: 8238,
        type_id: 14,
        section: 'event',
        player_id: 37614891,
        related_player_id: 17168800,
        player_name: 'Joider Micolta',
        related_player_name: 'Misael Martínez',
        result: '0-2',
        info: null,
        addition: '2nd Goal',
        minute: 50,
        extra_minute: null,
        injured: null,
        on_bench: false,
        coach_id: null,
        sub_type_id: 1522,
      },
      {
        id: 111826580,
        fixture_id: 19055197,
        period_id: 5374286,
        participant_id: 8238,
        type_id: 19,
        section: 'event',
        player_id: 17168800,
        related_player_id: null,
        player_name: 'Misael Martínez',
        related_player_name: null,
        result: null,
        info: 'Foul',
        addition: null,
        minute: 57,
        extra_minute: null,
        injured: null,
        on_bench: false,
        coach_id: null,
        sub_type_id: 1496,
      },
      {
        id: 111826655,
        fixture_id: 19055197,
        period_id: 5374286,
        participant_id: 8238,
        type_id: 18,
        section: 'event',
        player_id: 240354,
        related_player_id: 237216,
        player_name: 'Aldair Zárate',
        related_player_name: 'Juan David Rodríguez',
        result: null,
        info: null,
        addition: null,
        minute: 64,
        extra_minute: null,
        injured: false,
        on_bench: false,
        coach_id: null,
        sub_type_id: 1523,
      },
      {
        id: 111826650,
        fixture_id: 19055197,
        period_id: 5374286,
        participant_id: 6272,
        type_id: 18,
        section: 'event',
        player_id: 14350697,
        related_player_id: 10626657,
        player_name: 'Hayen Palacios',
        related_player_name: 'I. Anderson',
        result: null,
        info: null,
        addition: null,
        minute: 64,
        extra_minute: null,
        injured: false,
        on_bench: false,
        coach_id: null,
        sub_type_id: 1523,
      },
    ],
    participants: [
      {
        id: 8238,
        sport_id: 1,
        country_id: 353,
        venue_id: 5349,
        gender: 'male',
        name: 'Atlético Bucaramanga',
        short_code: 'ABU',
        image_path:
          'https://cdn.sportmonks.com/images/soccer/teams/14/8238.png',
        founded: 1949,
        type: 'domestic',
        placeholder: false,
        last_played_at: '2024-04-20 01:10:00',
        meta: {
          location: 'away',
          winner: null,
          position: 3,
        },
      },
      {
        id: 6272,
        sport_id: 1,
        country_id: 353,
        venue_id: 232245,
        gender: 'male',
        name: 'Fortaleza CEIF',
        short_code: 'FOR',
        image_path: 'https://cdn.sportmonks.com/images/soccer/teams/0/6272.png',
        founded: 2010,
        type: 'domestic',
        placeholder: false,
        last_played_at: '2024-04-18 21:00:00',
        meta: {
          location: 'home',
          winner: null,
          position: 11,
        },
      },
    ],
    periods: [
      {
        id: 5374225,
        fixture_id: 19055197,
        type_id: 1,
        started: 1713819553,
        ended: 1713822476,
        counts_from: 0,
        ticking: false,
        sort_order: 1,
        description: '1st-half',
        time_added: 1,
        period_length: 45,
        minutes: 48,
        seconds: 43,
        has_timer: false,
      },
      {
        id: 5374286,
        fixture_id: 19055197,
        type_id: 2,
        started: 1713823457,
        ended: null,
        counts_from: 45,
        ticking: true,
        sort_order: 2,
        description: '2nd-half',
        time_added: null,
        period_length: 45,
        minutes: 68,
        seconds: 37,
        has_timer: true,
      },
    ],
    state: {
      id: 22,
      state: 'INPLAY_2ND_HALF',
      name: '2nd Half',
      short_name: '2nd',
      developer_name: 'INPLAY_2ND_HALF',
      type: {
        id: 2,
        name: '2nd Half',
        code: '2nd-half',
        developer_name: '2ND_HALF',
        model_type: 'period',
        stat_group: null,
      },
    },
  },
];

const getIndex = async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

const livescoreStream = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const getLivescore = async () => {
    // const livescoresData = testData;
    const livescoresData = await requestLivescores();
    const fixturesToday = await requestTodayFixtures();

    if (livescoresData) {
      const orderedData = livescoresData.sort(
        (a, b) => b.starting_at_timestamp - a.starting_at_timestamp
      );

      res.write(`data: ${JSON.stringify(orderedData)}\n\n`);
    } else {
      const orderedData = fixturesToday.sort(
        (a, b) => b.starting_at_timestamp - a.starting_at_timestamp
      );
      res.write(`data: ${JSON.stringify(orderedData)}\n\n`);
    }
  };

  getLivescore();

  const intervalId = setInterval(getLivescore, 10000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = {
  getIndex,
  livescoreStream,
};
