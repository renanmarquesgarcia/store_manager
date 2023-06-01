const chai = require('chai');
const sinon = require('sinon');

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');

const { 
  productList,
  invalidName,
  validName,
  newRegisteredProduct,
  invalidValue,
  validId,
  updatedProduct,
} = require('./mocks/product.service.mock');

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

  describe('Cadastra um novo produto', function () {
    it('Retorna um erro ao passar um nome inválido', async function () {
      const result = await productService.insert(invalidName);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long',
      );
    });

    it('Retorna o novo produto ao passar um nome válido', async function () {
      sinon.stub(productModel, 'insert').resolves(4);
      sinon.stub(productModel, 'findById').resolves(newRegisteredProduct);
      
      const result = await productService.insert(validName);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newRegisteredProduct);
    });
  });

  describe('Tenta atualizar um produto', function () {
    it('Retorna um erro ao passar um nome inválido', async function () {
      const result = await productService.update(validId, invalidValue);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal(
        '"name" length must be at least 5 characters long',
      );
    });

    it('Retorna um erro caso o "id" do produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      
      const result = await productService.update(invalidValue, validName);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('Retorna o produto atualizado', async function () {
      sinon.stub(productModel, 'findById')
        .onFirstCall().resolves(productList[0])
        .onSecondCall()
        .resolves(updatedProduct);

      sinon.stub(productModel, 'update').resolves();

      const result = await productService.update(validId, validName);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(updatedProduct);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
