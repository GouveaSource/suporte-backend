import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class PatioController {
  async create(req: Request, res: Response) {
    const {
      name,
      address,
      cep,
      referencePoint,
      mapUrl,
      phone,
      ramal,
      managerName,
    } = req.body;

    try {
      const patio = await prismaClient.patio.create({
        data: {
          name,
          address,
          cep,
          referencePoint,
          mapUrl,
          phone,
          ramal,
          managerName,
        },
      });
      return res.status(201).json(patio);
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível criar o pátio.' });
    }
  }
}
