import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";

const secret = process.env.JWT_SECRET_KEY || "psi_technicaltest";
class JwtService {
  static signJWT(payload: string | Buffer | object): string {
    const options: SignOptions = { expiresIn: "1h" };

    return jwt.sign(payload, secret, options);
  }

  static verify<T = any>(token: string): T {
    return jwt.verify(token, secret) as T;
  }
}
export default JwtService;
