import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { Status } from "../models/room";
import { UserInstance } from "../models/user";

export class RoomController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const rooms = await models.room.findAll();
    const user = (await models.user.findOne({
      where: {
        id: req.session.userId,
      },
    })) as UserInstance;
    if (user && (user.role == 1 || user.role == 0)) {
      return res.render("room.view/index", { rooms: rooms, user: user });
    }
    res.render("room.view/guest", { rooms: rooms, user: user });
  }

  public async show(req: Request, res: Response) {}

  public async new(req: Request, res: Response) {
    res.render("room.view/new");
  }

  public async create(req: Request, res: Response) {
    const { roomNumber, roomTypeID, cost } = req.body;

    await models.room.create({
      roomNumber: roomNumber,
      hotelID: 1,
      roomTypeID: roomTypeID,
      status: Status.Empty,
      cost: cost,
    });

    req.flash("success", { msg: `Created room ${roomNumber}` });
    res.redirect("/rooms");
  }

  public async edit(req: Request, res: Response) {}

  public async update(req: Request, res: Response) {}

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      req.flash("errors", { msg: `id is not match` });
      return res.redirect("/rooms");
    }

    const existedroom = await models.room.findById(id);
    if (!existedroom) {
      req.flash("errors", { msg: `room ${id} is not found.` });
      return res.redirect("/rooms");
    }

    await models.room.destroy({
      where: {
        id,
      },
    });

    res.redirect("/rooms");
  }
  public async fillterRooms(req: Request, res: Response) {
    const user = (await models.user.findOne({
      where: {
        id: req.session.userId,
      },
    })) as UserInstance;
    const { roomType } = req.body;
    const rooms = await models.room.findAll({
      where: {
        roomTypeID: roomType,
      },
    });
    if (user && (user.role == 0 || user.role == 1)) {
      res.render("rooms/index", { rooms: rooms });
    }
    res.render("room.view/guest", { rooms: rooms });
  }
}
