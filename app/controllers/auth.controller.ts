import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { UserInstance } from "../models/user";

export class AuthController extends ApplicationController {
  public async index(req: Request, res: Response) {
    res.render("auth.view/index");
  }

  public async create(req: Request, res: Response) {
    const { emailAddress, password } = req.body;

    const user = (await models.user.findOne({
      where: {
        emailAddress: emailAddress,
        password: password,
      },
    })) as UserInstance;

    if (user) {
      if (user.role == 0 || user.role == 1) {
        req.flash("success", { msg: "Login successfully, You are admin" });
      } else {
        req.flash("success", { msg: "Login successfully, Wellcome" });
      }
      req.session.userId = user.id;
    } else {
      req.flash("errors", { msg: "User is not found." });
    }

    res.redirect("/");
  }

  public async destroy(req: Request, res: Response) {
    req.session.destroy((err: Error) => {
      if (err) console.log(err);
      else {
        res.redirect("/");
      }
    });
  }
}
