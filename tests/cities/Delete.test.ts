import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - DeleteById', () => { 

  it('Valida parametro inválido', async () => {
    const res1 = await testServer.delete('/cidades/0').send();
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errorsResult.params.id');
  });

  it('Valida que encontrou e deletou registro', async () => {
    const res1 = await testServer.post('/cidades').send({
      name: 'Jaguariuna'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const resDeleted = await testServer.delete(`/cidades/${res1.body}`).send();

    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Valida que não existe/encontrou o registro', async () => {
    const res1 = await testServer.delete('/cidades/99999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');

  });


});