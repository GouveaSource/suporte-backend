import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class DriverController {
  async create(req: Request, res: Response) {
    const { name, cpf, phone, empresaId, patioId } = req.body;

    if (!empresaId) {
      return res
        .status(400)
        .json({ error: 'O ID da empresa (empresaId) é obrigatório.' });
    }

    try {
      const driver = await prismaClient.driver.create({
        data: {
          name,
          cpf,
          phone,
          empresaId: empresaId,
          ...(patioId && { patio: { connect: { id: patioId } } }),
        },
        include: {
          empresa: true,
          patio: true,
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

  async list(req: Request, res: Response) {
    try {
      const drivers = await prismaClient.driver.findMany({
        include: {
          empresa: true,
          patio: true,
        },
      });
      return res.status(200).json(drivers);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Não foi possível listar os motoristas.' });
    }
  }
}