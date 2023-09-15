const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT * FROM sales
    ORDER BY sale_id ASC, product_id ASC`,
  );
  return sales;
};

const findById = async (id) => {
  const [[sale]] = await connection.execute(
    'SELECT * FROM sales WHERE sale_id = ?',
    [id],
  );
  return sale;
};

module.exports = {
  findAll,
  findById,
};
