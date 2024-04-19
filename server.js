const express = require('express');
const path = require('path');
require('dotenv').config();
const routes = require('./routes/routes');
const { livescoreStream } = require('./controllers/livescoreController');

const app = express();
const port = process.env.PORT || 3333;

// Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middleware
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', routes);
// app.get('/fixtures/:id/events', fixtureStream);
app.get('/livescore-stream', livescoreStream);

// Manifest file
// app.get('/manifest.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.sendFile(path.join(__dirname, 'manifest.json'));
// });

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});
