import db from "../../config/db";
import { v4 as uuidv4 } from "uuid";

interface User {
  id: string;
  username: string;
}

interface UserPayload {
  username: string;
  accessToken: string;
}
class UserRepository {
  static async findByUsername(username: string) {
    const query = `SELECT username, id
        FROM users
        WHERE username = $1`;

    const result = await db.oneOrNone(query, [username]);

    return result;
  }

  static async create(payload: UserPayload) {
    const { username, accessToken } = payload;
    try {
      const id = uuidv4();
      const query = `
      INSERT INTO users (id, username, access_token)
      VALUES ($1, $2, $3)
      RETURNING id, username, access_token
    `;

      const user = await db.one<User>(query, [id, username, accessToken]);

      return user;
    } catch (error) {
      console.log(error, "ini err");
    }
  }

  static async update(payload: UserPayload) {
    let user = await this.findByUsername(payload.username);
    if (!user?.id) {
      throw new Error("User tidak ditemukan!");
    }

    const query = `
      UPDATE users
      SET access_token = $1
      WHERE username = $2
      RETURNING id, username, access_token
    `;

    const result = await db.one(query, [payload.accessToken, payload.username]);

    return result;
  }
}
export default UserRepository;
