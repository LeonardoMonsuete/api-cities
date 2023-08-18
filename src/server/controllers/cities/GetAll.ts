import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { IQueryProps } from '../../interfaces/QueryPropsInterface';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    filter: yup.string().optional(),
    limit: yup.number().optional().moreThan(0),
    page: yup.number().optional().moreThan(0),
  })),
}));

export const getAll = async (req: Request<{},{},{},IQueryProps>, res: Response) => {
  const cities = await prisma.city.findMany();
  res.setHeader('access-control-expose-headers','x-total-count');
  if(cities.length > 0){
    res.setHeader('x-total-count', cities.length);
    return res.json(cities);
  }
  return res.status(StatusCodes.NO_CONTENT).send();
};