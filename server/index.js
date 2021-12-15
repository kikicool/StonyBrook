const path = require('path');
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const apicache = require('apicache');
const { step1, getTags } = require('./controller/controller.js')

app.use(bodyParser.json());
app.use(morgan('dev'));

const cache = apicache.middleware;

app.use(express.static(path.join(__dirname, '../client/public')));


const PORT = process.env.PORT || 1986;

app.get('/api/ping', cache('60 minutes'), step1)

app.get('/api/posts/:tags/:sortBy?/:direction?', cache('60 minutes'), getTags);


app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});