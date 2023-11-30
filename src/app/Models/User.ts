import {
    Table, Column, Model, CreatedAt, UpdatedAt, IsEmail, Length, AllowNull, Unique, Default, DeletedAt, BelongsTo, ForeignKey, Scopes, DefaultScope, HasMany, BelongsToMany,
} from 'sequelize-typescript';
import { City } from './City';
import { Role } from './Role';
import { UsersRoles } from './UsersRoles';

@DefaultScope(() => ({
    attributes: {
        exclude: ['password']
    }
}))
@Scopes(() => ({
    withPassword: {
        attributes: { include: ['password'] },
    }
}))
@Table({
    underscored : true,
    paranoid: true
})
class User extends Model {
    @Length({ min: 3, max: 255 })
    @AllowNull(false)
    @Column
    name!: string;

    @IsEmail
    @Length({ max: 254 })
    @Unique
    @AllowNull(false)
    @Column
    email!: string;
    
    @Length({ max: 20 })
    @Unique
    @AllowNull(false)
    @Column
    phone!: string;


    @Column
    emailVerifiedAt! : Date;

    @Column
    phoneVerifiedAt! : Date;


    @Length({ max: 60 })
    @AllowNull(false)
    @Column
    password!: string;

    @ForeignKey(() => City)
    @AllowNull(false)
    @Column
    cityId!: number;

    @BelongsTo(() => City)
    city! : City

    @BelongsToMany(() => Role, () => UsersRoles, 'user_id')
    roles! : Role[]

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @DeletedAt
    deletedAt!: Date;

    @Column
    createdBy!: number;

    @Column
    updatedBy!: number;

    @Column
    deletedBy!: number;
}

export { User };