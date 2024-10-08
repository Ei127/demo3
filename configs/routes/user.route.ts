import { UserController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { RestActions } from "../enum";

export class UserRoute {
  private static path = Router();
  private static userController = new UserController();

  public static draw() {
    Route.resource(this.path, this.userController, {
      only: [
        RestActions.New,
        RestActions.Create,
        RestActions.Edit,
        RestActions.Update,
        RestActions.Index,
        RestActions.Show,
      ],
    });

    return this.path;
  }
}
