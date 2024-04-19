const { requestFixture } = require('../models/api_fixtures');

let fixtureId = null;

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
    // const livescoresData = testData;
    const fixtureData = await requestFixture(fixtureId);

    res.write(`data: ${JSON.stringify(fixtureData)}\n\n`);
  };

  getFixture();

  const intervalId = setInterval(getFixture, 5000);

  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
};

module.exports = {
  getFixture,
  fixtureStream,
};
