import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - GetById', () => { 

  it('Buscar registro pelo ID existente', async () => {
    const res1 = await testServer.post('/cidades').send({
      nome: 'Jaguariuna'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    const resBuscada = await testServer.get(`/cidades/${res1.body}`).send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nome');
  });

  it('Buscar registro pelo ID inexistente', async () => {
    const resBuscada = await testServer.get('/cidades/99999').send();

    expect(resBuscada.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resBuscada.body).toHaveProperty('errors.default');
  });

});