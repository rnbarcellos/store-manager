const chai = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

const { expect } = chai;

describe('Testando o model de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Será validado que é possível listar todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      id: 1,
      name: 'Martelo de Thor',
    }, {
      id: 2,
      name: 'Traje de encolhimento',
    }, {
      id: 3,
      name: 'Escudo do Capitão América',
    }]]);

    const products = await productsModel.findAll();

    expect(products).to.be.an('array');
    expect(products[0]).to.be.an('object');
    expect(products[0]).to.have.all.keys('id', 'name');
  });

  it('Será validado que é possível listar um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[{
      id: 1,
      name: 'Martelo de Thor',
    }]]);

    const product = await productsModel.findById(1);

    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });

  it('Será validado que não é possível listar um produto com id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const product = await productsModel.findById(5);

    expect(product).to.be.an('undefined');
  });

  it('Será validado que é possível adicionar um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{
      insertId: 4,
    }]);

    const product = await productsModel.addNewProduct('Asas do Falcão');

    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });

  it('Será validado que é possível atualizar um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{
      affectedRows: 1,
    }]);

    const product = await productsModel.updateProduct(1, 'Martelo de Thor');

    expect(product).to.be.an('object');
    expect(product).to.have.all.keys('id', 'name');
  });

  it('Será validado que não é possível atualizar um produto com id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([{
      affectedRows: 0,
    }]);

    const product = await productsModel.updateProduct(5, 'Martelo de Thor');

    expect(product).to.be.an('null');
  });

  it('Será validado que é possível deletar um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{
      affectedRows: 1,
    }]);

    const product = await productsModel.deleteProduct(1);

    expect(product).to.be.equal(1);
  });
});
