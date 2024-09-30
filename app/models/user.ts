import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { roomBooking } from "./roombooking";
export enum Role {
  Guest = 3,
  MANAGER = 0,
  Receptionist = 1,
}
export interface UserAttributes {
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  emailAddress?: string;
  password?: string;
  creditCard?: string;
  proofID?: string;
  role?: number;
}

export interface UserInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  firstName: string;
  lastName: string;
  contactNumber: string;
  emailAddress: string;
  password: string;
  creditCard: string;
  proofID: string;
  role: Role;
}
export const user = sequelize.define("user", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  contactNumber: Sequelize.STRING,
  emailAddress: Sequelize.STRING,
  password: Sequelize.STRING,
  creditCard: Sequelize.STRING,
  proofID: Sequelize.STRING,
  role: Sequelize.INTEGER,
});

export const associate = () => {
  user.hasMany(roomBooking, {
    foreignKey: "userID",
  });
};

export default {
  user,
  associate,
};
