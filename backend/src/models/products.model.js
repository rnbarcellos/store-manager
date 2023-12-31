const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    `SELECT * FROM products
    ORDER BY id ASC`,
  );
  return products;
};

const findById = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return product;
};

const addNewProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return {
    id: insertId,
    name,
    };
};

const updateProduct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );
  return affectedRows === 0 ? null : { id, name };
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );

  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
