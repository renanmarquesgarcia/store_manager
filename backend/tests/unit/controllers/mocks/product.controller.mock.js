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

module.exports = {
  productList,
  newProduct,
  newRegisteredProduct,
};
