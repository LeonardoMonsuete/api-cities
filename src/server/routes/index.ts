import { Router } from 'express';

import { CitiesController } from './../controllers';
const router = Router();

router.get('/', (req, res) => {
  
  return res.send('Olá Mundo !');
});

router.get('/cidades', CitiesController.getAllValidation, CitiesController.getAll);
router.get('/cidades/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.post('/cidades', CitiesController.createValidation, CitiesController.create);
router.delete('/cidades/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);
router.put('/cidades/:id', CitiesController.updateByIdValidation, CitiesController.updateById);

export { router };