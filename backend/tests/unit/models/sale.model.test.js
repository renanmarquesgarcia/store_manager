const chai = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const { saleModel } = require('../../../src/models');

const { saleList, sale, productToRegister } = require('./mocks/sale.model.mock'); // productToRegister

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

  it('Cadastra um novo id de venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

    const result = await saleModel.insertIntoSalesTable();

    expect(result).to.equal(3);
  });

  it('Cadastra uma venda', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await saleModel.insert(3, productToRegister);

    expect(result).to.deep.equal(productToRegister);
  });

  it('Deleta uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await saleModel.deleteSale(1);

    expect(result).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});
