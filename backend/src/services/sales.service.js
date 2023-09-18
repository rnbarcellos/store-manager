const { salesModel } = require('../models');
const httpStatusCode = require('../utils/httpStatusCode');

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

const createNewSale = async (itensSold) => {
  const newSale = await salesModel.createNewSale(itensSold);
  return {
    status: httpStatusCode.CREATED,
    data: newSale,
  };
};

module.exports = {
  showAllSales,
  showSaleById,
  createNewSale,
};
