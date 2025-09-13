import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    name: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
    sub: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Token não fornecido.' });
    }

    const [, token] = authorization.split(' ');

    try {
        const decoded = verify(token, process.env.JWT_SECRET || 'default_secret');
        const { id, name, email, role } = decoded as TokenPayload;

        // @ts-ignore

        req.user = { id, name, email, role };

        return next(); // Se o token for válido, permite que a requisição continue
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
}