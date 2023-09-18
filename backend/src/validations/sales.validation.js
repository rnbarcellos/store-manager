const joi = require('joi');

const salesSchema = joi.array().items(
  joi.object().keys({
    productId: joi.number().integer().required(),
    quantity: joi.number().integer().min(1).required(),
  }),
).messages({
  'any.required': '"{#key}" is required',
  'number.min': '"{#key}" must be greater than or equal to {#limit}',
});

const validateSale = (newSale) => {
  const { error } = salesSchema.validate(newSale);
  return error ? error.message : null;
};

module.exports = {
  validateSale,
};
