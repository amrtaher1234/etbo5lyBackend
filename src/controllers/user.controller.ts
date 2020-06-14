import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as express from "express";
import { UserModel } from "../database/user/user.model";
async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(password: string, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}
export const users = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.send({ users: await UserModel.find({}) });
};
export const signup = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const { email, password, role, name } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({
      email: email,
      password: hashedPassword,
      role: role || "basic",
      name: name,
    });
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    newUser.token = token;
    await newUser.save();
    res.send({ data: newUser, token: token });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let errorMessage = "";
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      errorMessage = "Email not found";
      throw new Error(errorMessage);
    }
    const validPassword = await validatePassword(password, user.password);
    console.log(validPassword);
    if (!validPassword) {
      errorMessage = "Password not correct";
      throw new Error(errorMessage);
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await UserModel.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      data: {
        email: user.email,
        role: user.role,
        name: user.name,
        _id: user._id,
      },
      token: token,
    });
  } catch (error) {
    res.status(404).send({ message: errorMessage, status: 404 });
  }
};
export const updateRole = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const id = req.params.id;
  const newRole = req.body.role;
  const user = await (
    await UserModel.findByIdAndUpdate(id, { role: newRole })
  ).save();
  res.send({ user: user });
};
