import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';
import { hash } from 'bcryptjs';

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: 'Não foi possível criar o usuário. Verifique se o e-mail já existe.',
      });
    }
  }
}