import bcrypt, { genSaltSync } from "bcrypt";

export function encryptPassword(password: string): string {
  const salt = genSaltSync();
  return bcrypt.hashSync(password, salt);
}

export function comparePasswords(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
