import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../Errors';
import { AuthService } from 'app/Services/AuthService';

class AuthController {
    constructor(private authService : AuthService) { }

    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.body.email || !request.body.password) {
                throw new BadRequestError();
            }

            const email = request.body.email;
            const password = request.body.password;

            const authData = await this.authService.login(email, password);

            return response.status(200).send(authData);
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