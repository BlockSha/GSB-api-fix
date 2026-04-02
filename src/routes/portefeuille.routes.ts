import { Router, type Request, type Response } from 'express';
import { PortefeuilleController } from '../controllers/portefeuille.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  addPraticienToPortefeuilleValidation,
  getPortefeuilleByVisiteurValidation,
  getPortefeuilleByPraticienValidation,
  updateNotesValidation,
  removePraticienValidation,
  deleteRelationValidation
} from '../validators/portefeuille.validator.js';

const router = Router();
const portefeuilleController = new PortefeuilleController();

router.get('/', (req: Request, res: Response) => portefeuilleController.getAll(req, res));
router.get('/visiteur/:visiteurId', getPortefeuilleByVisiteurValidation, validate, (req: Request, res: Response) => portefeuilleController.getByVisiteur(req, res));
router.get('/praticien/:praticienId', getPortefeuilleByPraticienValidation, validate, (req: Request, res: Response) => portefeuilleController.getByPraticien(req, res));
router.post('/', addPraticienToPortefeuilleValidation, validate, (req: Request, res: Response) => portefeuilleController.addPraticien(req, res));
router.patch('/:visiteurId/:praticienId/notes', updateNotesValidation, validate, (req: Request, res: Response) => portefeuilleController.updateNotes(req, res));
router.patch('/:visiteurId/:praticienId/remove', removePraticienValidation, validate, (req: Request, res: Response) => portefeuilleController.removePraticien(req, res));
router.delete('/:visiteurId/:praticienId', deleteRelationValidation, validate, (req: Request, res: Response) => portefeuilleController.deleteRelation(req, res));

export default router;