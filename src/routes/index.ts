import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PatioController } from '../controllers/PatioController';
import { DriverController } from '../controllers/DriverController';
import { SetorController } from '../controllers/SetorController';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

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
routes.post('/patios', authMiddleware, patioController.create);
routes.get('/patios', authMiddleware, patioController.list);
routes.put('/patios/:id', authMiddleware, patioController.update);
routes.delete('/patios/:id', authMiddleware, patioController.delete);

// Rotas de Driver
routes.post('/drivers', authMiddleware, driverController.create);

// Rotas de Setores
routes.post('/setores', authMiddleware, setorController.create);
routes.get('/setores', authMiddleware, setorController.list);
routes.put('/setores/:id', authMiddleware, setorController.update);
routes.delete('/setores/:id', authMiddleware, setorController.delete);

export default routes;
