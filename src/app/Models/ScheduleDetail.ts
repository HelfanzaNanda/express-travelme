import {
    Table, Column, Model, CreatedAt, UpdatedAt, IsEmail, Length, AllowNull, Unique, Default, DeletedAt, ForeignKey, Min, BelongsTo,
} from 'sequelize-typescript';
import { Schedule } from './Schedule';

@Table({
    underscored : true
})
class ScheduleDetail extends Model {
    @ForeignKey(() => Schedule)
    @AllowNull(false)
    @Column
    scheduleId!: number;

    @BelongsTo(() => Schedule)
    schedule! : Schedule

    @Length({min : 2})
    @AllowNull(false)
    @Column
    hour!: string;

    @Length({min : 2})
    @AllowNull(false)
    @Column
    time!: string;

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

export { ScheduleDetail };