const express = require('express');
const talkerRouter = require('./routes/talkerRouter');

const app = express();
app.use(express.json());

app.use(talkerRouter);

module.exports = app;