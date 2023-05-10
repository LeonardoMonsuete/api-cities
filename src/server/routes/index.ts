import { Router } from 'express';

import { CitiesController } from './../controllers';
const router = Router();

router.get('/', (req, res) => {
  
  return res.send('Olá Mundo !');
});

router.post('/cidades', CitiesController.createValidation, CitiesController.create);

export { router };