const express = require('express');
const talkerRouter = require('./routes/talkerRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();
app.use(express.json());

app.use(talkerRouter);
app.use(loginRouter);

module.exports = app;