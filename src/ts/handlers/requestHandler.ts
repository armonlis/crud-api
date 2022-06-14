import { IncomingMessage, STATUS_CODES } from "http";
import { IResponse } from "../interfaces.js";
import getHandler from "./getHandler.js";

export default function requestHandler(request: IncomingMessage): IResponse {
  try {
    const { method, url } = request;
    let response: IResponse = { status: 404, statusMes: `${STATUS_CODES["404"]}` };
    switch (method) {
      case "GET" : response = getHandler(url) ?? response; break;
      default : return { status: 501, statusMes: STATUS_CODES["501"] };    
    }
    return response;    
  }
  catch(error) {
    return { status: 500, statusMes: `${STATUS_CODES["500"]} : ${error.message}` }
  };
};