const validateRate = (req, res, next) => {
  const { rate } = req.query;
  const rateNumber = Number(rate);
  if (rate && (rateNumber < 1 || rateNumber > 5 || !Number.isInteger(rateNumber))) {
    return res.status(400).json({ 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

const validateDate = (req, res, next) => {
  const { date } = req.query;
  if (!date) {
    next();
  } else {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!date.match(datePattern)) {
      return res.status(400).json({
        message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
      });
    }
    next();
  }
};

module.exports = { validateRate, validateDate };
