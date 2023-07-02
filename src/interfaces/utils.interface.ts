export interface IServerKeys {
  privateKey: string;
  publicKey: string;
}

export interface IJWTDecodedData {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
}
