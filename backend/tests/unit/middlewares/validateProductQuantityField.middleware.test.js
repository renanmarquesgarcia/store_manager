const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validateProductQuantityField = require(
  '../../../src/middlewares/validateProductQuantityField',
);

const { 
  salesRegisterWithouQuantity,
  correctSalesRegistration,
} = require('./mocks/validateProductQuantityField.middleware.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Verificando middleware validateProductQuantityField', function () {
  beforeEach(sinon.restore);

  describe('Tentando adicionar uma venda sem "quantity"', function () {
    it('é chamado o status com o código 400 e uma mensagem de erro', async function () {
      const res = {};
      const req = {
        body: salesRegisterWithouQuantity,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductQuantityField(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it('não deve chamar o próximo middleware', async function () {
      const res = {};
      const req = {
        body: salesRegisterWithouQuantity,
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductQuantityField(req, res, next);

      expect(next).to.have.not.been.calledWith();
    });
  });

  describe('Tentando adicionar um produto com a chave "quantity" na requisição', function () {
    it('Deve chamar o próximo middleware caso houver a chave "quantity"', async function () {
      const res = {};
      const req = {
        body: correctSalesRegistration,
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductQuantityField(req, res, next);

      expect(next).to.have.been.calledWith();
    });
  });   
});