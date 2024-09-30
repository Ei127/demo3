"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            contactNumber: {
                type: Sequelize.STRING
            },
            emailAddress: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            creditCard: {
                type: Sequelize.STRING
            },
            proofID: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable("users");
    }
};
