import { Schema } from "mongoose";
import { Roles } from "./interfaces";
import { findByEmailAndPassword } from "./user.statics";
import { setRole } from "./user.methods";

const UserSchema = new Schema({
  name: String,
  role: Number,
  email: { type: String, unique: true, required: true },
  password: String,
});

UserSchema.statics.findByEmailAndPassword = findByEmailAndPassword;

UserSchema.methods.setRole = setRole;

export default UserSchema;
