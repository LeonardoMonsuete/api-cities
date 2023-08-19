import { PrismaClient } from '@prisma/client';
import { ICity } from '../../interfaces/CityInterface';

const prisma = new PrismaClient();

export const getAll = async (): Promise<ICity[] | Error > => {
  try {
    const cities = await prisma.city.findMany();
    return cities;
  } catch (error) {
    console.error(error);
    return Error('Erro ao buscar cidades');
  }
};