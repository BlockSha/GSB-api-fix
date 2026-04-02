import { Router, type Request, type Response } from 'express';
import { VisiteurController } from '../controllers/visiteur.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createVisiteurValidation,
  updateVisiteurValidation,
  getVisiteurByIdValidation,
  deleteVisiteurValidation
} from '../validators/visiteur.validator.js';
import {
  getPortefeuilleByVisiteurValidation
} from '../validators/portefeuille.validator.js';

const router = Router();
const visiteurController = new VisiteurController();

router.get('/', (req: Request, res: Response) => visiteurController.getAllVisiteurs(req, res));
router.get('/search', (req: Request, res: Response) => visiteurController.searchVisiteurs(req, res));
router.get('/:id', getVisiteurByIdValidation, validate, (req: Request, res: Response) => visiteurController.getVisiteurById(req, res));
router.post('/', createVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.createVisiteur(req, res));
router.put('/:id', updateVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.updateVisiteur(req, res));
router.delete('/:id', deleteVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.deleteVisiteur(req, res));
router.get('/:visiteurId/portefeuille', getPortefeuilleByVisiteurValidation, validate, (req: Request, res: Response) => visiteurController.getPortefeuillePraticiens(req, res));

export default router;