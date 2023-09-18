const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const { allSalesFromDb, salesFromDb, itemsSold } = require('../../mocks/sales.mocks');
const connection = require('../../../src/models/connection');

describe('Testa o model de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa se findAll retorna um array', async function () {  
    sinon.stub(connection, 'execute').resolves([allSalesFromDb]);
    
    const response = await salesModel.findAll();

    expect(response).to.be.an('array');
    expect(response).to.have.lengthOf(3);
    expect(response[0]).to.be.an('object');
  });

  it('Testa se findById retorna um array', async function () {
    sinon.stub(connection, 'execute').resolves([salesFromDb]);

    const response = await salesModel.findById(1);

    expect(response).to.be.an('array');
    expect(response).to.have.lengthOf(2);
    expect(response[0]).to.be.an('object');
  });

  it('Testa se createNewSale retorna um objeto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const response = await salesModel.createNewSale(itemsSold);

    expect(response).to.be.an('object');
    expect(response).to.have.property('id');
    expect(response).to.have.property('itemsSold');
    expect(response.itemsSold).to.be.an('array');
    expect(response.itemsSold).to.have.lengthOf(2);
    expect(response.itemsSold[0]).to.be.an('object');
    expect(response.itemsSold[1]).to.be.an('object');
  });
});
