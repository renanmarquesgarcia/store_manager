const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');

const { saleList } = require('./mocks/sale.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidade do Controller de Sale', function () {
  describe('Lista as vendas', function () {
    it('Responde com status 200 e a lista de vendas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findAll')
        .resolves({ type: null, message: saleList });
      
      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleList);
    });
  });
});