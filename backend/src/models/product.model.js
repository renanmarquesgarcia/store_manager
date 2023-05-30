const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );

  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', 
    [productId],
  );

  return result;
};

const insert = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [...Object.values(productName)],
  );

  return insertId;
};

const update = async (productId, productName) => {
    await connection.execute(
      `UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?`,
      [productName, productId],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
