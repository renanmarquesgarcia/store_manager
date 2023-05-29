const chai = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { productList } = require('./mocks/product.service.mock');

const { expect } = chai;

describe('Teste de unidade do Service de Product', function () {
  describe('Lista os produtos cadastrados', function () {
    it('Retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(productList);

      const result = await productService.findAll();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productList);
    });
  });

  describe('Busca por um produto', function () {
    it('Retorna um erro caso o "id" do produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById(999999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('Retorna o produto caso o "id" exista', async function () {
      sinon.stub(productModel, 'findById').resolves(productList[0]);

      const result = await productService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productList[0]);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
