import { Request, Response } from "express";
import prismaClient from "../database/prismaClient";

export class SetorController {
    async create(req: Request, res: Response) {
        const { name, phone, ramal, responsible } = req.body;

        try {
            const setor = await prismaClient.setor.create({
                data: {
                    name,
                    phone,
                    ramal,
                    responsible,
                },
            });
            return res.status(201).json(setor);
        } catch (error) {
            return res.status(400).json({ error: 'Não foi possivel criar o setor' });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const setores = await prismaClient.setor.findMany();
            return res.status(200).json(setores);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possivel listar os setores' })
        }
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, phone, ramal, responsible } = req.body;

        try {
            const setor = await prismaClient.setor.update({
                where: { id },
                data: {
                    name,
                    phone,
                    ramal,
                    responsible,
                },
            });
            return res.status(200).json(setor);
        } catch (error) {
            return res
                .status(400)
                .json({ error: "Não foi possível atualizar os dados do setor" })
        }
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await prismaClient.setor.delete({
                where: { id },
            });

            return res.status(204).send();
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Não foi possível deletar o setor.' });
        }
    }

}