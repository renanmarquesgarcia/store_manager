const { productService } = require('../services');

const findAll = async (_req, res) => {
  const { message } = await productService.findAll();

  res.status(200).json(message);
};

module.exports = {
  findAll,
};
