import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { IParamProps } from '../../interfaces/ParamsProps';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../interfaces/CityInterface';

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, ICidade>, res: Response) => {
  console.log(req.params);
  console.log(req.body);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};