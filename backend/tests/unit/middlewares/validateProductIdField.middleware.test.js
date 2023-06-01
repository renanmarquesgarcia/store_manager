const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validateProductIdField = require('../../../src/middlewares/validateProductIdField');

const { 
  salesRegisterWithouProductId,
  correctSalesRegistration,
} = require('./mocks/validateProductIdField.middleware.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Verificando middleware validateProductIdField', function () {
  beforeEach(sinon.restore);

  describe('Tentando adicionar uma venda sem productId', function () {
    it('é chamado o status com o código 400 e uma mensagem de erro', async function () {
      const res = {};
      const req = {
        body: salesRegisterWithouProductId,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductIdField(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('não deve chamar o próximo middleware', async function () {
      const res = {};
      const req = {
        body: salesRegisterWithouProductId,
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductIdField(req, res, next);

      expect(next).to.have.not.been.calledWith();
    });
  });

  describe('Tentando adicionar um produto com a chave "productId" na requisição', function () {
    it('Deve chamar o próximo middleware caso houver a chave "name"', async function () {
      const res = {};
      const req = {
        body: correctSalesRegistration,
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductIdField(req, res, next);

      expect(next).to.have.been.calledWith();
    });
  });   
});