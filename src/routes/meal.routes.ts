import * as express from "express";
import * as mealsController from "../controllers/meal.controller";
const router = express.Router();

router.get("/", mealsController.mealsList);
router.get("/today", mealsController.todayMealsList);
router.get("/today-to-eat", mealsController.todayChoosenMeal);

// router.put("/:id", null); // TODO
// router.patch("/:id", null); // TODO
// router.delete("/:id", null); // TODO
router.post("/", mealsController.addMeal);
export default router;
