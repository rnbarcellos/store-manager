const { salesService } = require('../services');

const showAllSales = async (_req, res) => {
  const sales = await salesService.showAllSales();
  res.status(sales.status).json(sales.data);
};

const showSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.showSaleById(id);
  res.status(sale.status).json(sale.data);
};

module.exports = {
  showAllSales,
  showSaleById,
};
