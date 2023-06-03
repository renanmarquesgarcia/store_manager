const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

const { productList } = require('./mocks/product.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidade do Controller de Product', function () {
  describe('Busca um produto através do "nome"', function () {
    it(
      'Sem produtos correspondentes com o termo pesquisado retorna status 200 e um array vazio',
      async function () {
        const res = {};
        const req = { query: { q: 'Inexistente' } };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon 
          .stub(productService, 'search')
          .resolves({ type: null, message: [] });

        await productController.search(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith([]);
      },
    );

    it('Busca vazia retorna todos os produtos cadastrados', async function () {
      const res = {};
      const req = { query: { q: '' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'search')
        .resolves({ type: null, message: productList });

      await productController.search(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });

    it('Busca pelo "nome" retorna os produtos cadastrados com aquele nome', async function () {
      const res = {};
      const req = { query: { q: 'Martelo' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon 
        .stub(productService, 'search')
        .resolves({ type: null, message: [productList[0]] });

      await productController.search(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([productList[0]]);
    });

    afterEach(function () {
      sinon.restore();
    });
  });
});