const { Router } = require('express');
const { productController } = require('../controllers');
const validateProductNameField = require('../middlewares/validateProductNameField');

const productRouter = Router();

productRouter.get(
  '/',
  productController.findAll,
);

productRouter.get(
  '/:id',
  productController.findById,
);

productRouter.post(
  '/',
  validateProductNameField,
  productController.insert,
);

productRouter.put(
  '/:id',
  validateProductNameField,
  productController.update,
);

productRouter.delete(
  '/:id',
  productController.deleteProduct,
);

module.exports = productRouter;