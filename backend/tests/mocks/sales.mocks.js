const SALE_DATE = '2023-09-15T16:15:29.000Z';

const allSalesFromDb = [
  {
    saleId: 1,
    date: SALE_DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: SALE_DATE,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: SALE_DATE,
    productId: 3,
    quantity: 15,
  },
];

const salesFromDb = [
  {
    saleId: 1,
    date: SALE_DATE,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: SALE_DATE,
    productId: 2,
    quantity: 10,
  },
];

const salesCreated = {
  id: 4,
  itemsSold: [
    {
      productId: 1,
      quantity: 5,
    },
    {
      productId: 2,
      quantity: 10,
    },
  ],
};

const itemsSold = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
];

const invalidItemsSold = [
  {
    productId: 1,
    quantity: 5,
  },
  {
    productId: 2,
    quantity: 10,
  },
  {
    productId: 3,
    quantity: 15,
  },
];

module.exports = {
  allSalesFromDb,
  salesFromDb,
  salesCreated,
  itemsSold,
  invalidItemsSold,
};
