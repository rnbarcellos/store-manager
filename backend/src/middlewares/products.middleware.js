const { validateProduct } = require('../validations/products.validations');
const { handleValidation } = require('../utils/handleValidation');

const validateNewProduct = (req, res, next) => {
  const validation = validateProduct(req.body);
  if (validation) return handleValidation(validation, 'length', res);
  next();
};

module.exports = {
  validateNewProduct,
};
