const { validateProduct } = require('../validations/products.validations');

const validateNewProduct = async (req, res, next) => {
  const validation = validateProduct(req.body);
  if (validation === '"name" is required') {
    return res.status(400).json({ message: validation });
  }
  if (validation === '"name" length must be at least 5 characters long') {
    return res.status(422).json({ message: validation });
  }
  next();
};

module.exports = {
  validateNewProduct,
};
