import { IncomingMessage, OutgoingMessage, STATUS_CODES } from "http";
import { IResponse } from "../interfaces.js";
import getHandler from "./getHandler.js";
import postHandler from "./postHandler.js";
import { IUser } from "../interfaces.js";

export default function requestHandler(request: IncomingMessage, resp: any): IResponse {
  try {
    const { method, url } = request;
    let response: IResponse = { status: 404, statusMes: `${STATUS_CODES["404"]}`, sendRes: true };
    switch (method) {
      case "GET" : response = getHandler(url) ?? response; break;
      case "POST": {
        response = {sendRes: false}
        let userData: IUser;
        request.on("data", reqData => {
          try {
            userData = JSON.parse(reqData);
            const {status, statusMes, data, sendRes} = postHandler(url, userData) ?? response;
            resp.statusCode = status;
            resp.statusMessage = statusMes ?? "";
            if (data) { resp.setHeader("Content-type", "aplication/json") }
            resp.end(data ? JSON.stringify(data) : "");
          }
          catch(error) {
            resp.statusCode = 500;
            resp.statusMessage = `${STATUS_CODES["500"]} : ${error.message}`;
            resp.end();
          }
        });
      }; break;
      default : return { status: 501, statusMes: STATUS_CODES["501"], sendRes: true };    
    }
    return response;    
  }
  catch(error) {
    return { status: 500, statusMes: `${STATUS_CODES["500"]} : ${error.message}`, sendRes: true };
  };
};