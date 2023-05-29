const chai = require('chai');
const sinon = require('sinon');

const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');

const { saleList, sale } = require('./mocks/sale.service.mock');

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

  afterEach(function () {
    sinon.restore();
  });
});