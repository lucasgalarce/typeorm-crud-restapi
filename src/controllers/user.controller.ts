import { Request, Response } from "express";
import { User } from "../entity/User";

interface UserBody {
  firstname: string;
  lastname: string;
}

const userController = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findOneBy({ id: parseInt(id) });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },

  async createUser(req: Request<unknown, unknown, UserBody>, res: Response) {
    const { firstname, lastname } = req.body;
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    await user.save();
    return res.json(user);
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user = await User.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "Not user found" });

      await User.update({ id: parseInt(id) }, req.body);

      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await User.delete({ id: parseInt(id) });

      if (result.affected === 0)
        return res.status(404).json({ message: "User not found" });

      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },
};

export default userController;
