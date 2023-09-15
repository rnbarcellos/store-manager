const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { allSalesFromDb, salesFromDb } = require('../../mocks/sales.mocks');

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
});