import { FindManyOptions } from "typeorm";
import bcrypt from "bcrypt";

import { User } from "../entities/User";

const userService = {
  async getUsers() {
    const options: FindManyOptions = {
      order: {
        id: "ASC",
      },
    };
    return User.find(options);
  },

  async getUserById(id: number) {
    const user = await User.findOneBy({ id });
    if (!user) throw new Error("User not found");
    return user;
  },

  async getUserByName(name: string) {
    return User.findOneBy({ firstname: name });
  },

  async createUser(firstname: string, lastname: string, password: string) {
    const user = new User();
    const hashedPass = await bcrypt.hash(password, 10);

    user.firstname = firstname;
    user.lastname = lastname;
    user.password = hashedPass;

    return user.save();
  },

  async updateUser(id: number, payload) {
    const user = await User.findOneBy({ id });
    if (!user) throw new Error("User not found");

    await User.update({ id }, payload);
    return user;
  },

  async deleteUser(id: number) {
    const result = await User.delete({ id });
    if (result.affected === 0) throw new Error("User not found");
    return result;
  },
};

export default userService;
