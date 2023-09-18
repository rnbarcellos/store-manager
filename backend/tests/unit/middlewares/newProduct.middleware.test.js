const { expect } = require('chai');
const sinon = require('sinon');
const { validateNewProduct } = require('../../../src/middlewares/newProduct.middleware');

describe('Testa o middleware validateNewProduct', function () {
  it('next() é chamado quando não há erros de validação', function () {
    const req = { body: { name: 'Produto de teste' } };
    const res = {};
    const next = sinon.spy();

    validateNewProduct(req, res, next);

    expect(next.called).to.be.equal(true);
  });

  it('next() não é chamado quando há erros de validação', function () {
    const req = { body: { name: '' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.spy();

    validateNewProduct(req, res, next);

    expect(next.called).to.be.equal(false);
  });

  it('é chamado o status 422 e o json com a mensagem de erro quando name é uma string vazia', function () {
    const req = { body: { name: '' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.spy();

    validateNewProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });

  it('é chamado o status 400 e o json com a mensagem de erro quando name é menos que 5 char', function () {
    const req = { body: { name: 'Asa' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.spy();

    validateNewProduct(req, res, next);

    expect(res.status.calledWith(400)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
  });

  it('é chamado o status 400 e o json com a mensagem de erro quando body é vazio', function () {
    const req = { body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.spy();

    validateNewProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
  });
});
