import {
    Table, Column, Model, CreatedAt, UpdatedAt, IsEmail, Length, AllowNull, Unique, Default, DeletedAt,
} from 'sequelize-typescript';

@Table({
    underscored : true,
    paranoid: true

})
class Car extends Model {
    @Length({ min: 3, max: 255 })
    @AllowNull(false)
    @Column
    name!: string;

    @Length({ min : 3 })
    @AllowNull(false)
    @Column
    capacity!: number;

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

export { Car };