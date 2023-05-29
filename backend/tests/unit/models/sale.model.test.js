const chai = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const { saleList } = require('./mocks/sale.model.mock');

const { expect } = chai;

describe('Testes de unidade do Model de Sale', function () {
  it('Lista os produtos cadastrados', async function () {
    sinon.stub(connection, 'execute').resolves([saleList]);

    const result = await saleModel.findAll();

    expect(result).to.deep.equal(saleList);
  });
});
