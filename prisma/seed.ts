import { PrismaClient } from '@prisma/client';
import { statesIBGE } from '../src/data/getStates';

const prisma = new PrismaClient();

async function main() {
  const states = await statesIBGE();
  for(const state of states){
    await prisma.state.create({
      data: {
        name: state.nome,
        abbreviation: state.sigla
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });