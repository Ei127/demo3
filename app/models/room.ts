import sequelize from "@configs/database";
import { Sequelize } from "sequelize";
import { roomBooking } from "./roombooking";
export enum Status {
  Empty = 0,
  Booked = 1,
  Fixing = 2,
}
export interface RoomAttributes {
  roomNumber?: number;
  hotelID?: number;
  roomTypeID?: number;
  status?: number;
  cost?: number;
}

export interface RoomInstance {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  roomNumber: number;
  hotelID: number;
  roomTypeID: number;
  status: Status;
  cost: number;
}

export const room = sequelize.define("room", {
  roomNumber: Sequelize.INTEGER,
  hotelID: Sequelize.INTEGER,
  roomTypeID: Sequelize.INTEGER,
  status: Sequelize.INTEGER,
  cost: Sequelize.INTEGER,
});

export const associate = () => {
  room.hasOne(roomBooking, {
    foreignKey: "roomID",
  });
};

export default {
  room,
  associate,
};
