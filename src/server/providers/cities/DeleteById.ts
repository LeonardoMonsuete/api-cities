import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteById = async (idParam: number): Promise<void | Error > => {
  try {
    const citySearch = await prisma.city.findUnique({ where: { id: idParam } });
    if(!citySearch){
      return new Error(`Cidade de id:${idParam} não encontrada`);
    }
    await prisma.city.delete({where: {id: citySearch.id}});
  } catch (error) {
    console.error(error);
    return Error('Erro ao deletar cidade');
  }
};