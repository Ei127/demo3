import { DevController } from "@controllers";
import { Router } from "express";

export class DevRoute {
  private static path = Router();
  private static devController = new DevController();

  public static draw() {
    // Route.resource(this.path, this.devController, {
    //   except: [RestActions.Create],
    // });
    this.path.post("/", this.devController.create);

    return this.path;
  }
}
