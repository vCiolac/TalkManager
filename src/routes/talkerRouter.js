const { Router } = require('express');
const readAndWrite = require('../utils/readAndWrite');

const talkerRouter = Router();

const HTTP_OK_STATUS = 200;

talkerRouter.get('/talker', async (req, res) => {
  const data = await readAndWrite.readFile();
  const result = data.length > 0 ? data : [];
  return res.status(HTTP_OK_STATUS).json(result);
});

talkerRouter.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readAndWrite.readFile();
  const result = data.find((talker) => talker.id === parseInt(id, 10));
  if (!result) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(result);
});

module.exports = talkerRouter;