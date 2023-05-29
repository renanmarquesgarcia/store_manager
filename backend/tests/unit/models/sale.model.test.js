const chai = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const { saleList, sale } = require('./mocks/sale.model.mock');

const { expect } = chai;

describe('Testes de unidade do Model de Sale', function () {
  it('Lista os produtos cadastrados', async function () {
    sinon.stub(connection, 'execute').resolves([saleList]);

    const result = await saleModel.findAll();

    expect(result).to.deep.equal(saleList);
  });

  it('Lista uma venda partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([sale]);

    const result = await saleModel.findById(1);

    expect(result).to.deep.equal(sale);
  });

  afterEach(function () {
    sinon.restore();
  });
});
