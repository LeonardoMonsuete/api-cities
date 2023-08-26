import { IbgeStatesInterface } from '../server/interfaces/IbgeStatesInterface';

export const statesIBGE = async () => {
  return await fetch('http://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(res => res.json()).then(res => {
    return res as IbgeStatesInterface[];
  });
};