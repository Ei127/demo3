import sequelize from "@configs/database";
import { Sequelize } from "sequelize";

export interface HotelAttributes {
  hotelName?: string;
  contactNumber?: string;
  emailAddress?: string;
  description?: string;
  floorCount?: number;
  roomCopacity?: number;
  userID?: number;
}

export interface HotelInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  hotelName: string;
  contactNumber: string;
  emailAddress: string;
  description: string;
  floorCount: number;
  roomCopacity: number;
  userID: number;
}

export const hotel = sequelize.define("hotel", {
  hotelName: Sequelize.STRING,
  contactNumber: Sequelize.STRING,
  emailAddress: Sequelize.STRING,
  description: Sequelize.STRING,
  floorCount: Sequelize.INTEGER,
  roomCopacity: Sequelize.INTEGER,
  userID: Sequelize.INTEGER,
});

export const associate = () => {};

export default {
  hotel,
  associate,
};
