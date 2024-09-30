import { QueryInterface, SequelizeStatic } from "sequelize";

export = {
  up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.createTable("payements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      createdAt: {
        type: Sequelize.DATE,
      },

      userID: {
        type: Sequelize.INTEGER,
      },

      userFirstName: {
        type: Sequelize.STRING,
      },

      userLastName: {
        type: Sequelize.STRING,
      },

      totalPrice: {
        type: Sequelize.INTEGER,
      },

      status: {
        type: Sequelize.INTEGER,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
    return queryInterface.dropTable("payements");
  },
};
