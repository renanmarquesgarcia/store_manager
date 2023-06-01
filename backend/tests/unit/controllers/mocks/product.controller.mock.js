const productList = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

const newProduct = { name: 'ProdutoX' };

const newRegisteredProduct = { id: 4, ...newProduct };

const updatedProduct = {
  id: 1,
  name: ',Martelo do Batman',
};

module.exports = {
  productList,
  newProduct,
  newRegisteredProduct,
  updatedProduct,
};
