const { productsService } = require('../services');

const showAllProducts = async (req, res) => {
  const products = await productsService.showAllProducts();
  return res.status(products.status).json(products.data);
};

const showProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.showProductById(id);
  return res.status(product.status).json(product.data);
};

module.exports = {
  showAllProducts,
  showProductById,
};
