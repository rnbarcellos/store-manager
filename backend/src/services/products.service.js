const { productsModel } = require('../models');
const httpStatusCode = require('../utils/httpStatusCode');

const productNotFound = {
  status: httpStatusCode.NOT_FOUND,
  data: {
    message: 'Product not found',
  },
};

const showAllProducts = async () => {
  const products = await productsModel.findAll();
  return {
    status: httpStatusCode.OK,
    data: products,
  };
};

const showProductById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return productNotFound;

  return {
    status: httpStatusCode.OK,
    data: product,
  };
};

const addNewProduct = async (name) => {
  const product = await productsModel.addNewProduct(name);
  return {
    status: httpStatusCode.CREATED,
    data: product,
  };
};

const updateProduct = async (id, name) => {
  const productExists = await productsModel.findById(id);
  if (!productExists) return productNotFound;

  const product = await productsModel.updateProduct(id, name);

  return {
    status: httpStatusCode.OK,
    data: product,
  };
};

const deleteProduct = async (id) => {
  const productExists = await productsModel.findById(id);
  if (!productExists) return productNotFound;

  await productsModel.deleteProduct(id);

  return {
    status: httpStatusCode.NO_CONTENT,
    data: {},
  };
};

module.exports = {
  showAllProducts,
  showProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
