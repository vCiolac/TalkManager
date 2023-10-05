const { Router } = require('express');
const readAndWrite = require('../utils/readAndWrite');

const talkerRouter = Router();

const HTTP_OK_STATUS = 200;

talkerRouter.get('/talker', async (req, res) => {
  const data = await readAndWrite.readFile();
  const result = data.length > 0 ? data : [];
  res.status(HTTP_OK_STATUS).json(result);
});

module.exports = talkerRouter;