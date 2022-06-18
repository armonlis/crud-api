import { IAddedUser, IUpdatedUser } from "../interfaces.js";

export default function validateUser(user: IAddedUser | IUpdatedUser, mode: "add" | "update" = "add"): boolean {
  if (mode === "add") {
    return typeof user.username === "string" && typeof user.age === "number" && Array.isArray(user.hobbies) ? true : false;
  }
  return !!user.username && typeof user.username !== "string" 
    || !!user.age && typeof user.age !== "number" 
    || !!user.hobbies && !Array.isArray(user.hobbies)
    || !!user.hobbies &&  user.hobbies.length > 0 && user.hobbies.some(el => typeof el !== "string") 
    ? false 
    : true;
  
}