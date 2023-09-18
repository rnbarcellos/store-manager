const { expect } = require('chai');
const sinon = require('sinon');
const { validateNewSale } = require('../../../src/middlewares/sales.middleware');
const { itemsSold } = require('../../mocks/sales.mocks');

describe('Testa o middleware validateNewSale', function () {
  it('next() é chamado quando não há erros de validação', function () {
    const req = { body: itemsSold };
    const res = {};
    const next = sinon.spy();

    validateNewSale(req, res, next);

    expect(next.called).to.be.equal(true);
  });

  it('next() não é chamado quando há erros de validação', function () {
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.spy();

    validateNewSale(req, res, next);

    expect(next.called).to.be.equal(false);
  });
});
