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

  async list(req: Request, res: Response) {
    try {
      const patios = await prismaClient.patio.findMany();
      return res.status(200).json(patios);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Não foi possível listar os pátios.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, address, cep, managerName } = req.body;

    try {
      const patio = await prismaClient.patio.update({
        where: { id },
        data: { name, address, cep, managerName },
      });
      return res.status(200).json(patio);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Não foi possível atualizar os dados do pátio.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prismaClient.patio.delete({
        where: { id },
      });

      return res.status(204).send();
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Não foi possível deletar o pátio.' });
    }
  }
}
