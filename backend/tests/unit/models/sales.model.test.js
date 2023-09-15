const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel } = require('../../../src/models');
const { allSalesFromDb, salesFromDb } = require('../../mocks/sales.mocks');
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
});
