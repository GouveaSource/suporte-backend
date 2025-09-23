import { Request, Response } from 'express';
import prismaClient from '../database/prismaClient';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export class AuthController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prismaClient.user.findUnique({
            where: { email },
            include: {
                permissions: true,
            },
        });

        if (!user) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Email ou senha inválidos' });
        }

        const permissions = user.permissions.map((p) => p.name);

        const token = sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                permissions: permissions,
            },
            process.env.JWT_SECRET || 'default_secret',
            {
                subject: user.id,
                expiresIn: '1d',
            },
        );

        const { password: _, ...userWithoutPassword } = user;

        return res.json({
            token,
            user: userWithoutPassword,
        });
    }
}