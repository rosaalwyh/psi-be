import UserRepository from "../../repositories/users";
import JwtService from "../../helpers/jwtService";

interface User {
  username: string;
  accessToken: string;
}
class AuthUsecase {
  static async validateUser(payload: User) {
    const { username, accessToken } = payload;
    let user = await UserRepository.findByUsername(username);

    if (!user?.id) {
      user = await UserRepository.create({ username, accessToken });
    }
    user = await UserRepository.update({ username, accessToken });

    return user;
  }

  static async login(username: string) {
    const accessToken = JwtService.signJWT({ username });
    const user = await this.validateUser({ username, accessToken });

    return { user, token: accessToken };
  }
}
export default AuthUsecase;
