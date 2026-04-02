import { Router, type Request, type Response } from 'express';
import { PraticienController } from '../controllers/praticien.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createPraticienValidation,
  updatePraticienValidation,
  getPraticienByIdValidation,
  deletePraticienValidation
} from '../validators/praticien.validator.js';

const router = Router();
const praticienController = new PraticienController();

router.get('/', (req: Request, res: Response) => praticienController.getAllPraticiens(req, res));
router.get('/search', (req: Request, res: Response) => praticienController.searchPraticiens(req, res));
router.get('/ville/:ville', (req: Request, res: Response) => praticienController.getPraticiensByVille(req, res));
router.get('/:id', getPraticienByIdValidation, validate, (req: Request, res: Response) => praticienController.getPraticienById(req, res));
router.post('/', (req: Request, res: Response) => praticienController.createPraticien(req, res));
router.put('/:id', updatePraticienValidation, validate, (req: Request, res: Response) => praticienController.updatePraticien(req, res));
router.delete('/:id', deletePraticienValidation, validate, (req: Request, res: Response) => praticienController.deletePraticien(req, res));

export default router;