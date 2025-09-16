import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PatioController } from '../controllers/PatioController';
import { DriverController } from '../controllers/DriverController';
import { SetorController } from '../controllers/SetorController';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminOnly } from '../middlewares/adminOnly';

const routes = Router();

const userController = new UserController();
const patioController = new PatioController();
const driverController = new DriverController();
const setorController = new SetorController();
const authController = new AuthController();

// Rotas de User
routes.post('/users', userController.create);

//Rotas de Login
routes.post('/login', authController.login);

// Rotas de Patio
routes.post('/patios', authMiddleware, adminOnly, patioController.create);
routes.get('/patios', authMiddleware, patioController.list);
routes.put('/patios/:id', authMiddleware, adminOnly, patioController.update);
routes.delete('/patios/:id', authMiddleware, adminOnly, patioController.delete);

// Rotas de Driver
routes.post('/drivers', authMiddleware, adminOnly, driverController.create);

// Rotas de Setores
routes.post('/setores', authMiddleware, adminOnly, setorController.create);
routes.get('/setores', authMiddleware, setorController.list);
routes.put('/setores/:id', authMiddleware, adminOnly, setorController.update);
routes.delete('/setores/:id', authMiddleware, adminOnly, setorController.delete);

export default routes;
