import { PrismaClient } from '@prisma/client';
import { ICity } from '../../interfaces/CityInterface';

const prisma = new PrismaClient();

export const updateById = async (idParam: number, newData: ICity): Promise<ICity | Error > => {
  try {
    const citySearch = await prisma.city.findUnique({ where: { id: idParam } });
    if(!citySearch){
      return new Error(`Cidade de id:${idParam} não encontrada`);
    }
    const updatedCity = await prisma.city.update({
      where: {
        id: citySearch.id
      }, 
      data: {
        name: newData.name,
        stateId: newData.stateId
      }
    });

    return updatedCity;
  } catch (error) {
    console.error(error);
    return Error('Erro ao atualizar cidade');
  }
};