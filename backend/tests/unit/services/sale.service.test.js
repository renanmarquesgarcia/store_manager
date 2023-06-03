const chai = require('chai');
const sinon = require('sinon');

const { saleModel, productModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');

const { 
  saleList,
  sale,
  saleRegisterWithQuantityLessThan1,
  saleRegisterWithProductIdNotAvailable,
  correctSaleRegistration,
  saleRegistered,
} = require('./mocks/sale.service.mock');

const { productList } = require('./mocks/product.service.mock');

const { expect } = chai;

describe('Teste de unidade do Service de Sales', function () {
  describe('Lista as vendas realizadas', function () {
    it('Retorna a lista de vendas', async function () {
      sinon.stub(saleModel, 'findAll').resolves(saleList);

      const result = await saleService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleList);
    });
  });

  describe('Busca por uma venda', function () {
    it('Retorna um erro caso o "id" da venda não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.findById(999999);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('Retorna a venda caso o "id" exista', async function () {
      sinon.stub(saleModel, 'findById').resolves(sale);

      const result = await saleService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal(sale);
    });
  });

  describe('Cadastra uma venda', function () {
    it('Retorna um erro ao cadastrar uma venda com a quantidade inferior a 1', async function () {
      const result = await saleService.insert(saleRegisterWithQuantityLessThan1);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });

    it('Retorna um erro ao cadastrar uma venda com o "productId" inexistente', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);
      
      const result = await saleService.insert(saleRegisterWithProductIdNotAvailable);      

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('Retorna a venda cadastrada com sucesso', async function () {
      sinon.stub(productModel, 'findById')
        .onFirstCall().resolves(productList[0])
        .onSecondCall()
        .resolves(productList[1]);
      sinon.stub(saleModel, 'insertIntoSalesTable').resolves(3);
      sinon.stub(saleModel, 'insert')
        .onFirstCall().resolves(correctSaleRegistration[0])
        .onSecondCall()
        .resolves(correctSaleRegistration[1]);

      const result = await saleService.insert(correctSaleRegistration);      

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(saleRegistered);
    });
  });

  describe('Deleta uma venda', function () {
    it('Retorna um erro caso o "id" do produto não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.deleteSale(999999);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('Deleta uma venda com sucesso', async function () {
      sinon.stub(saleModel, 'findById').resolves(sale);
      sinon.stub(saleModel, 'deleteSale').resolves(1);

      const result = await saleService.deleteSale(2);

      expect(result.type).to.equal(null);
      expect(result.message).to.equal('');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});