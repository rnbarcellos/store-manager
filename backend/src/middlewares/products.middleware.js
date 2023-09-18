const { validateProduct } = require('../validations/products.validations');
const { UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('../utils/httpStatusCode');

const handleValidation = (validation, res) => {
  let statusCode = UNPROCESSABLE_ENTITY;
  if (validation.includes('length')) statusCode = BAD_REQUEST;
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
