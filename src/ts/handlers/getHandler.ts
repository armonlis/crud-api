import { usersStorage } from "../main.js";
import { v4 as uuid } from "uuid";
import { IResponse } from "../interfaces.js";
import { STATUS_CODES } from "http";


export default function getHandler(url: Request["url"]): IResponse | null {
  if (url === "/api/users") { 
    const data = usersStorage.getUsers();
    return { status: 200, statusMes: STATUS_CODES["200"], data, sendRes: true }; 
  }
  return null;
};