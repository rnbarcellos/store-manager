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

const addNewProduct = async (req, res) => {
  const { name } = req.body;
  const product = await productsService.addNewProduct(name);
  return res.status(product.status).json(product.data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const product = await productsService.updateProduct(Number(id), name);
  return res.status(product.status).json(product.data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);
  return res.status(product.status).json(product.data);
};

module.exports = {
  showAllProducts,
  showProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
