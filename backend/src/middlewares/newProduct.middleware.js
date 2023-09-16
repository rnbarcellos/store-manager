const { validateProduct } = require('../validations/products.validations');

const handleValidation = (validation, res) => {
  let status = 400;
  if (validation.includes('length')) status = 422;
  return res.status(status).json({ message: validation });
};

const validateNewProduct = async (req, res, next) => {
  const validation = validateProduct(req.body);
  if (validation) return handleValidation(validation, res);
  next();
};

module.exports = {
  validateNewProduct,
};
