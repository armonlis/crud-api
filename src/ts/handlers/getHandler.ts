import { usersStorage } from "../main.js";
import { IResponse } from "../interfaces.js";
import { STATUS_CODES } from "http";
import { validate as isValidUUID } from "uuid";


export default function getHandler(url: Request["url"]): IResponse | null {
  if (url === "/api/users") { 
    const data = usersStorage.getUsers();
    return { status: 200, statusMes: STATUS_CODES["200"], data, sendRes: true }; 
  }
  if (/\/api\/users\/\w{1,}/.test(url)) {
    const userId = url.slice(11);
    if (!isValidUUID(userId)) { return { status: 400, statusMes: `${STATUS_CODES["400"]} : User ID is invalid.`, sendRes: true }; }
    if (!usersStorage.isExist(userId)) { return { status: 404, statusMes: `${STATUS_CODES["404"]} : User with id = ${userId} is not exist.`, sendRes: true }; }
    const data = usersStorage.getUser(userId);
    return { status: 200, statusMes: STATUS_CODES["200"], data, sendRes: true };
  }
  return null;
}