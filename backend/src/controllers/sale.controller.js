const { saleService } = require('../services');
const { mapError } = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

module.exports = {
  findAll,
};
