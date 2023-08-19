import { PrismaClient } from '@prisma/client';
import { ICity } from '../../interfaces/CityInterface';

const prisma = new PrismaClient();

export const create = async (cityInput: ICity): Promise<number | Error> => {
  try {
    const cityCreation = await prisma.city.create({
      data: {
        nome: cityInput.nome
      }
    });
    return cityCreation.id;
  } catch (error) {
    console.log(error);
    return Error('Erro ao cadastrar nova cidade');
  }
};

