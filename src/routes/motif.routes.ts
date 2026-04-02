import { Router, Request, Response } from 'express';
import { MotifController } from '../controllers/motif.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createMotifValidation,
  updateMotifValidation,
  getMotifByIdValidation,
  deleteMotifValidation
} from '../validators/motif.validator.js';

const router = Router();
const motifController = new MotifController();

router.get('/', (req: Request, res: Response) => motifController.getAllMotifs(req, res));

router.get('/search', (req: Request, res: Response) => motifController.searchMotifs(req, res));

router.get('/:id', getMotifByIdValidation, validate, (req: Request, res: Response) => motifController.getMotifById(req, res));

router.post('/', createMotifValidation, validate, (req: Request, res: Response) => motifController.createMotif(req, res));

router.put('/:id', updateMotifValidation, validate, (req: Request, res: Response) => motifController.updateMotif(req, res));

router.delete('/:id', deleteMotifValidation, validate, (req: Request, res: Response) => motifController.deleteMotif(req, res));

export default router;