const { salesModel } = require('../models');
const httpStatusCode = require('../utils/httpStatusCode');
const { productsModel } = require('../models');

const showAllSales = async () => {
  const sales = await salesModel.findAll();
  return {
    status: httpStatusCode.OK,
    data: sales,
  };
};

const showSaleById = async (id) => {
  const sale = await salesModel.findById(id);
  if (sale.length === 0) {
    return {
      status: httpStatusCode.NOT_FOUND,
      data: {
        message: 'Sale not found',
      },
    };
  }

  return {
    status: httpStatusCode.OK,
    data: sale,
  };
};

const createNewSale = async (itemsRequested) => {
  const checkProducts = await Promise.all(itemsRequested.map(async (item) => {
    const product = await productsModel.findById(item.productId);
    return product;
  }));

  if (checkProducts.some((product) => product === undefined)) {
    return {
      status: httpStatusCode.NOT_FOUND,
      data: {
        message: 'Product not found',
      },
    };
  }
  
  const { id, itemsSold } = await salesModel.createNewSale(itemsRequested);

  return {
    status: httpStatusCode.CREATED,
    data: { id, itemsSold },
  };
};

module.exports = {
  showAllSales,
  showSaleById,
  createNewSale,
};
