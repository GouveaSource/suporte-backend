import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class DriverController {
  async create(req: Request, res: Response) {
    const { name, cpf, phone, patioIds } = req.body;

    if (!patioIds || !Array.isArray(patioIds) || patioIds.length === 0) {
      return res.status(400).json({
        error: 'É necessário fornecer um array de IDs de pátios (patioIds).',
      });
    }

    try {
      const driver = await prismaClient.driver.create({
        data: {
          name,
          cpf,
          phone,
          patios: {
            connect: patioIds.map((id) => ({ id })),
          },
        },
        include: {
          patios: true,
        },
      });
      return res.status(201).json(driver);
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ error: 'Não foi possível criar o motorista.' });
    }
  }
}
