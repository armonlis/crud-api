import { IAddedUser } from "../interfaces.js";

export default function validateUser(user: IAddedUser): boolean {
  return typeof user.username === "string" && typeof user.age === "number" && Array.isArray(user.hobbies) ? true : false;
};