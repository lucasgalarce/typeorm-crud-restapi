import { generateToken } from "../controllers/auth.controller";

export default (router) => {
  router.post("/auth/token", generateToken);
};
