import { NextFunction, Request,Response } from "express";

import { IAuthMiddleware } from "@/interfaces/auth.interface";
import AuthService from "@/services/auth.service";

const inst = AuthService.getInstance();

export default class AuthMiddleware implements IAuthMiddleware {
  public async authenticate(
    req: ModRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const token = inst.getTokenFromHeaders(req.headers);
      const decodedToken = inst.verifyToken(token);
      req.user = decodedToken;
      next();
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}

export interface ModRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}
