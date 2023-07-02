import { Request,Response } from "express";

import { IAuthController } from "@/interfaces/auth.interface";
import makeResponse from "@/libs/make-response";
import AuthService from "@/services/auth.service";
import { LoginUserInput } from "@/validations/auth.validations";

const inst = AuthService.getInstance();

export default class AuthController implements IAuthController {
  public async login(
    req: Request<object, object, LoginUserInput["body"]>,
    res: Response,
  ): Promise<void> {
    try {
      const token = await inst.loginUser(req.body.email, req.body.password);
      res.status(200).json(makeResponse(token));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
