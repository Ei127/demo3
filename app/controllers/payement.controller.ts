import sequelize from "@configs/database";
import models from "@models";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { ApplicationController } from ".";
import { RoomInstance } from "../models/room";

export class PayementController extends ApplicationController {
  public async index(req: Request, res: Response) {
    const userId = req.user.id;
    const payement = await models.payement.findAll({
      where: {
        userId: {
          [Op.eq]: userId,
        },
      },
      include: [{ model: models.room }],
    });

    res.render("payement.view/index", { payement: payement });
  }

  public async create(req: Request, res: Response) {
    const { roomID } = req.body;
    const userID = req.user.id;

    await models.payement.create();

    req.flash("success", { msg: `Created cart` });
    res.redirect("/payement");
  }

  public async saveOrOrder(req: Request, res: Response) {
    const {
      type,
      selected,
      userFirstName,
      userLastName,
      roomID,
      cost,
      ...restBody
    } = req.body;
    const t = await sequelize.transaction();

    try {
      await models.payement.destroy({
        where: {
          userId: req.user.id,
        },
      });

      const bodyToCreate = Object.keys(restBody).map((roomID) => {
        if (type !== "Booking" || !selected.includes(roomID))
          return {
            userId: req.user.id,
            roomID: +roomID,
          };
      });

      if (type === "Booking") {
        const rooms = (await models.room.findAll({
          where: {
            id: selected.map(Number),
          },
        })) as RoomInstance[];

        const pricesByRoomId: {
          [key: number]: number;
        } = {};
        rooms.forEach((room) => {
          pricesByRoomId[room.id] = room.cost;
        });
        await models.payement.bulkCreate(
          selected.map((roomID: string) => ({
            userID: req.user.id,
            userFirstName: userFirstName,
            userLastName: userLastName,
            roomID: +roomID,
            cost: pricesByRoomId[+roomID] || 0,
          }))
        );
      }

      await models.payement.bulkCreate(bodyToCreate);

      // TODO: Gửi email cho user đang đăng nhập sau khi order

      t.commit();
      req.flash("success", { msg: `Updated!` });
      res.redirect("/payement");
    } catch (e) {
      t.rollback();
      req.flash("errors", { msg: `Action to database failed. Message: ${e}` });
      res.redirect("/payement");
    }
  }

  public async destroy(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) {
      req.flash("errors", { msg: `id is not match` });
      return res.redirect("/payement");
    }

    const existedCart = await models.payement.findById(id);
    if (!existedCart) {
      req.flash("errors", { msg: `cart ${id} is not found.` });
      return res.redirect("/payement");
    }

    await models.payement.destroy({
      where: {
        id,
      },
    });

    res.redirect("/payement");
  }
}
