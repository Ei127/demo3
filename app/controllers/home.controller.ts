import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { UserInstance } from "../models/user";
export class HomeController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = (await models.user.findOne({
      where: {
        id: req.session.userId,
      },
    })) as UserInstance;
    res.render("home.view/index", { user: user });
  }
}
