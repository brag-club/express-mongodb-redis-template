import shell from "shelljs";

import { IServerKeys } from "@/interfaces/utils.interface";

shell.mkdir("-p", "src/keys");

if (!shell.test("-f", "src/keys/jwtRS256.key")) {
  throw new Error("❌ Private key not found!");
}

if (!shell.test("-f", "src/keys/jwtRS256.key.pub")) {
  throw new Error("❌ Public key not found!");
}

const fetchServerKeys = (): IServerKeys => {
  const privateKey = shell.cat("src/keys/jwtRS256.key");
  const publicKey = shell.cat("src/keys/jwtRS256.key.pub");
  return { privateKey: privateKey.stdout, publicKey: publicKey.stdout };
};

export default fetchServerKeys;
