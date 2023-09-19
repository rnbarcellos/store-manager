const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  allProductsFromDB, productByIdFromDB, newProductAddedToDB, productNotFound,
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
    sinon.stub(productsService, 'showProductById').resolves(productNotFound);

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
    expect(res.json.calledWith(productNotFound.data)).to.be.equal(true);
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

  it('Será validado que é possível atualizar um produto', async function () {
    sinon.stub(productsService, 'updateProduct').resolves({
      status: 200,
      data: newProductAddedToDB,
    });

    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Asas do Falcão',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(newProductAddedToDB)).to.be.equal(true);
  });

  it('Será validado que é possível atualizar um produto e retorna erro caso não exista', async function () {
    sinon.stub(productsService, 'updateProduct').resolves(productNotFound);

    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Asas do Falcão',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith(productNotFound.data)).to.be.equal(true);
  });

  it('Será validado que é possível deletar um produto', async function () {
    sinon.stub(productsService, 'deleteProduct').resolves({
      status: 204,
      data: {},
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

    await productsController.deleteProduct(req, res);

    expect(res.status.calledWith(204)).to.be.equal(true);
    expect(res.json.calledWith({})).to.be.equal(true);
  });
});
