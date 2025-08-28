import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PatioController } from '../controllers/PatioController';
import { DriverController } from '../controllers/DriverController';

const routes = Router();

const userController = new UserController();
const patioController = new PatioController();
const driverController = new DriverController();

// Rotas de User
routes.post('/users', userController.create);

// Rotas de Patio
routes.post('/patios', patioController.create);
routes.get('/patios', patioController.list);

// Rotas de Driver
routes.post('/drivers', driverController.create);

export default routes;
