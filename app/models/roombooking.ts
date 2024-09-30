import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { room } from "./room";
import { user } from "./user";
export interface RoomBookingAttributes {
  roomID?: number;
  userID?: number;
  bookingDate?: Date;
  durationOfStay?: string;
  checkIn?: Date;
  checkOut?: Date;
}

export interface RoomBookingInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  roomID: number;
  userID: number;
  bookingDate: Date;
  durationOfStay: string;
  checkIn: Date;
  checkOut: Date;
}

export const roomBooking = sequelize.define("roomBooking", {
  roomID: Sequelize.INTEGER,
  userID: Sequelize.INTEGER,
  bookingDate: Sequelize.DATE,
  durationOfStay: Sequelize.STRING,
  checkIn: Sequelize.DATE,
  checkOut: Sequelize.DATE,
});

export const associate = () => {
  roomBooking.belongsTo(room, { foreignKey: "roomID" });
  roomBooking.belongsTo(user, { foreignKey: "userID" });
};

export default {
  roomBooking,
  associate,
};
