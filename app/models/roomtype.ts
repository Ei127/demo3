import sequelize from "@configs/database";
import { Sequelize } from "sequelize";

export interface RoomTypeAttributes {
  typeName?: string;
  description?: string;
}

export interface RoomTypeInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  typeName: string;
  description: string;
}

export const roomType = sequelize.define("roomType", {
  typeName: Sequelize.STRING,
  description: Sequelize.STRING,
});

export const associate = () => {};

export default {
  roomType,
  associate,
};
