import { Request, Response } from 'express';
import * as  yup from 'yup';
import { validation } from '../../shared/middleware';
import { IParamProps } from '../../interfaces/ParamsProps';
import { StatusCodes } from 'http-status-codes';
import { ICity } from '../../interfaces/CityInterface';
import { CitiesProvider } from '../../providers/cities';

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().required().moreThan(0),
  })),
  body: getSchema<ICity>(yup.object().shape({
    name: yup.string().required().min(3),
    stateId: yup.number().required().moreThan(0)
  })),
}));

export const updateById = async (req: Request<IParamProps, {}, ICity>, res: Response) => {
  const idParam = Number(req.params.id);
  const newData = req.body;
  const updatedCity = await CitiesProvider.updateById(idParam, newData);

  if(updatedCity instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: updatedCity.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(updatedCity);
};