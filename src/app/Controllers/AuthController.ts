import { NextFunction, Request, Response } from 'express';
import { BadRequestError, ValidationError } from '../Errors';
import { AuthService } from '..//Services/AuthService';
import { ResponseHelper } from '..//Utils/ResponseUtils';
import { ValidationInterface } from 'app/Errors/ValidationError';

class AuthController {
    constructor(private authService : AuthService) { }

    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.body.email || !request.body.password) {
                const validation = {
                    email : ['email is required'],
                    password : ['password is required'],
                }
                throw new ValidationError({validation : validation});
            }

            const email = request.body.email;
            const password = request.body.password;

            const authData = await this.authService.login(email, password);

            return response.status(200).json(ResponseHelper.success({data : authData}));
        } catch (error) {
            return next(error);
        }
    }

    public async register(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.body.email || !request.body.password) {
                throw new BadRequestError();
            }
            const name = request.body.name;
            const email = request.body.email;
            const password = request.body.password;
            await this.authService.createUser(name, email, password);

            return response.sendStatus(201);
        } catch (error) {
            return next(error);
        }
    }
}

export { AuthController };