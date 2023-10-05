const { Router } = require('express');
const crypto = require('crypto');

const loginRouter = Router();

const HTTP_OK_STATUS = 200;

loginRouter.post('/login', async (req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token });
  // const { email, password } = req.body;
  // if (email === 'email@email.com' && password === '123456') {
  // } 
});

module.exports = loginRouter;