const { Router } = require('express');
const { saleController } = require('../controllers');

const saleRouter = Router();

saleRouter.get(
  '/',
  saleController.findAll,
);

saleRouter.get(
  '/:id',
  saleController.findById,
);

module.exports = saleRouter;
