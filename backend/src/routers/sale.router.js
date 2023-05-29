const { Router } = require('express');
const { saleController } = require('../controllers');

const saleRouter = Router();

saleRouter.get('/', saleController.findAll);

module.exports = saleRouter;
