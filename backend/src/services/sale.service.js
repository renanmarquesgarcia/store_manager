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
  const saleId = await saleModel.insertIntoSalesTable();

  const salePromisse = data.map((sale) => saleModel.insert(saleId, sale));
  const itemsSold = await Promise.all(salePromisse);
  const sale = { id: saleId, itemsSold };
  
  return { type: null, message: sale };
};

module.exports = {
  findAll,
  findById,
  insert,
};
