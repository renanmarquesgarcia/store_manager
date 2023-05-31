module.exports = (req, res, next) => {
  const saleData = req.body;
  const verifyProductId = saleData.every((sale) => sale.productId);

  if (!verifyProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  return next();
};
