const { salesModel } = require('../models');

const showAllSales = async () => {
  const sales = await salesModel.findAll();
  return {
    status: 200,
    data: sales,
  };
};

const showSaleById = async (id) => {
  const sale = await salesModel.findById(id);
  if (sale.length === 0) {
    return {
      status: 404,
      data: {
        message: 'Sale not found',
      },
    };
  }

  return {
    status: 200,
    data: sale,
  };
};

module.exports = {
  showAllSales,
  showSaleById,
};
