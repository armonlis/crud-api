import request from "supertest";
import server from "../src/js/server";
import { validate, v4 as uuid } from "uuid";

describe("The deep test of the method POST.", () => {
  
  const serv = request(server);
  const addedUserValid = { username: "USER", age: 33, hobbies: ["beer", "girls"] };
  const addedUserInvalid1 = { username: 12, age: 33, hobbies: ["beer", "girls"] };
  const addedUserInvalid2 = { username: "USER2", age: "seven", hobbies: ["beer", "girls"] };
  const addedUserInvalid3 = { username: "USER", age: 33, hobbies: "beer" };
  const addedUserInvalid4 = {};
  const addedUserInvalid5 = { username: "USER", hobbies: ["beer", "girls"] };
    
  test("Add new user with valid user object and check returned object.", async () => {
    const response = await serv.post("/api/users").send(JSON.stringify(addedUserValid));
    expect(response.status).toBe(201);
    expect(typeof response.body).toEqual("object");
    expect(response.body.username).toEqual(addedUserValid.username);
    expect(response.body.age).toEqual(addedUserValid.age);
    expect(response.body.hobbies).toEqual(addedUserValid.hobbies);
    expect(validate(response.body.id)).toBeTruthy;
  });

  test("Adding a new user with the username as a number against a string must return the error 400.", async () => {
    const response = await serv.post(`/api/users`).send(JSON.stringify(addedUserInvalid1)).expect(400);
  });

  test("Adding a new user with the age as a string against a number must return the error 400.", async () => {
    const response = await serv.post(`/api/users`).send(JSON.stringify(addedUserInvalid2)).expect(400);
  });

  test("Adding a new user with the hobbies as a string against an array must return the error 400.", async () => {
    const response = await serv.post(`/api/users`).send(JSON.stringify(addedUserInvalid3)).expect(400);
  });

  test("Adding a new user with the empty object must return the error 400.", async () => {
    const response = await serv.post(`/api/users`).send(JSON.stringify(addedUserInvalid4)).expect(400);
  });

  test("Adding a new user without the property age must return the error 400.", async () => {
    const response = await serv.post(`/api/users`).send(JSON.stringify(addedUserInvalid5)).expect(400);
  });

  test("Adding a new user with a string in the body must return the error 500.", async () => {
    const response = await serv.post(`/api/users`).send("add user please").expect(500);
  });

});