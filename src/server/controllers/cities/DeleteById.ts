import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { IParamProps } from '../../interfaces/ParamsProps';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
import { CitiesProvider } from '../../providers/cities';

const prisma = new PrismaClient();

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  const exclusion = await CitiesProvider.deleteById(Number(req.params.id));
  if(exclusion instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: exclusion.message
      }
    });
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};