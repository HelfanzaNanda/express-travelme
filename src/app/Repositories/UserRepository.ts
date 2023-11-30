import { BaseRepositoryInterface } from './BaseRepository.interface';
import { BaseRepository } from './BaseRepository';
import { User } from '../Models';
import { FindOptions, Includeable } from 'sequelize';

interface UserRepositoryInterface extends BaseRepositoryInterface {
    findByEmail(email: string, include? : Includeable[]): Promise<any | null>;
    emailExists(email: string): Promise<boolean>;
}
/* eslint-disable class-methods-use-this */


class UserRepository extends BaseRepository<User> implements UserRepositoryInterface {
    constructor() {
        super(User);
    }

    public async findByEmail(email: string, include? : Includeable[]): Promise<User | null> {
        const options : FindOptions = {};
        options.where = {
            email : email,
        }
        if (include) {
            options.include = include;
        }
        return await User.scope('withPassword').findOne(options);
    }

    public async emailExists(email: string): Promise<boolean> {
        const user = await User.findOne({
            where: {
                email,
            },
        });

        return user !== null;
    }
}
export { UserRepository };