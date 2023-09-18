const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = require('./httpStatusCode');

const handleValidation = (validation, message, res) => {
  let statusCode = BAD_REQUEST;
  if (validation.includes(message)) statusCode = UNPROCESSABLE_ENTITY;
  return res.status(statusCode).json({ message: validation });
};

module.exports = {
  handleValidation,
};
