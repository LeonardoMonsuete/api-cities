import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICidade } from '../../interfaces/CityInterface';
import { StatusCodes } from 'http-status-codes';

export const createValidation = validation((getSchema) => ({
  body: getSchema<ICidade>(yup.object().shape({
    nome: yup.string().required().min(3),
  })),
}));

export const create = async (req: Request<{},{},ICidade>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};