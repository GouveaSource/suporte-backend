import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PatioController } from '../controllers/PatioController';
import { DriverController } from '../controllers/DriverController';
import { SetorController } from '../controllers/SetorController';

const routes = Router();

const userController = new UserController();
const patioController = new PatioController();
const driverController = new DriverController();
const setorController = new SetorController();

// Rotas de User
routes.post('/users', userController.create);

// Rotas de Patio
routes.post('/patios', patioController.create);
routes.get('/patios', patioController.list);
routes.put('/patios/:id', patioController.update);
routes.delete('/patios/:id', patioController.delete);

// Rotas de Driver
routes.post('/drivers', driverController.create);

// Rotas de Setores
routes.post('/setores', setorController.create);
routes.get('/setores', setorController.list);
routes.put('/setores/:id', setorController.update);
routes.delete('/setores/:id', setorController.delete);

export default routes;
