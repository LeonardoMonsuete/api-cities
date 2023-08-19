import { PrismaClient } from '@prisma/client';
import { ICity } from '../../interfaces/CityInterface';

const prisma = new PrismaClient();

export const getById = async (idParam: number): Promise<ICity | Error > => {
  try {
    const citySearch = await prisma.city.findUnique({ where: { id: idParam } });
    if(!citySearch){
      return new Error(`Cidade de id:${idParam} não encontrada`);
    }

    return citySearch;
  } catch (error) {
    console.error(error);
    return Error('Erro ao buscar cidade');
  }
};