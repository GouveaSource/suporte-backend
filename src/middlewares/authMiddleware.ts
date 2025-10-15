import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    id: string;
    name: string;
    email: string;
    permissions: string[];
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
        const { id, name, email, permissions } = decoded as TokenPayload;

        // @ts-ignore
        req.user = { id, name, email, permissions };

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }
}