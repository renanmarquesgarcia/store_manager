const chai = require('chai');
const sinon = require('sinon');

const { saleModel } = require('../../../src/models');
const { saleService } = require('../../../src/services');

const { saleList } = require('./mocks/sale.service.mock');

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
});