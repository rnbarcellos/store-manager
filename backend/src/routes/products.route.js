const { Router } = require('express');
const { productsController } = require('../controllers');

const productsRouter = Router();

productsRouter.get('/', productsController.showAllProducts);
productsRouter.get('/:id', productsController.showProductById);

module.exports = productsRouter;