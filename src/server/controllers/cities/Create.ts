import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICity } from '../../interfaces/CityInterface';
import { StatusCodes } from 'http-status-codes';
import { CitiesProvider } from '../../providers/cities';

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICity>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<{},{},ICity>, res: Response) => {
  const creationId = await CitiesProvider.create(req.body);
  if(typeof(creationId) === 'number'){
    return res.status(StatusCodes.CREATED).json(creationId);
  }
  return res.status(StatusCodes.BAD_REQUEST).json(creationId.message);
};