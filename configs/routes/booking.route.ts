import { RoomBookingController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class BookingRoute {
  private static path = Router();
  private static bookingController = new RoomBookingController();

  public static draw() {
    Route.resource(this.path, this.bookingController, {
      only: [
        RestActions.New,
        RestActions.Create,
        RestActions.Index,
        RestActions.Destroy,
      ],
    });

    return this.path;
  }
}
