import {
    QueryInterface,
    SequelizeStatic
} from 'sequelize';

export = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.createTable('hotels', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            hotelName: {
                type: Sequelize.STRING
            },

            contactNumber: {
                type: Sequelize.STRING
            },

            emailAddress: {
                type: Sequelize.STRING
            },

            description: {
                type: Sequelize.STRING
            },

            floorCount: {
                type: Sequelize.INTEGER
            },

            roomCopacity: {
                type: Sequelize.INTEGER
            },

            userID: {
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

    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropTable('hotels');
    }
};
