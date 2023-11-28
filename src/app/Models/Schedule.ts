import {
    Table, Column, Model, CreatedAt, UpdatedAt, IsEmail, Length, AllowNull, Unique, Default, DeletedAt, ForeignKey, Min, BelongsTo,
} from 'sequelize-typescript';
import { City } from './City';
import { Car } from './Car';

@Table({
    underscored : true
})
class Schedule extends Model {
    @ForeignKey(() => City)
    @AllowNull(false)
    @Column
    fromId!: number;

    @BelongsTo(() => City)
    from! : City

    @ForeignKey(() => City)
    @AllowNull(false)
    @Column
    toId!: number;

    @BelongsTo(() => City)
    to! : City

    @ForeignKey(() => Car)
    @AllowNull(false)
    @Column
    carId!: number;

    @BelongsTo(() => Car)
    car! : Car

    @Min(0)
    @AllowNull(false)
    @Column
    price!: number;

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

export { Schedule };