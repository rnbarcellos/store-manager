const { expect } = require('chai');
const sinon = require('sinon');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { allSalesFromDb, salesFromDb, salesCreated, itemsSold } = require('../../mocks/sales.mocks');

describe('Testa o controller de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Será validado que é possível listar todas as vendas', async function () {
    sinon.stub(salesService, 'showAllSales').resolves({
      status: 200,
      data: allSalesFromDb,
    });

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const req = {};

    await salesController.showAllSales(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(allSalesFromDb)).to.be.equal(true);
  });

  it('Será validado que é possível listar uma venda pelo id', async function () {
    sinon.stub(salesService, 'showSaleById').resolves({
      status: 200,
      data: salesFromDb,
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

    await salesController.showSaleById(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(salesFromDb)).to.be.equal(true);
  });

  it('Será validado que é possível listar uma venda pelo id e retorna erro quando a venda não existe', async function () {
    sinon.stub(salesService, 'showSaleById').resolves({
      status: 404,
      data: {
        message: 'Sale not found',
      },
    });

    const req = {
      params: {
        id: 4,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.showSaleById(req, res);

    expect(res.status.calledWith(404)).to.be.equal(true);
    expect(res.json.calledWith({
      message: 'Sale not found',
    })).to.be.equal(true);
  });

  it('Será validado que é possível criar uma venda', async function () {
    sinon.stub(salesService, 'createNewSale').resolves({
      status: 201,
      data: salesCreated,
    });

    const req = {
      body: itemsSold,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createNewSale(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(salesCreated)).to.be.equal(true);
  });
});
