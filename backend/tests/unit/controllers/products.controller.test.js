const sinon = require('sinon');
const chai = require('chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProductsFromDB, productByIdFromDB } = require('../../mocks/products.mock');

const { expect } = chai;

describe('Testando o controller de produtos', function () {
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
});
