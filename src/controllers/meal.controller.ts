import { MealModel } from "../database/meal/meal.model";
import * as express from "express";
import { IMeal } from "../database/meal/meal.types";
import * as moment from "moment";
import console = require("console");

export const mealsList = async function (
  req: express.Request,
  res: express.Response
) {
  const meals = await MealModel.find({}).populate("voters");
  res.send({ meals: meals });
};
export const meal = async function (
  req: express.Request,
  res: express.Response
) {
  const id = req.params.id;
  const meal = await MealModel.findOne({ _id: id }).populate("voters");
  res.send({ meal: meal });
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
  try {
    const meals = await MealModel.find({
      createdAt: { $gte: startOfToday },
    }).populate("voters");
    res.send({ meals: meals });
  } catch (err) {
    res.send({ error: err });
  }
};

export const updateMeal = async function (
  req: express.Request,
  res: express.Response
) {
  const id = req.params.id;
  const meal = req.body;
  const updateResult = await MealModel.findByIdAndUpdate(id, meal);
  res.send({ meal: await updateResult.save() });
};
export const todayChoosenMeal = async function (
  req: express.Request,
  res: express.Response
) {
  const yesterday = moment().add(-1, "days");
  const meals = await MealModel.aggregate()
    .match({ createdAt: { $lt: new Date(yesterday.toDate()) } })
    .addFields({ votes: { $size: "$voters" } })
    .sort("-votes");
  res.send({ res: meals });
};
