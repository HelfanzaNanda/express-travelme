import { Route } from '../lib/Facades';
import { AuthController, UserController } from '../app/Controllers';
import { AuthMiddleware } from '../middlewares/Global/AuthMiddleware';

export default [
    Route.post('/auth/login', [AuthController, 'login']),
    Route.post('/auth/register', [AuthController, 'register']),
    Route.get('/auth/activate/:token', [UserController, 'activate']),
    
    Route.get('/users/all', [UserController, 'all']),
    Route.post('/users/datatables', [UserController, 'datatables'], [AuthMiddleware]),
];