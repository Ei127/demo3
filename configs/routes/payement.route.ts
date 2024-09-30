import { PayementController } from "@controllers";
import { Router } from "express";

export class PayementRoute {
  private static path = Router();
  private static payementController = new PayementController();

  public static draw() {
    this.path.post("/", this.payementController.create);
    // Route.resource(this.path, this.payementController, {
    //   except: [RestActions.Create],
    // });

    return this.path;
  }
}
