import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';
import { hash } from 'bcryptjs';

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const newUser = await prismaClient.$transaction(async (prisma) => {
        const newEmpresa = await prisma.empresa.create({
          data: {
            name: name,
          },
        });

        const hashedPassword = await hash(password, 8);

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            empresaId: newEmpresa.id,
          },
        });

        return user;
      });

      const { password: _, ...userWithoutPassword } = newUser;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        error: 'Não foi possível criar o usuário. Verifique se o e-mail ou nome da empresa já existem.',
      });
    }
  }
}