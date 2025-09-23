import { Request, Response, NextFunction } from "express";

export function can(permission: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        // @ts-ignore
        const { permissions } = req.user;

        if (!permissions || !permissions.includes(permission)) {
            return res.status(403).json({ error: "Acesso Negado: Permissão insuficiente." });
        }
        return next();
    }
}