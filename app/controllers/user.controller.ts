import models from "@models";
import { UserInstance } from "@models/user";
import { Request, Response } from "express";
import { ApplicationController } from ".";

export class UserController extends ApplicationController {
  public async index(req: Request, res: Response) {
    res.render("user.view/index", { user: req.user });
  }

  public async new(req: Request, res: Response) {
    res.render("user.view/new", { user: req.user });
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
      role: req.body.role,
    })) as UserInstance;
    req.flash("success", { msg: `Created user ${user.lastName}` });
    res.redirect("/");
  }
  public async edit(req: Request, res: Response) {
    try {
      const user = await models.user.findOne({
        where: {
          id: req.session.userId,
        },
      });

      if (!user) {
        req.flash("errors", { msg: "User not found" });
        return;
      }
      res.render("user.view/profile_edit", { user: user });
    } catch (error) {
      req.flash("errors", { msg: "khong biet" });
      res.redirect("/");
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { firstName, lastName, contactNumber, creditCard, proofID } =
        req.body;
      const user = await models.user.findOne({
        where: {
          id: req.session.userId,
        },
      });
      if (!user) {
        req.flash("errors", { msg: "User not found" });
        return;
      }
      await models.user.update(
        {
          firstName: firstName,
          lastName: lastName,
          contactNumber: contactNumber,
          creditCard: creditCard,
          proofID: proofID,
        },
        {
          where: {
            id: req.session.userId,
          },
        }
      );
      req.flash("success", { msg: "User updated successfully" });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      req.flash("errors", { msg: "User updated failed" });
      res.redirect("/");
    }
  }
  public async show(req: Request, res: Response) {
    const user = (await models.user.findOne({
      where: {
        id: req.session.userId,
      },
    })) as UserInstance;
    const bookings = await models.roomBooking.findAll({
      include: [
        {
          model: models.room,
          as: "room",
        },
      ],
      where: {
        userID: user.id,
      },
    });
    res.render("user.view/profile", { user: user, bookings: bookings });
  }
}
