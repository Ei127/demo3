import hotelModel, { hotel } from "./hotel";
import payementModel, { payement } from "./payement";
import ratingModel, { rating } from "./rating";
import roomModel, { room } from "./room";
import roombookingModel, { roomBooking } from "./roombooking";
import roomtypeModel, { roomType } from "./roomtype";
import userModel, { user } from "./user";
hotelModel.associate();
payementModel.associate();
ratingModel.associate();
roomModel.associate();
roombookingModel.associate();
roomtypeModel.associate();
userModel.associate();
export default {
  room,
  roomType,
  roomBooking,
  hotel,
  rating,
  payement,
  user,
};
