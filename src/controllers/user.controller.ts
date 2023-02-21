import { Request, Response } from "express";
import userService from "../services/user.service";
interface UserBody {
  firstname: string;
  lastname: string;
  password: string;
}

const userController = {
  async getUsers(req: Request, res: Response) {
    try {
      const users = await userService.getUsers();
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
      const user = await userService.getUserById(parseInt(id));
      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },

  async createUser(req: Request<unknown, unknown, UserBody>, res: Response) {
    const { firstname, lastname, password } = req.body;
    await userService.createUser(firstname, lastname, password);
    return res.status(204).send();
  },

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await userService.updateUser(parseInt(id), req.body);

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
      await userService.deleteUser(parseInt(id));

      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
    }
  },
};

export default userController;
