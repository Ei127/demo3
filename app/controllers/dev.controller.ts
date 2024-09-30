import { convertFileToBase64 } from "@configs/fileUpload";
import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { PayementInstance } from "../models/payement";
import { UserInstance } from "../models/user";

export class DevController extends ApplicationController {
  public async index(req: Request, res: Response) {
    console.log(req.session);
    res.render("home.view/index", { title: "Irwin Framework" });
  }

  public async show(req: Request, res: Response) {
    if (isNaN(+req.params.id)) {
      req.flash("errors", { msg: `${req.params.id} is not a user id.` });
      return res.redirect("/");
    }

    const user = (await models.user.findOne({
      where: {
        id: +req.params.id,
      },
      include: [{ model: models.room }, { model: models.payement }],
    })) as UserInstance;

    if (user) {
      req.session.userId = user.id;
      req.flash("success", { msg: `Get user: ${user.lastName}.` });
    } else {
      req.flash("errors", {
        msg: `User with id: ${req.params.id} does not found.`,
      });
    }

    res.redirect("/");
  }

  public async new(req: Request, res: Response) {
    res.render("dev.view/new");
  }

  public async create(req: Request, res: Response) {
    const file = req.file ? convertFileToBase64(req.file) : null;
    await models.payement.create({
      userID: req.body.userID,
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      roomID: req.body.roomID,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
    });

    res.redirect("/");
  }

  public async edit(req: Request, res: Response) {
    const payement = (await models.payement.findOne({
      where: {
        id: +req.params.id,
      },
    })) as PayementInstance;

    res.render("dev.view/edit", { payement: payement });
  }

  public async update(req: Request, res: Response) {}

  public async destroy(req: Request, res: Response) {}
}
