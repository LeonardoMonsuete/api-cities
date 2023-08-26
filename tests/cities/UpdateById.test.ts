import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cities - UpdateById', () => { 

  it('Valida parametro inválido', async () => {
    const res1 = await testServer.put('/cidades/0').send({
      name: 'Jaguariúna novo'
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errorsResult.params.id');
  });

  it('Valida que não deve-se atualizar cidade com nome curto (>2 caracteres)', async () => {
    const res1 = await testServer.put('/cidades/1').send({
      name: 'Ja'
    });
    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errorsResult.body.name');
  });

  it('Valida que encontrou e atualizou o registro', async () => {
    const res1 = await testServer.put('/cidades/1').send({
      name: 'Jaguariúna novo'
    });
    expect(res1.statusCode).toEqual(StatusCodes.ACCEPTED);
    expect(res1.body).toEqual(1);
  });

  it('Valida que não existe/encontrou e portanto não atualizou nenhum registro', async () => {
    const res1 = await testServer.put('/cidades/2').send({
      name: 'Jaguariúna novo'
    });
    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });


});