module.exports = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === 0) return next();

  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });

  return next();
};
