import { RestActions } from "@configs/enum";
import { Router } from "express";
import { Route } from ".";
import { AuthController } from "../../app/controllers/auth.controller";
export class AuthRoute {
  private static path = Router();
  private static authController = new AuthController();

  public static draw() {
    this.path
      .route("/")
      .get(
        this.authController.validateUserLogin,
        this.authController.index,
        this.authController.destroy
      );
    Route.resource(this.path, this.authController, {
      only: [RestActions.Destroy, RestActions.Index, RestActions.Create],
    });

    return this.path;
  }
}
