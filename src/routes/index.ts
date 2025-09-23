import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { PatioController } from '../controllers/PatioController';
import { DriverController } from '../controllers/DriverController';
import { EmpresaController } from '../controllers/EmpresaController';
import { SetorController } from '../controllers/SetorController';
import { AuthController } from '../controllers/AuthController';
import { CidadeController } from '../controllers/CidadeController';
import { ReboqueController } from '../controllers/ReboqueController';
import { OrgaoApreensaoController } from '../controllers/OrgaoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { can } from '../middlewares/permissions';

const routes = Router();

const userController = new UserController();
const patioController = new PatioController();
const driverController = new DriverController();
const empresaController = new EmpresaController();
const setorController = new SetorController();
const authController = new AuthController();
const cidadeController = new CidadeController();
const reboqueController = new ReboqueController();
const orgaoController = new OrgaoApreensaoController();

// --- Rotas Públicas ---
routes.post('/login', authController.login);
routes.post('/users', userController.create);

// --- Rotas Protegidas ---

// Empresas
routes.post('/empresas', authMiddleware, can('empresa:create'), empresaController.create);
routes.get('/empresas', authMiddleware, can('empresa:read'), empresaController.list);
routes.put('/empresas/:id', authMiddleware, can('empresa:update'), empresaController.update);
routes.delete('/empresas/:id', authMiddleware, can('empresa:delete'), empresaController.delete);

// Motoristas (Drivers)
routes.post('/drivers', authMiddleware, can('driver:create'), driverController.create);
routes.get('/drivers', authMiddleware, can('driver:read'), driverController.list);


// Patios
routes.post('/patios', authMiddleware, can('patio:create'), patioController.create);
routes.get('/patios', authMiddleware, can('patio:read'), patioController.list);
routes.put('/patios/:id', authMiddleware, can('patio:update'), patioController.update);
routes.delete('/patios/:id', authMiddleware, can('patio:delete'), patioController.delete);

// Setores
routes.post('/setores', authMiddleware, can('setor:create'), setorController.create);
routes.get('/setores', authMiddleware, can('setor:read'), setorController.list);
routes.put('/setores/:id', authMiddleware, can('setor:update'), setorController.update);
routes.delete('/setores/:id', authMiddleware, can('setor:delete'), setorController.delete);

// Cidades (Catálogo)
routes.post('/cidades', authMiddleware, can('cidade:create'), cidadeController.create);
routes.get('/cidades', authMiddleware, can('cidade:read'), cidadeController.list);

// Orgãos (Catálogo)
routes.post('/orgaos', authMiddleware, can('orgao:create'), orgaoController.create);
routes.get('/orgaos', authMiddleware, can('orgao:read'), orgaoController.list);

// Reboques
routes.post('/reboques', authMiddleware, can('reboque:create'), reboqueController.create);
routes.get('/reboques', authMiddleware, can('reboque:read'), reboqueController.list);


export default routes;