const { productModel } = require('../models');
const schema = require('./validations/validationInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const product = await productModel.findById(productId);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const insert = async (productName) => {
  const error = schema.validateProductName(productName);
  if (error.type) return error;

  const newProductId = await productModel.insert({ productName });
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};
