const { validateProduct } = require('../validations/products.validations');
const { UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('../utils/httpStatusCode');

const handleValidation = (validation, res) => {
  let statusCode = BAD_REQUEST;
  if (validation.includes('length')) statusCode = UNPROCESSABLE_ENTITY;
  return res.status(statusCode).json({ message: validation });
};

const validateNewProduct = (req, res, next) => {
  const validation = validateProduct(req.body);
  if (validation) return handleValidation(validation, res);
  next();
};

module.exports = {
  validateNewProduct,
};
