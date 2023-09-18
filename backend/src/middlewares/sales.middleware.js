const { validateSale } = require('../validations/sales.validation');
const { handleValidation } = require('../utils/handleValidation');

const validateNewSale = (req, res, next) => {
  const validation = validateSale(req.body);
  if (validation) return handleValidation(validation, 'greater', res);
  next();
};

module.exports = {
  validateNewSale,
};
