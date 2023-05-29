const chai = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

const { productList } = require('./mocks/product.model.mock');

const { expect } = chai;

describe('Testes de unidade do Model de Product', function () {
  it('Lista os produtos cadastrados', async function () {
    sinon.stub(connection, 'execute').resolves([productList]);

    const result = await productModel.findAll();

    expect(result).to.deep.equal(productList);
  });

  it('Lista o produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[productList[0]]]);

    const result = await productModel.findById(1);

    expect(result).to.deep.equal(productList[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
});
