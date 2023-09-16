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

module.exports = {
  showAllSales,
  showSaleById,
};
