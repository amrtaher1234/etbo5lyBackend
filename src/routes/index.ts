import * as express from "express";
import mealRouter from "./meal.routes";
import userRouter from "./user.routes";
import * as jwt from "jsonwebtoken";
import { UserModel } from "../database/user/user.model";
const router = express.Router();
router.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    const token = req.headers["x-access-token"];
    const { userId, exp } = jwt.verify(
      token as string,
      process.env.JWT_SECRET
    ) as any;
    if (exp < Date.now().valueOf() / 1000) {
      return res.status(401).json({
        error: "JWT token has expired, please login to obtain a new one",
      });
    }
    const loggedUser = await UserModel.findById(userId);
    res.locals.loggedInUser = loggedUser;
    next();
  } else {
    next();
  }
});
router.use("/meals", mealRouter);
router.use("/users", userRouter);
export default router;
