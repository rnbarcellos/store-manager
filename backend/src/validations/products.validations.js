const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5)
    .required(),
}).messages({
  'string.empty': '"name" is required',
});

const validateProduct = (newProduct) => {
  const { error } = productSchema.validate(newProduct);
  return error ? error.message : null;
};

module.exports = {
  validateProduct,
};
