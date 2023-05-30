const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const validateProductNameField = require('../../../src/middlewares/validateProductNameField');

const { expect } = chai;
chai.use(sinonChai);

describe('Verificando middleware validateProductNameField', function () {
  beforeEach(sinon.restore);

  describe('Tentando adicionar um produto sem nome', function () {
    it('é chamado o status com o código 400 e uma mensagem de erro', async function () {
      const res = {};
      const req = {
        body: {},
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductNameField(req, res);

      expect(res.status).to.have.been.calledOnceWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('não deve chamar o próximo middleware', async function () {
      const res = {};
      const req = {
        body: {},
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductNameField(req, res, next);

      expect(next).to.have.not.been.calledWith();
    });
  });

  describe('Tentando adicionar um produto com a chave "name" na requisição', function () {
    it('Deve chamar o próximo middleware caso houver a chave "name"', async function () {
      const res = {};
      const req = {
        body: {
          name: 'ProdutoX',
        },
      };
      const next = sinon.stub().returns();

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await validateProductNameField(req, res, next);

      expect(next).to.have.been.calledWith();
    });
  });   
});