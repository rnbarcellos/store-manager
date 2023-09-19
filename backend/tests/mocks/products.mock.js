const allProductsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const productByIdFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};

const newProductAddedToDB = {
  id: 4,
  name: 'Asas do Falcão',
};

const productNotFound = {
  status: 404,
  data: {
    message: 'Product not found',
  },
};

module.exports = {
  allProductsFromDB,
  productByIdFromDB,
  newProductAddedToDB,
  productNotFound,
};
