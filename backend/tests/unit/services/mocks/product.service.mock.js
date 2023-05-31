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

const newRegisteredProduct = { id: 4, name: 'ProdutoX' };

const validName = 'ProdutoX';
const invalidName = 'abcd';
const invalidValue = 'a';
const validId = 1;

module.exports = {
  productList,
  newRegisteredProduct,
  validName,
  invalidName,
  invalidValue,
  validId,
};
