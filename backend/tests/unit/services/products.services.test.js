const chai = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { newProductAddedToDB } = require('../../mocks/products.mock');

const { expect } = chai;

describe('Testando o service de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

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

  it('Será validado que é possível listar um produto pelo id e retorna erro caso não exista', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const product = await productsService.showProductById(1);

    expect(product).to.be.an('object');
    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.status).to.be.equals(404);
    expect(product.data).to.be.an('object');
    expect(product.data).to.have.property('message');
    expect(product.data.message).to.be.equals('Product not found');
  });

  it('Será validado que é possível adicionar um novo produto', async function () {
    sinon.stub(productsModel, 'addNewProduct').resolves(newProductAddedToDB);

    const product = await productsService.addNewProduct('Asas do Falcão');

    expect(product).to.be.an('object');
    expect(product).to.have.property('status');
    expect(product).to.have.property('data');
    expect(product.status).to.be.equals(201);
    expect(product.data).to.be.an('object');
    expect(product.data).to.have.property('id');
    expect(product.data).to.have.property('name');
  });
});
