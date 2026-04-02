import { Router, type Request, type Response } from 'express';
import { VisiteController } from '../controllers/visite.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createVisiteValidation,
  updateVisiteValidation,
  getVisiteByIdValidation,
  deleteVisiteValidation,
  getVisitesByVisiteurValidation,
  getVisitesByPraticienValidation,
  getVisitesByMotifValidation
} from '../validators/visite.validator.js';

const router = Router();
const visiteController = new VisiteController();

router.get('/', (req: Request, res: Response) => visiteController.getAllVisites(req, res));
router.get('/stats', (req: Request, res: Response) => visiteController.getVisitesStats(req, res));
router.get('/date-range', (req: Request, res: Response) => visiteController.getVisitesByDateRange(req, res));
router.get('/visiteur/:visiteurId', getVisitesByVisiteurValidation, validate, (req: Request, res: Response) => visiteController.getVisitesByVisiteur(req, res));
router.get('/praticien/:praticienId', getVisitesByPraticienValidation, validate, (req: Request, res: Response) => visiteController.getVisitesByPraticien(req, res));
router.get('/motif/:motifId', getVisitesByMotifValidation, validate, (req: Request, res: Response) => visiteController.getVisitesByMotif(req, res));
router.get('/:id', getVisiteByIdValidation, validate, (req: Request, res: Response) => visiteController.getVisiteById(req, res));
router.post('/', createVisiteValidation, validate, (req: Request, res: Response) => visiteController.createVisite(req, res));
router.put('/:id', updateVisiteValidation, validate, (req: Request, res: Response) => visiteController.updateVisite(req, res));
router.delete('/:id', deleteVisiteValidation, validate, (req: Request, res: Response) => visiteController.deleteVisite(req, res));

export default router;