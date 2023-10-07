const { Router } = require('express');
const readAndWrite = require('../utils/readAndWrite');
const validadeAuth = require('../middlewares/validateAuth');
const validateNAT = require('../middlewares/validateNAT');
const validateSearch = require('../middlewares/validateSearch');
const searchRouteUtils = require('../utils/searchRouteUtils');
const findAll = require('../db/talkerDB');

const talkerRouter = Router();

const HTTP_OK_STATUS = 200;

talkerRouter.get('/talker', async (req, res) => {
  const data = await readAndWrite.readFile();
  const result = data.length > 0 ? data : [];
  return res.status(HTTP_OK_STATUS).json(result);
});

talkerRouter.get('/talker/db/', async (req, res) => {
  try {
    const [result] = await findAll();
    const talkers = result.map((row) => ({
      id: row.id,
      name: row.name,
      age: row.age,
      talk: {
        watchedAt: row.watched_at,
        rate: row.rate,
      },
    }));
    return res.status(HTTP_OK_STATUS).json(talkers);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

talkerRouter.get('/talker/search/',
  validadeAuth, validateSearch.validateRate, validateSearch.validateDate,
  async (req, res) => {
    const { q, rate, date } = req.query;
    const data = await readAndWrite.readFile();
    let result = data;
    if (q) {
      result = searchRouteUtils.filterByName(result, q);
    }
    if (rate) {
      result = searchRouteUtils.filterByRate(result, rate);
    }
    if (date) {
      result = searchRouteUtils.filterByDate(result, date);
    }
    if (result.length === 0) {
      return res.status(200).json([]);
    }
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
    return res.status(HTTP_OK_STATUS).json(newTalker);
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

talkerRouter.patch('/talker/rate/:id',
  validadeAuth, validateNAT.validatePatchRate,
  async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;
    const data = await readAndWrite.readFile();
    const index = data.findIndex((talker) => talker.id === parseInt(id, 10));
    if (index === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    data[index].talk.rate = rate;
    await readAndWrite.writeFile(data);
    return res.status(204).json(data[index]);
  });

module.exports = talkerRouter;