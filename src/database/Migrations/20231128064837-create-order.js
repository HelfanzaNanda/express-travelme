'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            schedule_detail_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            order_id: {
                allowNull: false,
                type: Sequelize.STRING
            },
            seat: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            coupon: {
                type: Sequelize.STRING,
                allowNull : true
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue : new Date(),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue : new Date(),
            },
            deleted_at: {
                allowNull: true,
                type: Sequelize.DATE
            },
            created_by: {
                allowNull : true,
                type : Sequelize.INTEGER
            },
            updated_by: {
                allowNull : true,
                type : Sequelize.INTEGER
            },
            deleted_by: {
                allowNull : true,
                type : Sequelize.INTEGER
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('orders');
    }
};