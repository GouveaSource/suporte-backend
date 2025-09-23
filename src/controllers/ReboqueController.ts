import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';
import { TipoReboque } from '@prisma/client';
export class ReboqueController {
    async create(req: Request, res: Response) {
        const { placa, marcaModelo, tipo, driverId } = req.body;

        if (!tipo || !Object.values(TipoReboque).includes(tipo)) {
            return res.status(400).json({
                error: "O campo 'tipo' é obrigatório e deve ser 'LEVE' ou 'PESADO'.",
            });
        }

        try {
            const reboque = await prismaClient.reboque.create({
                data: {
                    placa,
                    marcaModelo,
                    tipo,
                    driverId,
                },
            });
            return res.status(201).json(reboque);
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ error: 'Não foi possível cadastrar o reboque.' });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const reboques = await prismaClient.reboque.findMany({
                include: { driver: true },
            });
            return res.status(200).json(reboques);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível listar os reboques.' });
        }
    }
}