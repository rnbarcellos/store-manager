const { Router } = require('express');
const { salesController } = require('../controllers');

const salesRouter = Router();

salesRouter.get('/', salesController.showAllSales);
salesRouter.get('/:id', salesController.showSaleById);
salesRouter.post('/', salesController.createNewSale);

module.exports = salesRouter;