module.exports = (req, res, next) => {
  const saleData = req.body;
  const verifyQuantity = saleData
    .every((sale) => 'quantity' in sale);

  if (!verifyQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  return next();
};