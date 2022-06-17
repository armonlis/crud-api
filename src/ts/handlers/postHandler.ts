import { usersStorage } from "../server.js";
import { IResponse, IAddedUser } from "../interfaces.js";
import { STATUS_CODES } from "http";
import validateUser from "./validateUser.js";



export default function postHandler(url: Request["url"], userData: IAddedUser ): IResponse | null {
  if (/\/api\/users/.test(url)) {
    if (!validateUser(userData)) { return { status: 400, statusMes: `${STATUS_CODES["400"]} : The user's data is invalid.`, sendRes: true } }
    const data = usersStorage.addUser(userData);
    return { status: 201, statusMes: STATUS_CODES["201"], data, sendRes: true };
  }
  return null;
}