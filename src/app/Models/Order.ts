import {
    Table, Column, Model, CreatedAt, UpdatedAt, IsEmail, Length, AllowNull, Unique, Default, DeletedAt, ForeignKey, Min, BelongsTo,
} from 'sequelize-typescript';
import { Schedule } from './Schedule';
import { User } from './User';
import { ScheduleDetail } from './ScheduleDetail';

@Table({
    underscored : true
})
class Order extends Model {
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user! : User
    
    @ForeignKey(() => ScheduleDetail)
    @AllowNull(false)
    @Column
    scheduleDetailId!: number;

    @BelongsTo(() => ScheduleDetail)
    scheduleDetail! : ScheduleDetail

    @AllowNull(false)
    @Column
    orderId!: string;

    @Min(1)
    @AllowNull(false)
    @Column
    seat!: number;

    @AllowNull(false)
    @Column
    date!: Date;

    @AllowNull(true)
    @Column
    coupon!: string;

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

export { Order };