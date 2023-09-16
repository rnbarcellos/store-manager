const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  allProductsFromDB, productByIdFromDB, newProductAddedToDB,
} = require('../../mocks/products.mock');

const { expect } = chai;

describe('Testando o controller de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Será validado que é possível listar todos os produtos', async function () {
    sinon.stub(productsService, 'showAllProducts').resolves({
      status: 200,
      data: allProductsFromDB,
    });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.showAllProducts({}, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allProductsFromDB)).to.be.equal(true);
  });

  it('Será validado que é possível listar um produto pelo id', async function () {
    sinon.stub(productsService, 'showProductById').resolves({
      status: 200,
      data: productByIdFromDB,
    });

    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.showProductById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(productByIdFromDB)).to.be.equal(true);
  });

  it('Será validado que é possível listar um produto pelo id e retorna erro caso não exista', async function () {
    sinon.stub(productsService, 'showProductById').resolves({
      status: 404,
      data: {
        message: 'Product not found',
      },
    });

    const req = {
      params: {
        id: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.showProductById(req, res);

    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
  });

  it('Será validado que é possível adicionar um novo produto', async function () {
    sinon.stub(productsService, 'addNewProduct').resolves({
      status: 201,
      data: newProductAddedToDB,
    });

    const req = {
      body: {
        name: 'Asas do Falcão',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.addNewProduct(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(newProductAddedToDB)).to.be.equal(true);
  });
});
