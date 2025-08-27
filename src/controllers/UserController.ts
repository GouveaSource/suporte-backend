import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';

export class UserController {
  // Método para criar um novo usuário
  async create(req: Request, res: Response) {
    // Pega os dados do corpo da requisição
    const { name, email, password } = req.body;

    try {
      // Usa o prismaClient para criar um novo registro na tabela 'user'
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password, // Em um projeto real, vamos criptografar isso!
        },
      });

      // Retorna o usuário criado com status 201 (Created)
      return res.status(201).json(user);

    } catch (error) {
      // Se der erro (ex: email já existe), retorna um erro
      return res.status(400).json({ error: 'Não foi possível criar o usuário. Verifique os dados.' });
    }
  }
}