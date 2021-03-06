import { Model, Document } from "mongoose";
export interface IMeal {
  name: String;
  description: String;
  voters: String[];
  creationDate: Date;
  image?: string;
}

export interface IMealDocument extends IMeal, Document {}

export interface IMealModel extends Model<IMealDocument> {}
