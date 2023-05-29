const { saleModel } = require('../models');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

const findById = async (saleId) => {
  const sales = await saleModel.findById(saleId);
  if (sales.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sales };
};

module.exports = {
  findAll,
  findById,
};
