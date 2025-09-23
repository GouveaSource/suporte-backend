import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class EmpresaController {
    async create(req: Request, res: Response) {
        const { name } = req.body;
        try {
            const empresa = await prismaClient.empresa.create({
                data: { name },
            });
            return res.status(201).json(empresa);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível criar a empresa.' });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const empresas = await prismaClient.empresa.findMany();
            return res.status(200).json(empresas);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível listar as empresas.' });
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const empresa = await prismaClient.empresa.update({
                where: { id },
                data: { name },
            });
            return res.status(200).json(empresa);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível atualizar a empresa.' });
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await prismaClient.empresa.delete({
                where: { id },
            });
            return res.status(204).send();
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível excluir a empresa.' });
        }
    }
}