import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class CidadeController {
    async create(req: Request, res: Response) {
        const { nome, estado } = req.body;

        try {
            const cidade = await prismaClient.cidade.create({
                data: {
                    nome,
                    estado,
                },
            });
            return res.status(201).json(cidade);
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ error: 'Não foi possível cadastrar a cidade.' });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const cidades = await prismaClient.cidade.findMany();
            return res.status(200).json(cidades);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível listar as cidades.' });
        }
    }
}