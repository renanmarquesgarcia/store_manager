const { saleModel, productModel } = require('../models');

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
  const quantityValidation = data.some(({ quantity }) => quantity < 1);
  if (quantityValidation) {
    return { 
      type: 'INVALID_VALUE',
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  const promisseProducts = data.map(({ productId }) => productModel.findById(productId));  
  const products = await Promise.all(promisseProducts);  
  if (products.some((product) => product === undefined)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const saleId = await saleModel.insertIntoSalesTable();

  const salePromisse = data.map((sale) => saleModel.insert(saleId, sale));
  const itemsSold = await Promise.all(salePromisse);
  const sale = { id: saleId, itemsSold };
  
  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const saleToDelete = await saleModel.findById(saleId);
  if (saleToDelete.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  const affectedRows = await saleModel.deleteSale(saleId);
  console.log(affectedRows);
  if (affectedRows > 0) return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteSale,
};
