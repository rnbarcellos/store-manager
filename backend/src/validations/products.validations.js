const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5)
    .required(),
}).messages({
  'string.empty': '"name" is required',
});

const validateProduct = (newProduct) => {
  const { error } = productSchema.validate(newProduct);
  if (error) {
    return error.message;
  }
  return false;
};

module.exports = {
  validateProduct,
};
