import { NextFunction,Response } from "express";

import { ModRequest } from "@/middlewares/auth.middleware";

export interface IAuthService {
  loginUser(email: string, password: string): Promise<any>;
  generateToken(payload: any): string;
  verifyToken(token: string): any;
  decodeToken(token: string): any;
  getTokenFromHeaders(headers: any): string;
  getServerKeys(): any;
}

export interface IAuthMiddleware {
  authenticate(
    req: ModRequest,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

export interface IAuthController {
  login(req: ModRequest, res: Response, next: NextFunction): Promise<void>;
}
