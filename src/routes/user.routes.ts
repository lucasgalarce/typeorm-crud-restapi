import { auth } from "../middlewares/auth";
import userController from "../controllers/user.controller";

export default (router) => {
  router.get("/users", userController.getUsers);
  router.get("/users/:id", userController.getUserById);
  router.post("/users", auth, userController.createUser);
  router.put("/users/:id", userController.updateUser);
  router.delete("/users/:id", userController.deleteUser);
};
