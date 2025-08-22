import { Request, Response } from "express";
import UserUsecase from "../../usecases/users";
import { GetUsersParams } from "../../usecases/users";

class UserController {
  static async getList(req: Request, res: Response) {
    const users = await UserUsecase.getList();
    res.status(200).json({ message: "Successfully get users", data: users });
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const params: GetUsersParams = {
        result: String(req.query.result),
        page: String(req.query.page),
      };

      const users = await UserUsecase.getUsers({
        result: params.result,
        page: params.page,
      });

      res.status(200).json({ message: "Successfully get users", data: users });
    } catch (error) {
      console.log(error, "ini err");
      res.status(500).json({ message: "Failed!" });
    }
  }
}
export default UserController;
