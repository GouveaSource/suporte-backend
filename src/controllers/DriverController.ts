import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class DriverController {
  async create(req: Request, res: Response) {
    // patioIds deve ser um array de IDs de pátios existentes. Ex: ["id_patio1", "id_patio2"]
    const { name, cpf, phone, patioIds } = req.body;

    if (!patioIds || !Array.isArray(patioIds) || patioIds.length === 0) {
      return res
        .status(400)
        .json({
          error: 'É necessário fornecer um array de IDs de pátios (patioIds).',
        });
    }

    try {
      const driver = await prismaClient.driver.create({
        data: {
          name,
          cpf,
          phone,
          // Aqui está a mágica da relação muitos-para-muitos!
          patios: {
            connect: patioIds.map((id) => ({ id })),
          },
        },
        // Inclui os dados dos pátios na resposta para vermos a conexão
        include: {
          patios: true,
        },
      });
      return res.status(201).json(driver);
    } catch (error) {
      console.log(error); // Ajuda a debugar se der erro
      return res
        .status(400)
        .json({ error: 'Não foi possível criar o motorista.' });
    }
  }
}
