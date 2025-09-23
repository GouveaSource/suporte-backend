// src/controllers/DriverController.ts
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
          empresa: {
            connect: { id: empresaId },
          },
          ...(patioId && {
            patio: {
              connect: { id: patioId },
            },
          }),
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
        orderBy: { name: 'asc' },
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

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const driver = await prismaClient.driver.findUnique({
        where: { id },
        include: {
          empresa: true,
          patio: true,
          reboques: true,
        },
      });
      if (!driver) {
        return res.status(404).json({ error: 'Motorista não encontrado.' });
      }
      return res.status(200).json(driver);
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível encontrar o motorista.' });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, cpf, phone, empresaId, patioId } = req.body;
    try {
      const driver = await prismaClient.driver.update({
        where: { id },
        data: {
          name,
          cpf,
          phone,
          empresaId,
          patioId: patioId || null,
        },
      });
      return res.status(200).json(driver);
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível atualizar o motorista.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prismaClient.driver.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Não foi possível excluir o motorista.' });
    }
  }
}