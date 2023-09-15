// TODO: desenvolver os testes unitários para o serviço de produtos
const chai = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');

const { expect } = chai;

describe('Testando o service de produtos', function () {
  it('Será validado que é possível listar todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves({
      id: 1,
      name: 'Martelo de Thor',
    });

    const product = await productsService.showAllProducts();
    
    expect(product).to.be.an('object');
    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.status).to.be.equals(200);
    expect(product.data).to.be.an('object');
    expect(product.data).to.have.property('id');
    expect(product.data).to.have.property('name');
  });

  it('Será validado que é possível listar um produto pelo id', async function () {
    sinon.stub(productsModel, 'findById').resolves({
      id: 1,
      name: 'Martelo de Thor',
    });

    const product = await productsService.showProductById(1);

    expect(product).to.be.an('object');
    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.status).to.be.equals(200);
    expect(product.data).to.be.an('object');
    expect(product.data).to.have.property('id');
    expect(product.data).to.have.property('name');
  });
});