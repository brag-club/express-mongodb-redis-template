import { NextFunction,Request, Response } from "express";
import { Document } from "mongoose";

import { ModRequest } from "@/middlewares/auth.middleware";
import { CreateUserInput } from "@/validations/auth.validations";

export interface IUserService {
  createUser(
    name: { first: string; last: string },
    email: string,
    password: string
  ): Promise<any>;
  getUsers(): Promise<any>;
  getUser(id: string): Promise<any>;
  updateUser(
    id: string,
    name: { first: string; last: string },
    password?: string
  ): Promise<any>;
  deleteUser(id: string): Promise<string>;
}

export interface IUserController {
  get(req: Request, res: Response, _next: NextFunction): Promise<void>;
  getAll(_req: Request, res: Response, _next: NextFunction): Promise<void>;
  create(
    req: Request<object, object, CreateUserInput["body"]>,
    res: Response,
    _next: NextFunction
  ): Promise<void>;
  update(req: Request, res: Response, _next: NextFunction): Promise<void>;
  remove(req: Request, res: Response, _next: NextFunction): Promise<void>;
  me(req: ModRequest, res: Response, _next: NextFunction): Promise<void>;
}

export interface IUser extends Document {
  name: {
    first: string;
    last: string;
  };
  email: string;
  hash: string;
  salt: string;

  view(full: boolean): any;
}

export interface IUserResponse {
    id: string;
    _id?: string;
    name: {
        first: string;
        last: string;
    };
    email: string;
    hash?: string;
    salt?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUserRespToken {
    token: string;
}