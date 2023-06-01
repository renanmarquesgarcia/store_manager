module.exports = (req, res, next) => {
  const saleData = req.body;
  const verifyProductId = saleData.every((sale) => 'productId' in sale);

  if (!verifyProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  return next();
};
