import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PatioController } from '../controllers/PatioController';
import { DriverController } from '../controllers/DriverController';
import { SetorController } from '../controllers/SetorController';
import { AuthController } from '../controllers/AuthController';
import { CidadeController } from '../controllers/CidadeController';
import { ReboqueController } from '../controllers/ReboqueController';
import { OrgaoApreensaoController } from '../controllers/OrgaoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminOnly } from '../middlewares/adminOnly';

const routes = Router();

const userController = new UserController();
const patioController = new PatioController();
const driverController = new DriverController();
const setorController = new SetorController();
const authController = new AuthController();
const cidadeController = new CidadeController();
const reboqueController = new ReboqueController();
const orgaoApreensaoController = new OrgaoApreensaoController();

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

// Rotas de Cidades
routes.post('/cidades', authMiddleware, adminOnly, cidadeController.create);
routes.get('/cidades', authMiddleware, cidadeController.list);

//Rotas de Reboques
// Rotas de Reboque
routes.post('/reboques', authMiddleware, adminOnly, reboqueController.create);
routes.get('/reboques', authMiddleware, reboqueController.list);

// Rotas de Órgão de Apreensão
routes.post('/orgaos', authMiddleware, adminOnly, orgaoApreensaoController.create);
routes.get('/orgaos', authMiddleware, orgaoApreensaoController.list);

export default routes;
