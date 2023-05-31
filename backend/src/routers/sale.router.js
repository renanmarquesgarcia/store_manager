const { Router } = require('express');
const { saleController } = require('../controllers');
const validateProductIdField = require('../middlewares/validateProductIdField');
const validateQuantityField = require('../middlewares/validateQuantityField');

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
  validateQuantityField,
  saleController.insert,
);

module.exports = saleRouter;
