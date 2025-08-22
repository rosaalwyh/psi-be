import UserRepository from "../../repositories/users";
import axios from "axios";
export interface GetUsersParams {
  result: string;
  page: string;
}
export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

class UserUsecase {
  static async getList() {
    return await UserRepository.getList();
  }

  static async getUsers(payload: GetUsersParams) {
    try {
      const { result, page } = payload;
      const {
        data: { results },
      } = await axios.get(`https://randomuser.me/api?results=${result}&page=${page}`);

      return results.map((result: User) => {
        const {
          name,
          email,
          phone,
          location: { street, city, state, country },
          dob: { age },
          cell,
          picture,
        } = result;
        return {
          name: `${name.title} ${name.first} ${name.last}`,
          location: `${street.number}, ${street.name}, ${city}, ${state}. ${country}`,
          email,
          age,
          phone,
          cell,
          picture: Object.values(picture),
        };
      });
    } catch (error) {
      console.log(error, "ini err");
      throw new Error("Error!");
    }
  }
}
export default UserUsecase;
