const { expect } = require('chai');
const sinon = require('sinon');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { allSalesFromDb, salesFromDb } = require('../../mocks/sales.mocks');

describe('Testa o controller de sales', function () {
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
});
