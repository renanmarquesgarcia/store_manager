const saleList = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const sale = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleRegisterWithQuantityLessThan1 = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleRegisterWithProductIdNotAvailable = [
  {
    productId: 999999,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const correctSaleRegistration = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleRegistered = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  saleList,
  sale,
  saleRegisterWithQuantityLessThan1,
  saleRegisterWithProductIdNotAvailable,
  correctSaleRegistration,
  saleRegistered,
};
