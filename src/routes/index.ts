import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const routes = Router();
const userController = new UserController();

// Quando uma requisição POST chegar em /users, ela chama o método 'create' do nosso UserController
routes.post('/users', userController.create);

export default routes;