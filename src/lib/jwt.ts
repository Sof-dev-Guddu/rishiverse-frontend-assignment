import jwt, { Secret, SignOptions } from "jsonwebtoken";

const SECRET: Secret = process.env.JWT_SECRET || "dev-secret";
const EXPIRES = process.env.JWT_EXPIRES_IN || "1h";

export function signToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES } as SignOptions);
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}
