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
  const { type, message } = await saleService.insert(data);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message); 
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.sendStatus(204);
};

const updateProductQuantity = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { type, message } = await saleService.updateProductQuantity(saleId, productId, quantity);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteSale,
  updateProductQuantity,
};
