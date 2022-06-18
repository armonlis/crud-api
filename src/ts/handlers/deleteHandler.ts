import { usersStorage } from "../server.js";
import { IResponse } from "../interfaces.js";
import { STATUS_CODES } from "http";
import { validate as isValidUUID } from "uuid";


export default function deleteHandler(url: Request["url"]): IResponse | null {
  if (/^\/api\/users\/[a-z0-9-]{1,}$/.test(url)) {
    const userId = url.slice(11);
    if (!isValidUUID(userId)) { return { status: 400, statusMes: `${STATUS_CODES["400"]} : User ID is invalid.`, sendRes: true }; }
    if (!usersStorage.isExist(userId)) { return { status: 404, statusMes: `${STATUS_CODES["404"]} : User with id = ${userId} is not exist.`, sendRes: true }; }
    usersStorage.deleteUser(userId);
    return { status: 200, statusMes: STATUS_CODES["200"], sendRes: true };
  }
  return null;
}