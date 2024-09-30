import { GuestController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class GuestRoute {
  private static path = Router();
  private static guestController = new GuestController();

  public static draw() {
    this.path
      .route("/")
      .get(this.guestController.validateUserLogin, this.guestController.index);
    Route.resource(this.path, this.guestController, {
      only: [RestActions.New, RestActions.Create],
    });

    return this.path;
  }
}
