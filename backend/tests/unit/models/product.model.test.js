const chai = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { 
  productList,
  newProduct,
  productToUpdate,
} = require('./mocks/product.model.mock');

const { expect } = chai;

describe('Testes de unidade do Model de Product', function () {
  describe('Lista os produtos', function () {  
    it('Lista os produtos cadastrados', async function () {
      sinon.stub(connection, 'execute').resolves([productList]);

      const result = await productModel.findAll();

      expect(result).to.deep.equal(productList);
    });

    it('Lista o produto a partir do seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[productList[0]]]);

      const result = await productModel.findById(1);

      expect(result).to.deep.equal(productList[0]);
    });
  });

  describe('Cadastra um produto', function () {
    it('Retorna o "id" do produto cadastrado', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productModel.insert(newProduct);

    expect(result).to.equal(4);
    }); 
  });

  describe('Atualiza um produto', function () {
    it('Sem retorno', async function () {
      sinon.stub(connection, 'execute').resolves();

      const result = await productModel.update(productToUpdate.id, productToUpdate.name);

      expect(result).to.equal(undefined);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
