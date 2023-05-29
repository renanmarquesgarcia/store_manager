const { Router } = require('express');
const { productController } = require('../controllers');

const productRouter = Router();

productRouter.get(
  '/',
  productController.findAll,
);

module.exports = productRouter;