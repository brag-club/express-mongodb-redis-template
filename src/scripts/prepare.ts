import shell from "shelljs";

shell.mkdir("-p", "src/keys");

if (!shell.test("-f", "src/keys/jwtRS256.key")) {
  console.log("Generating private key...");
  shell.exec('ssh-keygen -t rsa -P "" -b 4096 -m PEM -f src/keys/jwtRS256.key');
  shell.exec(
    "ssh-keygen -e -m PEM -f src/keys/jwtRS256.key > src/keys/jwtRS256.key.pub"
  );
}

console.log("✅ Done generating keys.");
