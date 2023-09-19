const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');
const {
  allSalesFromDb, salesFromDb, itemsSold, invalidItemsSold,
} = require('../../mocks/sales.mocks');

describe('Testa o service de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa a função showAllSales de service de sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(allSalesFromDb);

    const response = await salesService.showAllSales();

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response.status).to.be.equals(200);
    expect(response.data).to.be.an('array');
    expect(response.data).to.have.lengthOf(3);
    expect(response.data[0]).to.be.an('object');
  });

  it('Testa a função showSaleById de serivce de sales', async function () {
    sinon.stub(salesModel, 'findById').resolves(salesFromDb);

    const response = await salesService.showSaleById(1);

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response.status).to.be.equals(200);
    expect(response.data).to.be.an('array');
    expect(response.data).to.have.lengthOf(2);
    expect(response.data[0]).to.be.an('object');
  });

  it('Testa a função showSaleById de serivce de sales quando não encontra a venda', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);

    const response = await salesService.showSaleById(1);

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response.status).to.be.equals(404);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('message');
    expect(response.data.message).to.be.equals('Sale not found');
  });

  it('Testa a função createNewSale de service de sales', async function () {
    sinon.stub(salesModel, 'createNewSale').resolves({
      id: 1,
      itemsSold,
    });
    sinon.stub(productsModel, 'findById').resolves({
      id: 1,
      name: 'Produto Teste',
    });

    const response = await salesService.createNewSale(itemsSold);

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response.status).to.be.equals(201);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('id');
    expect(response.data.id).to.be.equals(1);
    expect(response.data).to.have.property('itemsSold');
    expect(response.data.itemsSold).to.be.an('array');
    expect(response.data.itemsSold).to.have.lengthOf(2);
    expect(response.data.itemsSold[0]).to.be.an('object');
    expect(response.data.itemsSold[0]).to.have.property('productId');
    expect(response.data.itemsSold[0].productId).to.be.equals(1);
    expect(response.data.itemsSold[0]).to.have.property('quantity');
    expect(response.data.itemsSold[0].quantity).to.be.equals(5);
  });

  it('Testa a função createNewSale de service de sales quando não encontra o produto', async function () {
    const stub = sinon.stub(productsModel, 'findById');
    stub.onFirstCall().resolves(undefined);
    stub.onSecondCall().resolves(invalidItemsSold[1]);
    stub.onThirdCall().resolves(invalidItemsSold[2]);

    const response = await salesService.createNewSale(invalidItemsSold);

    expect(response).to.be.an('object');
    expect(response).to.have.property('status');
    expect(response).to.have.property('data');
    expect(response.status).to.be.equals(404);
    expect(response.data).to.be.an('object');
    expect(response.data).to.have.property('message');
    expect(response.data.message).to.be.equals('Product not found');
  });
});