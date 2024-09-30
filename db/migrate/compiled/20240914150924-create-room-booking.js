"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("roomBookings", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            roomID: {
                type: Sequelize.INTEGER
            },
            userID: {
                type: Sequelize.INTEGER
            },
            bookingDate: {
                type: Sequelize.DATE
            },
            durationOfStay: {
                type: Sequelize.STRING
            },
            checkIn: {
                type: Sequelize.DATE
            },
            checkOut: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable("roomBookings");
    }
};
