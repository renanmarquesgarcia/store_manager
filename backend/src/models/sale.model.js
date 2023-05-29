// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sp.sale_id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity 
    FROM 
      StoreManager.sales_products AS sp 
    INNER 
      JOIN StoreManager.sales AS s ON sp.sale_id = s.id;`,
  );

  return result;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT 
      s.date,
      sp.product_id AS productId,
      sp.quantity 
    FROM 
      StoreManager.sales_products AS sp
    INNER JOIN 
      StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE 
      sp.sale_id = ?;`,
    [saleId],
  );

  return result;
};

module.exports = {
  findAll,
  findById,
};
