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

const createNewSale = async (req, res) => {
  const { body } = req;
  const newSale = await salesService.createNewSale(body);
  res.status(newSale.status).json(newSale.data);
};

module.exports = {
  showAllSales,
  showSaleById,
  createNewSale,
};
