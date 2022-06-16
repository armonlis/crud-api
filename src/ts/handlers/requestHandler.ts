import { IncomingMessage, OutgoingMessage, STATUS_CODES } from "http";
import { IResponse } from "../interfaces.js";
import getHandler from "./getHandler.js";
import postHandler from "./postHandler.js";
import deleteHandler from "./deleteHandler.js";
import putHandler from "./putHandler.js";
import { IUser } from "../interfaces.js";

export default function requestHandler(request: IncomingMessage, resp: any): IResponse {
  try {
    const { method, url } = request;
    let response: IResponse = { status: 404, statusMes: `${STATUS_CODES["404"]}`, sendRes: true };

    function preHandle(method: "POST" | "PUT") {
      
        let userData: IUser;
        request.on("close", () => {
          if (!userData) {
            resp.statusCode = 400;
            resp.statusMessage = `${STATUS_CODES["400"]} : The request's body is probably empty.`;
            resp.end();
          }
        });
        request.on("data", reqData => {
          try {
            userData = JSON.parse(reqData);
            const {status, statusMes, data, sendRes} = method === "POST" ? postHandler(url, userData) ?? response : putHandler(url, userData) ?? response;
            resp.statusCode = status;
            resp.statusMessage = statusMes ?? "";
            if (data) { resp.setHeader("Content-type", "aplication/json") }
            resp.end(data ? JSON.stringify(data) : "");
          }
          catch(error) {
            resp.statusCode = 500;
            resp.statusMessage = `${STATUS_CODES["500"]} : ${error.message}`;
            resp.end();
          };
        });  
    }

    switch (method) {
      case "GET" : response = getHandler(url) ?? response; break;
      case "POST": {
        if (/\/api\/users/.test(url)) { response.sendRes = false } else { break } 
        preHandle("POST");
        /*if (!/\/api\/users/.test(url)) { break } else { response.sendRes = false } 
        let userData: IUser;
        request.on("close", () => {
          if (!userData) {
            resp.statusCode = 400;
            resp.statusMessage = `${STATUS_CODES["400"]} : The request's body is probably empty.`;
            resp.end();
          }
        });
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
          };
        });*/
      }; break;
      case "PUT": {
        if (/\/api\/users/.test(url)) { response.sendRes = false } else { break } 
        preHandle("PUT");
      }; break;
      case "DELETE": response = deleteHandler(url) ?? response; break;
      default : return { status: 501, statusMes: STATUS_CODES["501"], sendRes: true };    
    }
    return response;    
  }
  catch(error) {
    return { status: 500, statusMes: `${STATUS_CODES["500"]} : ${error.message}`, sendRes: true };
  };
};