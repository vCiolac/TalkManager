const { Router } = require('express');
const readAndWrite = require('../utils/readAndWrite');
const validadeAuth = require('../middlewares/validateAuth');
const validateNAT = require('../middlewares/validateNAT');

const talkerRouter = Router();

const HTTP_OK_STATUS = 200;

talkerRouter.get('/talker', async (req, res) => {
  const data = await readAndWrite.readFile();
  const result = data.length > 0 ? data : [];
  return res.status(HTTP_OK_STATUS).json(result);
});

talkerRouter.get('/talker/search/', validadeAuth, async (req, res) => {
  const { q } = req.query;
  const lowerQ = q ? q.toLowerCase() : '';
  const data = await readAndWrite.readFile();
  if (!q) {
    return res.status(200).json(data);
  }
  const result = data.filter((talker) => talker.name.toLowerCase().includes(lowerQ));
  if (result.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json(result);
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

talkerRouter.post('/talker',
  validadeAuth, validateNAT.validateName, validateNAT.validateWatchedAt,
  validateNAT.validateAge, validateNAT.validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const data = await readAndWrite.readFile();
    const id = data.length + 1;
    const newTalker = { id, name, age, talk };
    data.push(newTalker);
    await readAndWrite.writeFile(data);
    return res.status(201).json(newTalker);
  });

talkerRouter.put('/talker/:id',
  validadeAuth, validateNAT.validateName, validateNAT.validateWatchedAt,
  validateNAT.validateAge, validateNAT.validateRate,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const data = await readAndWrite.readFile();
    const intId = parseInt(id, 10);
    const index = data.findIndex((talker) => talker.id === intId);
    if (index === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const newTalker = { id: intId, name, age, talk };
    data[index] = newTalker;
    await readAndWrite.writeFile(data);
    return res.status(200).json(newTalker);
  });

talkerRouter.delete('/talker/:id', validadeAuth, async (req, res) => {
  const { id } = req.params;
  const data = await readAndWrite.readFile();
  const index = data.findIndex((talker) => talker.id === parseInt(id, 10));
  if (index === -1) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  data.splice(index, 1);
  await readAndWrite.writeFile(data);
  return res.status(204).end();
});

module.exports = talkerRouter;