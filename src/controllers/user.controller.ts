import { Request,Response } from "express";

import { IUserController } from "@/interfaces/user.interface";
import makeResponse from "@/libs/make-response";
import { ModRequest } from "@/middlewares/auth.middleware";
import UserService from "@/services/user.service";
import { CreateUserInput } from "@/validations/auth.validations";

const inst = UserService.getInstance();

export default class UserController implements IUserController {
  public async get(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const user = await inst.getUser(id);
      res.status(200).json(makeResponse(user));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  public async getAll(
    _req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const users = await inst.getUsers();
      res.status(200).json(makeResponse(users));
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  public async create(
    req: Request<object, object, CreateUserInput["body"]>,
    res: Response,
  ): Promise<void> {
    try {
      const user = await inst.createUser(
        req.body.name,
        req.body.email,
        req.body.password
      );
      res.status(201).json(makeResponse(user));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.params as { id: string };
      const { name, password } = req.body as {
        name: {
          first: string;
          last: string;
        };
        password: string;
      };
      const user = await inst.updateUser(id, name, password);
      res.status(200).json(makeResponse(user));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async remove(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const user = await inst.deleteUser(req.params.id);
      res.status(202).json(makeResponse(user));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async me(
    req: ModRequest,
    res: Response,
  ): Promise<void> {
    try {
      const { id } = req.user;
      const user = await inst.getUser(id);
      res.status(200).json(makeResponse(user));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
