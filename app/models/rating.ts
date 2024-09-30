import sequelize from "@configs/database";
import { Sequelize } from "sequelize";

export interface RatingAttributes {
  userID?: number;
  rating?: number;
  description?: string;
}

export interface RatingInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  userID: number;
  rating: number;
  description: string;
}

export const rating = sequelize.define("rating", {
  userID: Sequelize.STRING,
  rating: Sequelize.INTEGER,
  description: Sequelize.STRING,
});

export const associate = () => {};

export default {
  rating,
  associate,
};
