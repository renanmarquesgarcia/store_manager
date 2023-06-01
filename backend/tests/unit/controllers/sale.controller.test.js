const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { saleService } = require('../../../src/services');
const { saleController } = require('../../../src/controllers');

const { 
  saleList,
  sale,
  saleRegisterWithQuantityLessThan1,
  saleRegisterWithProductIdNotAvailable,
  correctSaleRegistration,
  saleRegistered,
} = require('./mocks/sale.controller.mock');

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

  describe('Busca por uma venda', function () {
    it('Responde com o status 404 e uma mensagem de erro se o "id" não existir', async function () {
      const res = {};
      const req = {
        params: {
          id: 99999,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('Responde com o status 200 e as informações da venda se o "id" existir', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findById')
        .resolves({ type: null, message: sale });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sale);
    });
  });

  describe('Cadastra uma nova venda', function () {
    it('Retorna um erro ao cadastrar uma venda com a quantidade inferior a 1', async function () {
      const res = {};
      const req = {
        body: saleRegisterWithQuantityLessThan1,
       };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'insert')
        .resolves({ 
          type: 'INVALID_VALUE',
          message: '"quantity" must be greater than or equal to 1', 
      });

      await saleController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it('Retorna um erro ao cadastrar uma venda com o "productId" inexistente', async function () {
      const res = {};
      const req = {
        body: saleRegisterWithProductIdNotAvailable,
       };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'insert')
        .resolves({ 
          type: 'PRODUCT_NOT_FOUND',
          message: 'Product not found', 
        });

      await saleController.insert(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found', 
      });
    });

    it('Retorna o status 201 e a venda é cadastrada com sucesso', async function () {
      const res = {};
      const req = {
        body: correctSaleRegistration,
       };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'insert')
        .resolves({ type: null, message: saleRegistered });

      await saleController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(saleRegistered);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
