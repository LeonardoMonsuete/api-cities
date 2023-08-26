import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - Create', () => { 

  it('Valida se criou novo registro', async () => {
    const res1 = await testServer.post('/cidades').send({
      name: 'Jaguariuna'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('Valida que não deve-se criar cidade com nome curto (>2 caracteres)', async () => {
    const res1 = await testServer.post('/cidades').send({
      name: 'Ja'
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errorsResult.body.name');

  });


});