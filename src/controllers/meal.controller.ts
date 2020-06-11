import { MealModel } from "../database/meal/meal.model";
import * as express from "express";
import { IMeal } from "../database/meal/meal.types";
import * as moment from "moment";

export const mealsList = async function (
  req: express.Request,
  res: express.Response
) {
  const meals = await MealModel.find({}).populate("voters");
  res.send({ meals: meals });
};

export const addMeal = async function (
  req: express.Request,
  res: express.Response
) {
  const meal = req.body as IMeal;
  try {
    const mealCreated = await (await MealModel.create(meal)).save();
    res.send({ meal: mealCreated });
  } catch (err) {
    res.status(500).send({ error: err, status: 500 });
  }
};

export const todayMealsList = async function (
  req: express.Request,
  res: express.Response
) {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const meals = await MealModel.find({
    createdAt: { $gte: startOfToday },
  }).populate("voters");
  res.send({ meals: meals });
};

export const todayChoosenMeal = async function (
  req: express.Request,
  res: express.Response
) {
  // to implement
};
