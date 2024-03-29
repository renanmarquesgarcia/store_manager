const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { 
  productList,
  newProduct,
  newRegisteredProduct,
  updatedProduct,
  notFound,
  messageNotFound,
} = require('./mocks/product.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidade do Controller de Product', function () {
  describe('Lista os produtos cadastrados', function () {
    it('Responde com o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'findAll')
        .resolves({ type: null, message: productList });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });
  });

  describe('Busca um produto', function () {
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
        .stub(productService, 'findById')
        .resolves(notFound);

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(messageNotFound);
    });

    it('Responde com o status 200 e o produto se o "id" existir', async function () {
      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'findById')
        .resolves({ type: null, message: productList[0] });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });
  });

  describe('Cadastra um novo produto', function () {
    it('Ao enviar um nome com menos de 5 caracteres deve retornar um erro!', async function () {
      const res = {};
      const req = {
        body: { 
          name: 'abcd',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'insert')
        .resolves({ 
          type: 'INVALID_VALUE',
          message: '"name" length must be at least 5 characters long', 
        });

      await productController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('Ao enviar dados válidos deve cadastrar o produto com sucesso!', async function () {
      const res = {};
      const req = {
        body: newProduct,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'insert')
        .resolves({ type: null, message: newRegisteredProduct });

      await productController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newRegisteredProduct);
    });
  });

  describe('Atualiza um produto', function () {
    it('Ao enviar um nome com menos de 5 caracteres deve retornar um erro!', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 'abcd' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'update')
        .resolves({ 
          type: 'INVALID_VALUE',
          message: '"name" length must be at least 5 characters long', 
        });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('Responde com o status 404 e uma mensagem de erro se o "id" não existir', async function () {
      const res = {};
      const req = {
        params: { id: 999999 },
        body: { name: 'Martelo do Batman' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'update')
        .resolves(notFound);

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(messageNotFound);
    });

    it('Altera o produto com sucesso', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: { name: 'Martelo do Batman' },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'update')
        .resolves({ type: null, message: updatedProduct });

      await productController.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProduct);
    });
  });

  describe('Deleta um produto', function () {
    it('Retorna um erro ao tentar deletar um produto com "id" inexistente', async function () {
      const res = {};
      const req = {
        params: { id: 999999 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'deleteProduct')
        .resolves(notFound);

      await productController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(messageNotFound);
    });

    it('Deleta um produto com sucesso', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.sendStatus = sinon.stub().returns(res);
      sinon 
        .stub(productService, 'deleteProduct')
        .resolves({ type: null, message: '' });

      await productController.deleteProduct(req, res);

      expect(res.sendStatus).to.have.been.calledWith(204);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
