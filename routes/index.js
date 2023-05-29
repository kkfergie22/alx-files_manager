const express = require('express');
const AppController = require('./controllers/AppController');

const app = express();

app.get('/status', AppController.getStatus);

app.get('/stats', AppController.getStats);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
