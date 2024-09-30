import models from "@models";
import { Request, Response } from "express";
import { ApplicationController } from ".";
import { Status } from "../models/room";
import { RoomBookingInstance } from "../models/roombooking";
import { UserInstance } from "../models/user";
export class RoomBookingController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const user = (await models.user.findOne({
      where: {
        id: req.session.userId,
      },
    })) as UserInstance;
    const users = await models.user.findAll();
    const bookings = await models.roomBooking.findAll({
      include: [
        {
          model: models.room,
          as: "room",
        },
      ],
    });
    res.render("booking.view/index", { user: user, bookings: bookings });
  }

  public async new(req: Request, res: Response) {
    res.render("booking.view/new");
  }

  public async create(req: Request, res: Response) {
    const { roomID } = req.body;
    const user = (await models.user.findOne({
      where: {
        id: req.session.userId,
      },
    })) as UserInstance;

    (await models.roomBooking.create({
      roomID,
      userID: user.id,
      bookingDate: new Date(),
      durationOfStay: 0,
      checkIn: null,
      checkOut: null,
    })) as RoomBookingInstance;
    await models.room.update(
      {
        status: Status.Booked,
      },
      {
        where: {
          id: roomID,
        },
      }
    );
    req.flash("success", { msg: `Created cart` });
    res.redirect("/rooms");
  }
  public async destroy(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      req.flash("errors", { msg: `id is not match` });
      return res.redirect("/rooms");
    }

    const roomBooking = (await models.roomBooking.findOne({
      where: { id: id },
    })) as RoomBookingInstance;
    await models.room.update(
      {
        status: Status.Empty,
      },
      {
        where: {
          id: roomBooking.roomID,
        },
      }
    );
    await models.roomBooking.destroy({
      where: {
        id,
      },
    });
    res.redirect("/rooms");
  }
}
