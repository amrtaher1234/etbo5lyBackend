import * as express from "express";
import mealRouter from "./meal.routes";
import userRouter from "./user.routes";
const router = express.Router();

router.use("/meals", mealRouter);
router.use("/users", userRouter);
export default router;
