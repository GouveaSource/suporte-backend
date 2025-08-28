import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return res.status(201).json(user);
    } catch (error) {
      return res
        .status(400)
        .json({
          error: 'Não foi possível criar o usuário. Verifique os dados.',
        });
    }
  }
}
