import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { IQueryProps } from '../../interfaces/QueryPropsInterface';
import { StatusCodes } from 'http-status-codes';
import { CitiesProvider } from '../../providers/cities';

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    filter: yup.string().optional(),
    limit: yup.number().optional().moreThan(0),
    page: yup.number().optional().moreThan(0),
  })),
}));

export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) => {
  res.setHeader('access-control-expose-headers','x-total-count');
  const cities = await CitiesProvider.getAll();
  if(cities instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  }

  if(cities.length < 1){
    return res.status(StatusCodes.NO_CONTENT).send();
  }

  res.setHeader('x-total-count', cities.length);
  return res.json(cities);
};