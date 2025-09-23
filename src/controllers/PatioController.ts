import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class PatioController {
  async create(req: Request, res: Response) {
    const { name, address, cep, referencePoint, mapUrl, phone, ramal, managerName } = req.body;
    try {
      const patio = await prismaClient.patio.create({
        data: { name, address, cep, referencePoint, mapUrl, phone, ramal, managerName },
      });
      return res.status(201).json(patio);
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível criar o pátio.' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const patios = await prismaClient.patio.findMany({
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { cidades: true, orgaos: true },
          },
        },
      });
      return res.status(200).json(patios);
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível listar os pátios.' });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const patio = await prismaClient.patio.findUnique({
        where: { id },
        include: {
          cidades: true,
          orgaos: true,
        },
      });
      if (!patio) {
        return res.status(404).json({ error: 'Pátio não encontrado.' });
      }
      return res.status(200).json(patio);
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível encontrar o pátio.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const { name, address, cep, cidadesIds, orgaosIds, ...rest } = req.body;

    try {
      const patio = await prismaClient.patio.update({
        where: { id },
        data: {
          name,
          address,
          cep,
          ...rest,
          cidades: {
            set: cidadesIds?.map((cidadeId: string) => ({ id: cidadeId })) || [],
          },
          orgaos: {
            set: orgaosIds?.map((orgaoId: string) => ({ id: orgaoId })) || [],
          },
        },
      });
      return res.status(200).json(patio);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: 'Não foi possível atualizar os dados do pátio.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prismaClient.patio.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível excluir o pátio.' });
    }
  }
}