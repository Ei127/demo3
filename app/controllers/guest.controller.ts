import models from "@models";
import { Role, UserInstance } from "@models/user";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class GuestController extends ApplicationController {
  public async index(req: Request, res: Response) {
    res.render("guest.view/index", { user: req.user });
  }

  public async new(req: Request, res: Response) {
    res.render("guest.view/new", { user: req.user });
  }

  public async create(req: Request, res: Response) {
    const { emailAddress, confirmPassword, password } = req.body;
    const findUserEmailExit = await models.user.findOne({
      where: {
        emailAddress: emailAddress,
      },
    });
    if (confirmPassword !== password) {
      req.flash("errors", { msg: "Confirm password is not match." });
      return res.redirect("/");
    }
    if (findUserEmailExit) {
      req.flash("errors", { msg: "This email is already use." });
      return res.redirect("/");
    }

    const user = (await models.user.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      contactNumber: req.body.contactNumber,
      emailAddress: emailAddress,
      password: password,
      creditCard: req.body.creditCard,
      proofID: req.body.proofID,
      role: Role.Guest,
    })) as UserInstance;
    req.flash("success", { msg: `Created user ${user.lastName}` });
    res.redirect("/");
  }
}
