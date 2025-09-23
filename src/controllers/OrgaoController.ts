import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class OrgaoApreensaoController {
    async create(req: Request, res: Response) {
        const { name, cidadeId } = req.body;
        try {
            const orgao = await prismaClient.orgaosApreensao.create({
                data: { name, cidadeId },
            });
            return res.status(201).json(orgao);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível cadastrar o órgão.' });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const orgaos = await prismaClient.orgaosApreensao.findMany({
                include: { cidade: true },
                orderBy: { name: 'asc' },
            });
            return res.status(200).json(orgaos);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível listar os órgãos.' });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, cidadeId } = req.body;
        try {
            const orgao = await prismaClient.orgaosApreensao.update({
                where: { id },
                data: { name, cidadeId },
            });
            return res.status(200).json(orgao);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível atualizar o órgão.' });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await prismaClient.orgaosApreensao.delete({
                where: { id },
            });
            return res.status(204).send();
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível excluir o órgão.' });
        }
    }
}