import * as express from "express";
import * as userController from "./../controllers/user.controller";
import * as roles from "../roles";
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/", userController.users);
router.put(
  "/:id",
  roles.grantAccess("updateAny", "profile"),
  userController.updateRole
);
export default router;
