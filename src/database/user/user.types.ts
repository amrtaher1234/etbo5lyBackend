import { Document, Model } from "mongoose";

export interface IUser {
  name: string;
  role: String;
  token: String;
  email: String;
  password: String;
}
export interface IUserDocument extends IUser, Document {
  setRole: (doc: IUserDocument) => Promise<void>;
}
export interface IUserModel extends Model<IUserDocument> {
  findByEmailAndPassword: (
    model: IUserModel,
    email: string,
    password: string
  ) => Promise<IUserDocument>;
}
