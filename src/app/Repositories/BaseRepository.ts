/* eslint-disable class-methods-use-this */

import { Model } from 'sequelize-typescript';
import { BaseRepositoryInterface } from './BaseRepository.interface';
import { ResourceNotFoundError } from '../Errors';
import { FindOptions, Includeable, Order, or } from 'sequelize';


// TODO: Find a way to remove the @ts-ignore comments without getting any errors
abstract class BaseRepository<M extends Model> implements BaseRepositoryInterface {
    constructor(protected model: typeof Model) { }

    public async datatables(attributes?: string[], where? : {}, order? : Order, relations? : Includeable[], limit : number = 5, offset : number = 0): Promise<M[]> {
        // @ts-ignore
        const options : FindOptions = {};
        if (attributes?.length) {
            options.attributes = attributes;
        }
        
        if (where) {
            options.where = where;
        }
        if (order) {
            options.order = order;
        }
        if (relations?.length) {
            options.include = relations;
        }
        options.limit = limit;
        options.offset = offset;

        // @ts-ignore
        return await this.model.findAndCountAll(options);
    }
    public async all(attributes?: string[], relations? : Includeable[]): Promise<M[]> {
        // @ts-ignore
        const options : FindOptions = {};
        if (attributes?.length) {
            options.attributes = attributes;
        }
        if (relations?.length) {
            options.include = relations;
        }

        // @ts-ignore
        return await this.model.findAll(options);
    }

    public async findById(id: number, attributes?: string[]): Promise<M> {
        // @ts-ignore
        const resource = await this.model.findByPk(id, {
            attributes,
        });

        if (resource) {
            // @ts-ignore
            return resource;
        }

        throw new ResourceNotFoundError();
    }

    public async create(data: any): Promise<M> {
        // @ts-ignore
        return this.model.create(data);
    }

    public async update(id: number, data: any): Promise<M> {
        const resource = await this.findById(id);

        if (resource) {
            // @ts-ignore
            return resource.update(data);
        }

        throw new ResourceNotFoundError();
    }

    public async delete(id: number): Promise<boolean> {
        const resource = await this.findById(id);

        if (resource) {
            // @ts-ignore
            await resource.destroy();
            return true;
        }

        throw new ResourceNotFoundError();
    }
}

export { BaseRepository };