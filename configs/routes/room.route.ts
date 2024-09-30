import { RoomController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class RoomRoute {
  private static path = Router();
  private static roomController = new RoomController();

  public static draw() {
    this.path.route("/fillter-rooms").get(this.roomController.fillterRooms);

    Route.resource(this.path, this.roomController, {
      only: [
        RestActions.Create,
        RestActions.New,
        RestActions.Destroy,
        RestActions.Index,
      ],
    });

    return this.path;
  }
}
