import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - GetAll', () => { 

  it('Buscar todos os registros quando houver registros', async () => {
    const res1 = await testServer.post('/cidades').send({
      id: 1,
      name: 'Jaguariuna'
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    
    const resBuscada = await testServer.get('/cidades').send();

    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });

});