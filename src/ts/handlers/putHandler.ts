import { usersStorage } from "../main.js";
import { IResponse, IAddedUser } from "../interfaces.js";
import { STATUS_CODES } from "http";
import { validate as isValidUUID } from "uuid";
import validateUser from "./validateUser.js";


export default function putHandler(url: Request["url"], userData: IAddedUser): IResponse | null {
 if (/\/api\/users\/\w{1,}/.test(url)) {
    const userId = url.slice(11);
    if (!isValidUUID(userId)) { return { status: 400, statusMes: `${STATUS_CODES["400"]} : User ID is invalid.`, sendRes: true }; }
    if (!usersStorage.isExist(userId)) { return { status: 404, statusMes: `${STATUS_CODES["404"]} : User with id = ${userId} is not exist.`, sendRes: true }; }
    if (!validateUser(userData, "update")) { return { status: 400, statusMes: `${STATUS_CODES["400"]} : The user's data is invalid.`, sendRes: true } }
    const data = usersStorage.updateUser(userId, userData);
    return { status: 200, statusMes: STATUS_CODES["200"], data, sendRes: true };
  }
  return null;
}