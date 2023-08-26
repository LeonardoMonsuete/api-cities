export interface IbgeStatesInterface {
  id: number
  nome: string
  sigla: string
  regiao: {id: number, nome: string, sigla: string}
}