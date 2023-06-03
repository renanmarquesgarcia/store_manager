const { productService } = require('../services');
const { mapError } = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(mapError(type)).json(message);

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productService.insert(name);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(201).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const { type, message } = await productService.update(id, name);
  
  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(id);
  
  if (type) return res.status(mapError(type)).json({ message });

  res.sendStatus(204);
};

const search = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productService.search(q);

  if (type) return res.status(mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
  search,
};
