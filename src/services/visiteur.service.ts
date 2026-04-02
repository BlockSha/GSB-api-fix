import { Types } from 'mongoose';
import { Visiteur, type IVisiteur } from '../models/Visiteur.js';
import { Praticien, type IPraticien } from '../models/Praticien.js';

export class VisiteurService {
  public async create(data: Partial<IVisiteur>): Promise<IVisiteur> {
    if (!data.email) {
      throw new Error('L\'email est obligatoire');
    }

    const existing = await Visiteur.findOne({ email: data.email });
    if (existing) {
      throw new Error(`Un visiteur avec l'email ${data.email} existe déjà`);
    }

    try {
      const visiteur = new Visiteur(data);
      return await visiteur.save();
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'ValidationError') {
        const details = Object.values((err as any).errors)
          .map((e: any) => e.message)
          .join(', ');
        throw new Error(`Validation échouée: ${details}`);
      }
      throw err;
    }
  }

  public async addPraticienToPortefeuille(
    visiteurId: string,
    praticienId: string
  ): Promise<IVisiteur> {
    if (!Types.ObjectId.isValid(visiteurId) || !Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID visiteur ou praticien invalide');
    }

    const praticien = await Praticien.findById(praticienId).select('_id').lean();
    if (!praticien) {
      throw new Error(`Praticien avec l'ID ${praticienId} introuvable`);
    }

    const visiteurUpdated = await Visiteur.findByIdAndUpdate(
      visiteurId,
      { $addToSet: { portefeuillePraticiens: praticienId } },
      { new: true, runValidators: true }
    ).populate('portefeuillePraticiens');

    if (!visiteurUpdated) {
      throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
    }

    return visiteurUpdated;
  }

  public isJunior(dateEmbauche: Date | undefined | null): boolean {
    if (!dateEmbauche) {
      return true;
    }

    const unAnAvant = new Date();
    unAnAvant.setFullYear(unAnAvant.getFullYear() - 1);

    return dateEmbauche > unAnAvant;
  }

  public async getPortefeuillePraticiens(visiteurId: string): Promise<IPraticien[]> {
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }

    const visiteur = await Visiteur.findById(visiteurId).populate('portefeuillePraticiens');

    if (!visiteur) {
      throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
    }

    return visiteur.portefeuillePraticiens as unknown as IPraticien[];
  }
}