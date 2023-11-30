
import { UserRepository } from '..//Repositories/UserRepository';
import { City, Role, User } from '../Models';
import { InvalidCredentialsError } from '../Errors';
import { Order } from 'sequelize';
import { parseWhere } from '../Utils/helpers';

class UserService {
    constructor( private userRepository: UserRepository, ) { }

    public async activate(email: string): Promise<User> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        return this.userRepository.update(user.id, {
            email_verified_at : new Date()
        })
    }

    public async all(): Promise<User[]> {
        const include = [{
            model : City,
            attributes: ['id', 'name']
        }]
        const users = await this.userRepository.all([], include);
        return users
    }

    public async datatables(limit? : number, offset? : number, order? : Order, filter? : {}): Promise<User[]> {
        const include = [
            {
                model : City,
                attributes: ['id', 'name']
            },
            {
                model : Role,
                through: {attributes: []},
                attributes: ['id', 'name']
            }
        ];

        const filters = parseWhere(filter);
        





        const users = await this.userRepository.datatables([], filters, order, include, limit, offset);
        return users
    }
}

export { UserService };