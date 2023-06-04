const { Router } = require('express');
const { saleController } = require('../controllers');
const validateProductIdField = require('../middlewares/validateProductIdField');
const validateProductQuantityField = require('../middlewares/validateProductQuantityField');
const validateProductQuantityUpdate = require('../middlewares/validateProductQuantityUpdate');

const saleRouter = Router();

saleRouter.get(
  '/',
  saleController.findAll,
);

saleRouter.get(
  '/:id',
  saleController.findById,
);

saleRouter.post(
  '/',
  validateProductIdField,
  validateProductQuantityField,
  saleController.insert,
);

saleRouter.delete(
  '/:id',
  saleController.deleteSale,
);

saleRouter.put(
  '/:saleId/products/:productId/quantity',
  validateProductQuantityUpdate,
  saleController.updateProductQuantity,
);

module.exports = saleRouter;
