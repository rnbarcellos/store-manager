const { Router } = require('express');
const { productsController } = require('../controllers');
const { validateNewProduct } = require('../middlewares/products.middleware');

const productsRouter = Router();

productsRouter.get('/', productsController.showAllProducts);
productsRouter.get('/:id', productsController.showProductById);
productsRouter.post('/', validateNewProduct, productsController.addNewProduct);
productsRouter.put('/:id', validateNewProduct, productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

module.exports = productsRouter;