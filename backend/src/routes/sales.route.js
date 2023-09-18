const { Router } = require('express');
const { salesController } = require('../controllers');
const { validateNewSale } = require('../middlewares/sales.middleware');

const salesRouter = Router();

salesRouter.get('/', salesController.showAllSales);
salesRouter.get('/:id', salesController.showSaleById);
salesRouter.post('/', validateNewSale, salesController.createNewSale);

module.exports = salesRouter;