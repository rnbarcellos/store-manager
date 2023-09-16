const { productsModel } = require('../models');

const showAllProducts = async () => {
  const products = await productsModel.findAll();
  return {
    status: 200,
    data: products,
  };
};

const showProductById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) {
    return {
      status: 404,
      data: {
        message: 'Product not found',
      },
    };
  }

  return {
    status: 200,
    data: product,
  };
};

const addNewProduct = async (name) => {
  const product = await productsModel.addNewProduct(name);
  return {
    status: 201,
    data: product,
  };
};

module.exports = {
  showAllProducts,
  showProductById,
  addNewProduct,
};
