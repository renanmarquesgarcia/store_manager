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

const insert = async (data) => {
  const salePromisse = data.map((sale) => saleModel.insert(sale));
  const result = await Promise.all(salePromisse);
  console.log(result);
  // const result = await saleModel.insert(data)
  return 'result';
};

module.exports = {
  findAll,
  findById,
  insert,
};
