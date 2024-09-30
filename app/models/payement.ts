import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
export enum PayementStatus {
  CANNCELED = 0,
  WAITING = 1,
  PAID = 2,
}
export interface PayementAttributes {
  createdAt?: Date;
  userID?: number;
  userFirstName?: string;
  userLastName?: string;
  roomID?: number;
  totalPrice?: number;
  status?: number;
}

export interface PayementInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  userID: number;
  userFirstName: string;
  userLastName: string;
  roomID: number;
  totalPrice: number;
  status: PayementStatus;
}

export const payement = sequelize.define("payement", {
  userID: Sequelize.INTEGER,
  userFirstName: Sequelize.STRING,
  userLastName: Sequelize.STRING,
  roomID: Sequelize.INTEGER,
  totalPrice: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
});

export const associate = () => {};

export default {
  payement,
  associate,
};
