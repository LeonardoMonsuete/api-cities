import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { IParamProps } from '../../interfaces/ParamsProps';
import { StatusCodes } from 'http-status-codes';
import { CitiesProvider } from '../../providers/cities';

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  const citySearch = await CitiesProvider.getById(Number(req.params.id));
  if(citySearch instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: citySearch.message
      }
    });
  }
  return res.status(StatusCodes.OK).json(citySearch);
};