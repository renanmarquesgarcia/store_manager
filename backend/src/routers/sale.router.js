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

saleRouter.post(
  '/',
  saleController.insert,
);

module.exports = saleRouter;
