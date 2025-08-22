import { Request, Response } from "express";
import AuthUsecase from "../../usecases/auth";
import axios from "axios";

class AuthController {
  static async login(req: Request, res: Response) {
    const { username } = req.body;
    try {
      if (!username) return res.status(400).json({ error: "username is required" });

      const { token, user } = await AuthUsecase.login(username);

      res.status(200).json({
        message: "Successfully login",
        data: {
          token,
          username: user.username,
        },
      });
    } catch (error) {
      console.log(error, "error");
    }
  }
  static async googleLogin(req: Request, res: Response) {
    try {
      const client_id = process.env.GOOGLE_CLIENT_ID!;
      const redirect_uri = "http://localhost:80/google-callback";

      const scope = encodeURIComponent("openid profile email");

      const url =
        `https://accounts.google.com/o/oauth2/v2/auth?response_type=code` +
        `&client_id=${client_id}` +
        `&redirect_uri=${redirect_uri}` +
        `&scope=${scope}`;

      res.redirect(url);
    } catch (error) {
      console.log(error, "error");

      res.status(500).json({ message: "Error!" });
    }
  }
  static async callbackGoogle(req: Request, res: Response) {
    const code = req.query.code as string;
    try {
      const tokenRes = await axios.post("https://oauth2.googleapis.com/token", null, {
        params: {
          code,
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          redirect_uri: "http://localhost:80/google-callback",
          grant_type: "authorization_code",
        },
      });
      const { id_token } = tokenRes.data;

      const userInfo = JSON.parse(Buffer.from(id_token.split(".")[1], "base64").toString());
      const { token } = await AuthUsecase.login(`${userInfo.given_name}${userInfo.family_name}`);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      res.redirect("http://localhost:80/get-profile");
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({ message: "Failed!" });
    }
  }
  static async getProfile(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "successfully get profile", username: req.username });
    } catch (error) {
      console.log("err");
      res.status(500).json({ message: "Failed!" });
    }
  }
}
export default AuthController;
