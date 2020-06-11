import { model } from "mongoose";
import { IMealDocument } from "./meal.types";
import MealSchema from "./meal.schema";
export const MealModel = model<IMealDocument>("meals", MealSchema);