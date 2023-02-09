import { Router } from "express";
import auth from "./auth";
import user from "./user.routes";

export default () => {
  const router = Router();

  auth(router);
  user(router);

  return router;
};
