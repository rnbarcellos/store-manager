const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
    `SELECT SP.sale_id,
    SA.date,
    SP.product_id,
    SP.quantity
    FROM sales_products AS SP
    INNER JOIN sales AS SA ON SP.sale_id = SA.id
    ORDER BY SP.sale_id, SP.product_id;`,
  );
  return camelize(sales);
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT SA.date,
    SP.product_id,
    SP.quantity
    FROM sales_products AS SP
    INNER JOIN sales AS SA ON SP.sale_id = SA.id
    WHERE SP.sale_id = ?;`,
    [id],
  );
  return camelize(sale);
};

const create = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (?)',
    [new Date().toISOString().split('T')[0]],
  );
  return insertId;
};

const createNewSale = async (itemsSold) => {
  const insertId = await create();

  const insertPromise = [];
  itemsSold.forEach(({ productId, quantity }) => {
    insertPromise.push(
      connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [insertId, productId, quantity],
      ),
    );
  });

  const promises = await Promise.all(insertPromise);

  return {
    id: insertId,
    itemsSold,
    promises,
  };
};

module.exports = {
  findAll,
  findById,
  createNewSale,
};
