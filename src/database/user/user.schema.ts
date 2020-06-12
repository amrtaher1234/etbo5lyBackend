import { Schema } from "mongoose";
import { findByEmailAndPassword } from "./user.statics";
import { setRole } from "./user.methods";

const UserSchema = new Schema({
  name: String,
  role: {
    type: String,
    default: "eater",
    enum: ["eater", "cheif", "godfather"],
  },
  email: { type: String, unique: true, required: true },
  password: String,
  token: String,
});

UserSchema.statics.findByEmailAndPassword = findByEmailAndPassword;

UserSchema.methods.setRole = setRole;

export default UserSchema;
