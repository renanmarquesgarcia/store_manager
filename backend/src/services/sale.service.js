const { saleModel } = require('../models');

const findAll = async () => {
  const sales = await saleModel.findAll();
  return { type: null, message: sales };
};

module.exports = {
  findAll,
};
