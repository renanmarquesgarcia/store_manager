const chai = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { productList } = require('./mocks/product.service.mock');

const { expect } = chai;

describe('Teste de unidade do Service de Products', function () {
  describe('Lista os produtos cadastrados', function () {
    it('Retorna a lista completa de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(productList);

      const result = await productService.findAll();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(productList);
    });
  });
});
