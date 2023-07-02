import crypto from "node:crypto";

import { IUserResponse, IUserService } from "@/interfaces/user.interface";
import User from "@/models/user.model";

import AuthService from "./auth.service";

export default class UserService extends AuthService implements IUserService {
  private static instance2: UserService;
  constructor() {
    super();
  }

  public static override getInstance(): UserService {
    if (!UserService.instance2) {
      UserService.instance2 = new UserService();
    }

    return UserService.instance2;
  }

  public async getUser(_id: string): Promise<IUserResponse> {
    try {
      const user = await User.findOne({ _id }).then((user) =>
        user?.view(false)
      );
      if (!user) {
        throw new Error("❌ User not found!");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getUsers(): Promise<IUserResponse[]> {
    try {
      const users = await User.find({}).then((users) =>
        users.map((user) => user.view(false))
      );
      if (!users) {
        throw new Error("❌ Users not found!");
      }

      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createUser(
    name: { first: string; last: string },
    email: string,
    password: string
  ): Promise<IUserResponse> {
    try {
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
      const user = await User.create({ email, name, hash, salt })
        .then((user) => user.view(false));
      if (!user) {
        throw new Error("❌ User not created!");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async updateUser(
    _id: string,
    name: { first: string; last: string },
    password?: string
  ): Promise<string> {
    try {
      if (password) {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto
          .pbkdf2Sync(password, salt, 1000, 64, "sha512")
          .toString("hex");

        const user = await User.updateOne({ _id }, { name, hash, salt });

        if (!user) {
          throw new Error("❌ User not updated!");
        }

        return "User updated!";
      }
      const user = await User.updateOne({ _id }, { name });
      if (!user) {
        throw new Error("❌ User not updated!");
      }

      return "User updated!";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async deleteUser(_id: string): Promise<string> {
    try {
      const user = await User.deleteOne({ _id });
      if (!user) {
        throw new Error("❌ User not deleted!");
      }

      return "User deleted!";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
