const { requestFixture } = require('../models/api_fixtures');

let fixtureId = null;

// testData = {
//   id: 18988008,
//   sport_id: 1,
//   league_id: 1356,
//   season_id: 22535,
//   stage_id: 77466580,
//   group_id: null,
//   aggregate_id: null,
//   round_id: 322689,
//   state_id: 5,
//   venue_id: 31442,
//   name: 'Perth Glory vs Western United',
//   starting_at: '2024-04-21 09:00:00',
//   result_info: 'Western United won after full-time.',
//   leg: '1/1',
//   details: null,
//   length: 90,
//   placeholder: false,
//   has_odds: true,
//   starting_at_timestamp: 1713682800,
//   round: {
//     id: 322689,
//     sport_id: 1,
//     league_id: 1356,
//     season_id: 22535,
//     stage_id: 77466580,
//     name: '25',
//     finished: false,
//     is_current: false,
//     starting_at: '2024-04-19',
//     ending_at: '2024-04-21',
//     games_in_current_week: true,
//   },
//   league: {
//     id: 1356,
//     sport_id: 1,
//     country_id: 98,
//     name: 'A-League Men',
//     active: true,
//     short_code: 'AUS AL',
//     image_path: 'https://cdn.sportmonks.com/images/soccer/leagues/12/1356.png',
//     type: 'league',
//     sub_type: 'domestic',
//     last_played_at: '2024-04-21 07:00:00',
//     category: 2,
//     has_jerseys: false,
//     country: {
//       id: 98,
//       continent_id: 4,
//       name: 'Australia',
//       official_name: 'Commonwealth of Australia',
//       fifa_name: 'AUS',
//       iso2: 'AU',
//       iso3: 'AUS',
//       latitude: '-25.585241317749023',
//       longitude: '134.50411987304688',
//       borders: [],
//       image_path:
//         'https://cdn.sportmonks.com/images/countries/png/short/au.png',
//     },
//   },
//   scores: [
//     {
//       id: 14270583,
//       fixture_id: 18988008,
//       type_id: 1525,
//       participant_id: 300,
//       score: {
//         goals: 3,
//         participant: 'home',
//       },
//       description: 'CURRENT',
//     },
//     {
//       id: 14270582,
//       fixture_id: 18988008,
//       type_id: 1525,
//       participant_id: 238265,
//       score: {
//         goals: 4,
//         participant: 'away',
//       },
//       description: 'CURRENT',
//     },
//     {
//       id: 14270577,
//       fixture_id: 18988008,
//       type_id: 1,
//       participant_id: 238265,
//       score: {
//         goals: 1,
//         participant: 'away',
//       },
//       description: '1ST_HALF',
//     },
//     {
//       id: 14270576,
//       fixture_id: 18988008,
//       type_id: 1,
//       participant_id: 300,
//       score: {
//         goals: 1,
//         participant: 'home',
//       },
//       description: '1ST_HALF',
//     },
//     {
//       id: 14270686,
//       fixture_id: 18988008,
//       type_id: 2,
//       participant_id: 300,
//       score: {
//         goals: 3,
//         participant: 'home',
//       },
//       description: '2ND_HALF',
//     },
//     {
//       id: 14270687,
//       fixture_id: 18988008,
//       type_id: 2,
//       participant_id: 238265,
//       score: {
//         goals: 4,
//         participant: 'away',
//       },
//       description: '2ND_HALF',
//     },
//   ],
//   events: [
//     {
//       id: 111651346,
//       fixture_id: 18988008,
//       period_id: 5368027,
//       participant_id: 238265,
//       type_id: 14,
//       section: 'event',
//       player_id: 37709605,
//       related_player_id: 750032,
//       player_name: 'Matthew Grimaldi',
//       related_player_name: 'Lachlan Wales',
//       result: '0-1',
//       info: 'Shot',
//       addition: '1st Goal',
//       minute: 4,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: null,
//       type: {
//         id: 14,
//         name: 'Goal',
//         code: 'goal',
//         developer_name: 'GOAL',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111651510,
//       fixture_id: 18988008,
//       period_id: 5368027,
//       participant_id: 238265,
//       type_id: 19,
//       section: 'event',
//       player_id: 73366,
//       related_player_id: null,
//       player_name: 'Steven Lustica',
//       related_player_name: null,
//       result: null,
//       info: 'Argument',
//       addition: null,
//       minute: 6,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1524,
//       type: {
//         id: 19,
//         name: 'Redcard',
//         code: 'redcard',
//         developer_name: 'YELLOWCARD',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652039,
//       fixture_id: 18988008,
//       period_id: 5368027,
//       participant_id: 300,
//       type_id: 14,
//       section: 'event',
//       player_id: 173221,
//       related_player_id: 749643,
//       player_name: 'Adam Taggart',
//       related_player_name: 'John Koutroumbis',
//       result: '1-1',
//       info: 'Header',
//       addition: '2nd Goal',
//       minute: 23,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1522,
//       type: {
//         id: 14,
//         name: 'Goal',
//         code: 'goal',
//         developer_name: 'GOAL',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652308,
//       fixture_id: 18988008,
//       period_id: 5368027,
//       participant_id: 300,
//       type_id: 19,
//       section: 'event',
//       player_id: 37264263,
//       related_player_id: null,
//       player_name: 'G. Colli',
//       related_player_name: null,
//       result: null,
//       info: 'Foul',
//       addition: null,
//       minute: 45,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1496,
//       type: {
//         id: 19,
//         name: 'Yellowcard',
//         code: 'yellowcard',
//         developer_name: 'YELLOWCARD',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652645,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 18,
//       section: 'event',
//       player_id: 749553,
//       related_player_id: 73366,
//       player_name: 'Sebastian Pasquali',
//       related_player_name: 'Steven Lustica',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 58,
//       extra_minute: null,
//       injured: false,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1523,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652708,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 18,
//       section: 'event',
//       player_id: 37609031,
//       related_player_id: 37266608,
//       player_name: 'Jake Najdovski',
//       related_player_name: 'Michael Ruhs',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 67,
//       extra_minute: null,
//       injured: false,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1523,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652709,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 18,
//       section: 'event',
//       player_id: 37708543,
//       related_player_id: 37709605,
//       player_name: 'A. Walatee',
//       related_player_name: 'Matthew Grimaldi',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 67,
//       extra_minute: null,
//       injured: false,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1523,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652742,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 19,
//       section: 'event',
//       player_id: 37130,
//       related_player_id: null,
//       player_name: 'Mustafa Amini',
//       related_player_name: null,
//       result: null,
//       info: 'Foul',
//       addition: null,
//       minute: 71,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1496,
//       type: {
//         id: 19,
//         name: 'Yellowcard',
//         code: 'yellowcard',
//         developer_name: 'YELLOWCARD',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652881,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 18,
//       section: 'event',
//       player_id: 37253440,
//       related_player_id: 749643,
//       player_name: 'J. Rawlins',
//       related_player_name: 'John Koutroumbis',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 80,
//       extra_minute: null,
//       injured: false,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1524,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652612,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 19,
//       section: 'event',
//       player_id: 37709605,
//       related_player_id: null,
//       player_name: 'Matthew Grimaldi',
//       related_player_name: null,
//       result: null,
//       info: 'Foul',
//       addition: null,
//       minute: 54,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1496,
//       type: {
//         id: 19,
//         name: 'Yellowcard',
//         code: 'yellowcard',
//         developer_name: 'YELLOWCARD',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111653107,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 14,
//       section: 'event',
//       player_id: 37709607,
//       related_player_id: null,
//       player_name: 'Oliver Lavale',
//       related_player_name: null,
//       result: '2-4',
//       info: 'Shot',
//       addition: '6th Goal',
//       minute: 90,
//       extra_minute: 2,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: null,
//       type: {
//         id: 14,
//         name: 'Goal',
//         code: 'goal',
//         developer_name: 'GOAL',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652511,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 14,
//       section: 'event',
//       player_id: 173221,
//       related_player_id: null,
//       player_name: 'Adam Taggart',
//       related_player_name: null,
//       result: '2-1',
//       info: 'Shot',
//       addition: '3rd Goal',
//       minute: 47,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1521,
//       type: {
//         id: 14,
//         name: 'Goal',
//         code: 'goal',
//         developer_name: 'GOAL',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652762,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 14,
//       section: 'event',
//       player_id: 37708543,
//       related_player_id: 10307080,
//       player_name: 'A. Walatee',
//       related_player_name: 'Angus Thurgate',
//       result: '2-3',
//       info: 'Shot',
//       addition: '5th Goal',
//       minute: 74,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1522,
//       type: {
//         id: 14,
//         name: 'Goal',
//         code: 'goal',
//         developer_name: 'GOAL',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652683,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 14,
//       section: 'event',
//       player_id: 31217641,
//       related_player_id: 37266608,
//       player_name: 'Riku Danzaki',
//       related_player_name: 'Michael Ruhs',
//       result: '2-2',
//       info: 'Shot',
//       addition: '4th Goal',
//       minute: 65,
//       extra_minute: null,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1522,
//       type: {
//         id: 14,
//         name: 'Goal',
//         code: 'goal',
//         developer_name: 'GOAL',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652839,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 18,
//       section: 'event',
//       player_id: 37607330,
//       related_player_id: 37130,
//       player_name: 'Jacob Muir',
//       related_player_name: 'Mustafa Amini',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 80,
//       extra_minute: null,
//       injured: true,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1524,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652674,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 18,
//       section: 'event',
//       player_id: 82807,
//       related_player_id: 28543788,
//       player_name: 'David Williams',
//       related_player_name: 'Stefan Colakovski',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 62,
//       extra_minute: null,
//       injured: true,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1524,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652990,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 18,
//       section: 'event',
//       player_id: 37750184,
//       related_player_id: 37697232,
//       player_name: 'Khoa Ngo',
//       related_player_name: 'D. Bennie',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 85,
//       extra_minute: null,
//       injured: false,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: null,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111652843,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 18,
//       section: 'event',
//       player_id: 28543771,
//       related_player_id: 37264176,
//       player_name: 'T. Ostler',
//       related_player_name: 'Jarrod Carluccio',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 80,
//       extra_minute: null,
//       injured: false,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1523,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111653128,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 300,
//       type_id: 14,
//       section: 'event',
//       player_id: 82807,
//       related_player_id: 28543771,
//       player_name: 'David Williams',
//       related_player_name: 'T. Ostler',
//       result: '3-4',
//       info: 'Shot',
//       addition: '7th Goal',
//       minute: 90,
//       extra_minute: 3,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1522,
//       type: {
//         id: 14,
//         name: 'Goal',
//         code: 'goal',
//         developer_name: 'GOAL',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111653054,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 18,
//       section: 'event',
//       player_id: 37709607,
//       related_player_id: 750032,
//       player_name: 'Oliver Lavale',
//       related_player_name: 'Lachlan Wales',
//       result: null,
//       info: null,
//       addition: null,
//       minute: 88,
//       extra_minute: null,
//       injured: false,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: null,
//       type: {
//         id: 18,
//         name: 'Substitution',
//         code: 'substitution',
//         developer_name: 'SUBSTITUTION',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//     {
//       id: 111653175,
//       fixture_id: 18988008,
//       period_id: 5368053,
//       participant_id: 238265,
//       type_id: 19,
//       section: 'event',
//       player_id: 749553,
//       related_player_id: null,
//       player_name: 'Sebastian Pasquali',
//       related_player_name: null,
//       result: null,
//       info: 'Foul',
//       addition: null,
//       minute: 90,
//       extra_minute: 5,
//       injured: null,
//       on_bench: false,
//       coach_id: null,
//       sub_type_id: 1496,
//       type: {
//         id: 19,
//         name: 'Yellowcard',
//         code: 'yellowcard',
//         developer_name: 'YELLOWCARD',
//         model_type: 'event',
//         stat_group: null,
//       },
//     },
//   ],
//   participants: [
//     {
//       id: 300,
//       sport_id: 1,
//       country_id: 98,
//       venue_id: 31442,
//       gender: 'male',
//       name: 'Perth Glory',
//       short_code: 'PER',
//       image_path: 'https://cdn.sportmonks.com/images/soccer/teams/12/300.png',
//       founded: 1995,
//       type: 'domestic',
//       placeholder: false,
//       last_played_at: '2024-04-21 07:00:00',
//       meta: {
//         location: 'home',
//         winner: false,
//         position: 12,
//       },
//     },
//     {
//       id: 238265,
//       sport_id: 1,
//       country_id: 98,
//       venue_id: 338746,
//       gender: 'male',
//       name: 'Western United',
//       short_code: 'WUN',
//       image_path:
//         'https://cdn.sportmonks.com/images/soccer/teams/25/238265.png',
//       founded: null,
//       type: 'domestic',
//       placeholder: false,
//       last_played_at: '2024-04-21 07:00:00',
//       meta: {
//         location: 'away',
//         winner: true,
//         position: 11,
//       },
//     },
//   ],
//   periods: [
//     {
//       id: 5368027,
//       fixture_id: 18988008,
//       type_id: 1,
//       started: 1713682804,
//       ended: 1713685702,
//       counts_from: 0,
//       ticking: false,
//       sort_order: 1,
//       description: '1st-half',
//       time_added: 3,
//       period_length: 45,
//       minutes: 48,
//       seconds: 18,
//       has_timer: false,
//     },
//     {
//       id: 5368053,
//       fixture_id: 18988008,
//       type_id: 2,
//       started: 1713686647,
//       ended: 1713689782,
//       counts_from: 45,
//       ticking: false,
//       sort_order: 2,
//       description: '2nd-half',
//       time_added: 6,
//       period_length: 45,
//       minutes: 97,
//       seconds: 15,
//       has_timer: false,
//     },
//   ],
//   state: {
//     id: 5,
//     state: 'FT',
//     name: 'Full Time',
//     short_name: 'FT',
//     developer_name: 'FT',
//     type: {
//       id: 2,
//       name: '2nd Half',
//       code: '2nd-half',
//       developer_name: '2ND_HALF',
//       model_type: 'period',
//       stat_group: null,
//     },
//   },
// };

const getFixture = async (req, res) => {
  fixtureId = req.params.id;
  try {
    res.render('fixture');
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
    // const fixtureData = testData;
    const fixtureData = await requestFixture(fixtureId);

    res.write(`data: ${JSON.stringify(fixtureData)}\n\n`);
  };

  getFixture();

  const intervalId = setInterval(getFixture, 4000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = {
  getFixture,
  fixtureStream,
};
