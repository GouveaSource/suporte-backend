import { Request, Response, NextFunction } from "express";

export function adminOnly(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    //@ts-ignore
    const { role } = req.user;
    if (role !== 'ADMIN') {
        return res.status(403).json({ error: 'Acesso Negado.' });
    }
    return next();
}