import { Schema } from "mongoose";

const MealSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  voters: [{ type: Schema.Types.ObjectId, ref: "users", default: [] }],
});

MealSchema.set("timestamps", true);
export default MealSchema;
