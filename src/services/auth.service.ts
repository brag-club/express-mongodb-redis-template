import crypto from "node:crypto";

import jwt from "jsonwebtoken";

import { IAuthService } from "@/interfaces/auth.interface";
import { IUserRespToken } from "@/interfaces/user.interface";
import { IJWTDecodedData, IServerKeys } from "@/interfaces/utils.interface";
import User from "@/models/user.model";
import fetchServerKeys from "@/utils/read-server-keys";

export default class AuthService implements IAuthService {
  private static instance: AuthService;
  private serverKeys: {
    privateKey: string;
    publicKey: string;
  };

  constructor() {
    this.serverKeys = fetchServerKeys();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }

    return AuthService.instance;
  }

  public getServerKeys(): IServerKeys {
    return this.serverKeys;
  }

  public generateToken(payload: IJWTDecodedData): string {
    return jwt.sign(payload, this.serverKeys.privateKey, {
      algorithm: "RS256",
      expiresIn: "1d",
    });
  }

  public verifyToken(token: string): IJWTDecodedData {
    return jwt.verify(token, this.serverKeys.publicKey, {
      algorithms: ["RS256"],
    }) as IJWTDecodedData;
  }

  public decodeToken(token: string): any {
    return jwt.decode(token, { complete: true });
  }

  public getTokenFromHeaders(headers: any): string {
    const { authorization } = headers;
    if (!authorization) {
      throw new Error("❌ No authorization header found!");
    }

    const [scheme, token] = authorization.split(" ");
    if (!/^bearer$/i.test(scheme)) {
      throw new Error("❌ Token malformatted!");
    }

    return token;
  }

  public async loginUser(email: string, password: string): Promise<IUserRespToken> {
    const user = await User.findOne({ email });
    if (user) {
      const { hash, salt, _id, email } = user;
      const hashPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
      if (hashPassword === hash) {
        const token = this.generateToken({ id: _id, email });
        return { token };
      } else {
        throw new Error("❌ Invalid password!");
      }
    } else {
      throw new Error("❌ User not found!");
    }
  }
}