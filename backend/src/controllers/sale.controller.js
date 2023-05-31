const { saleService } = require('../services');
const { mapError } = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const insert = async (req, res) => {
  const data = req.body;
  const result = await saleService.insert(data);
  res.status(200).json(result); 
};

module.exports = {
  findAll,
  findById,
  insert,
};
