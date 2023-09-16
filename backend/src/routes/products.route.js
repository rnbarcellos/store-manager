const { Router } = require('express');
const { productsController } = require('../controllers');
const { validateNewProduct } = require('../middlewares/newProduct.middleware');

const productsRouter = Router();

productsRouter.get('/', productsController.showAllProducts);
productsRouter.get('/:id', productsController.showProductById);
productsRouter.post('/', validateNewProduct, productsController.addNewProduct);

module.exports = productsRouter;