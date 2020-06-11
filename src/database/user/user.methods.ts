import { Document } from "mongoose";
import { IUserDocument } from "./user.types";
export async function setRole(doc: IUserDocument, role): Promise<void> {
  doc.role = role;
  await doc.save();
}
