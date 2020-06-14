import * as express from "express";
import * as mealsController from "../controllers/meal.controller";
import * as roles from "../roles";
import { upload } from "../upload";
const router = express.Router();
// router.use(roles.allowIfLoggedin);
router.get("/", mealsController.mealsList);
router.get("/today", mealsController.todayMealsList);
router.get("/today-to-eat", mealsController.todayChoosenMeal);
router.get("/:id", mealsController.meal);
router.put(
  "/:id",
  roles.grantAccess("createAny", "meal"),
  mealsController.updateMeal
);
router.post(
  "/",
  roles.grantAccess("createAny", "meal"),
  upload.single("image"),
  mealsController.addMeal
);
export default router;

// router.patch("/:id", null); // TODO
// router.delete("/:id", null); // TODO
