import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../Errors';
import { UserService } from '..//Services/UserService';
import { ResponseHelper } from '..//Utils/ResponseUtils';

class UserController {
    constructor(private userService : UserService) { }

    public async activate(request: Request, response: Response, next: NextFunction) {
        try {
            const email = request.body.email;
            await this.userService.activate(email);

            return response.status(200).send('Account activated, you can login now.');
        } catch (error) {
            if (error instanceof BadRequestError) {
                return response.status(400).send('Invalid activation token.');
            }

            return next(error);
        }
    }

    public async all(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await this.userService.all();

            const result = ResponseHelper.success({data : data})
            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof BadRequestError) {
                return response.status(400).send('Server Error');
            }

            return next(error);
        }
    }

    public async datatables(request: Request, response: Response, next: NextFunction) {
        try {
            const limit = request.body.limit;
            const offset = request.body.offset;
            const order = request.body.order;
            const filters = request.body.filters;

            const data = await this.userService.datatables(limit, offset, order, filters);

            const result = ResponseHelper.success({data : data})
            return response.status(200).json(result);
        } catch (error) {
            if (error instanceof BadRequestError) {
                return response.status(400).send('Server Error');
            }

            return next(error);
        }
    }
}

export { UserController };