const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();

app
  .use(history())
  .use(express.static('dist'))
  .listen(process.env.PORT || 8080);
