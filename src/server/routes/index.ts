import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';


import { CitiesController } from './../controllers';
const router = Router();

router.get('/', (req, res) => {
  
  return res.send('Olá Mundo !');
});

router.post('/cidades', CitiesController.create);

export { router };